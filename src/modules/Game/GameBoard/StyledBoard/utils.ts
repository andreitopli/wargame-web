import { Square } from 'chess.js'
import { Api } from 'chessground/api'
import {Color} from 'chessground/types'
import {ChessInstance, getNewChessGame} from 'src/lib/chess/chess'
import { ChessColor, ChessColorBlack, ChessColorWhite, ChessDests } from 'src/modules/Game/types'
import { WarChessEngine } from '../WarGameChessEngine'

export const noop = () => {}

export const pgnToFen = (pgn: string) => getNewChessGame(pgn).fen();

export const getColor = (chess: ChessInstance): Color => {
  return chess.turn() === 'b' ? 'black' : 'white'
}

export const toChessColor = (c: 'w' | 'white' | 'b' | 'black') => {
  return c === 'b' || c === 'black' ? 'black' : 'white';
};

export function toColor(chess: WarChessEngine): Color {
  return chess.turn() === 'w' ? 'white' : 'black'
}

export function otherChessColor<C extends ChessColor>(
  c: C
): C extends ChessColorWhite ? ChessColorBlack : ChessColorWhite;
export function otherChessColor<C extends ChessColor>(c: C) {
  return c === 'white' ? 'black' : 'white';
}

export function toDests(chess: WarChessEngine): ChessDests {
  const dests = new Map()
  chess.SQUARES().forEach((s) => {
    const ms = chess.moves({square: s, verbose: true})
    if (ms.length)
      dests.set(
        s,
        ms.map((m) => m.to),
      )
  })
  return dests
}

export function playOtherSide(cg: Api, chess: WarChessEngine) {
  return (orig : Square, dest : Square) => {
    chess.move({from: orig, to: dest});
    cg.set({
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      }
    });
  };
}

export const keyInObject = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> => prop in obj;

