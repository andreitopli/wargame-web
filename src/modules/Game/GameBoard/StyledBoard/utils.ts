import { Move, Piece, Square } from 'chess.js'
import { Api } from 'chessground/api'
import {Color} from 'chessground/types'
import { ChessgroundProps } from 'react-chessground'
import {ChessInstance, getNewChessGame} from 'src/lib/chess/chess'
import { CalcMovableProps, ChessBoardGameState, ChessColor, ChessColorBlack, ChessColorWhite, ChessDests, ChessMove } from 'src/modules/Game/types'

export const noop = () => {}

export const pgnToFen = (pgn: string) => getNewChessGame(pgn).fen();

export const pgnToHistory = (pgn: string)  =>
  getNewChessGame(pgn).history({ verbose: true });

export const getColor = (chess: ChessInstance): Color => {
  return chess.turn() === 'b' ? 'black' : 'white'
}

export const toChessColor = (c: 'w' | 'white' | 'b' | 'black') => {
  return c === 'b' || c === 'black' ? 'black' : 'white';
};

export function toColor(chess: ChessInstance): Color {
  return chess.turn() === 'w' ? 'white' : 'black'
}

export function otherChessColor<C extends ChessColor>(
  c: C
): C extends ChessColorWhite ? ChessColorBlack : ChessColorWhite;
export function otherChessColor<C extends ChessColor>(c: C) {
  return c === 'white' ? 'black' : 'white';
}

export function toDests(chess: ChessInstance): ChessDests {
  const dests = new Map()
  chess.SQUARES.forEach((s) => {
    const ms = chess.moves({square: s, verbose: true})
    if (ms.length)
      dests.set(
        s,
        ms.map((m) => m.to),
      )
  })
  return dests
}

export function playOtherSide(cg: Api, chess: ChessInstance) {
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

const calcMovable = (props: CalcMovableProps, dests: ChessDests): ChessgroundProps['movable'] => {
  const base = {
    free: false,
    // This is what determines wether someone can move a piece!
    dests: props.canInteract && props.playable ? dests : undefined,
    showDests: !!props.config?.showDests,
  } as const;
    return {
      ...base,
      color: props.playableColor,
    };
};

const getDisplayableState = (
  current: {
    history: Move[];
    fen: string;
  },
  displayable?: CalcMovableProps['displayable']
): ChessBoardGameState['displayable'] => {
  // If there are no displayable or they are exactly the same then just show the current
  if (!displayable || current.fen === displayable.fen) {
    const lastMove = current.history[current.history.length - 1] as ChessMove;

    return {
      fen: current.fen,
      lastMoveFromTo: lastMove ? [lastMove.from, lastMove.to] : undefined,
    };
  }

  const displayableLastMove = displayable.history[displayable.history.length - 1] as ChessMove;

  return {
    fen: displayable.fen,
    lastMoveFromTo: displayableLastMove
      ? [displayableLastMove.from, displayableLastMove.to]
      : undefined,
  };
};

export const getCurrentChessBoardGameState = (
  props: CalcMovableProps,
  chess: ChessInstance,
  prev: ChessBoardGameState | undefined
): ChessBoardGameState => {
  const pgn = chess.pgn();

  // Offer a way to exit asap if nothing changed
  if (pgn === prev?.pgn && props.displayable?.fen === prev.displayable?.fen) {
    return prev;
  }

  const history = chess.history({ verbose: true });
  const fen = chess.fen();

  return {
    pgn,
    fen,
    history,
    displayable: getDisplayableState(
      {
        history,
        fen,
      },
      props.displayable
    ),
    turn: toChessColor(chess.turn()),
    inCheck: chess.in_check(),
    isPreMovable: history.length === 0 ? true : history[history.length - 1].color !== chess.turn(),
    movable: calcMovable(props, toDests(chess)),
  };
};

export const keyInObject = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> => prop in obj;

export const isPromotableMove = (piece: Piece, { to: toSquare }: ChessMove) => {
  if (piece.type !== 'p') {
    return false;
  }

  return (
    (piece.color === 'b' &&
      keyInObject(
        {
          a1: true,
          b1: true,
          c1: true,
          d1: true,
          e1: true,
          f1: true,
          g1: true,
          h1: true,
        },
        toSquare
      )) ||
    (piece.color === 'w' &&
      keyInObject(
        {
          a8: true,
          b8: true,
          c8: true,
          d8: true,
          e8: true,
          f8: true,
          g8: true,
          h8: true,
        },
        toSquare
      ))
  );
};
