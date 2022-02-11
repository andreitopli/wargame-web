import {Color, MoveType} from 'chessground/types'
import React from 'react'
import {
  ChessBoardConfig, ChessMove, Game, GameWithPieces, HistoryMove,
} from 'src/modules/Game/types'
import {StyledBoard, StyledBoardProps} from './StyledBoard/StyledBoard'
// import { useEngineProvider } from '../Providers/EngineProvider/useEngineProvider'
import { WarGameEngine } from 'wargame-engine'
import { useGameProvider } from '../Providers/GameProvider/useGameProvider'
import { otherChessColor, toChessColor } from './StyledBoard/utils'

export type ChessBoardProps = Omit<StyledBoardProps, 'onMove' | 'fen'> & {
  game: GameWithPieces
  homeColor: Color
  config?: ChessBoardConfig
  orientation?: Color
  playable?: boolean
  canInteract: boolean
}

export const GameBoard: React.FC<ChessBoardProps> = (props) => {
  // const engine = useEngineProvider();

  // if (!engine) {
  //   return null;
  // }
  const {updateGame} = useGameProvider();

  function calcMovable() {
    // return engine?.getDests();
    const {history, pieces} = props.game
    const engine =
      history && history.length > 0
        ? new WarGameEngine(
            pieces.healths,
            pieces.positions as any,
            props.game.fen,
            history[history.length - 1].rooksMoved,
          )
        : new WarGameEngine()
    return engine.dests()
  }

  function onMove(move: ChessMove, type: MoveType) {
    const {healths, positions} = props.game.pieces;
    const instance = props.game.history.length > 0 
    ? new WarGameEngine(healths, positions, props.game.fen, props.game.history[props.game.history.length - 1].rooksMoved)
    : new WarGameEngine();

    const validMove = instance.move(move, type);

    console.log('valid move', validMove);

    if (!validMove) { 
      return
    }

    const nextMove: HistoryMove = {
      move,
      type,
      rooksMoved: validMove.rooksMoved
    }

    updateGame({
      fen: validMove?.fen,
      pieces: {
        positions: validMove.positions,
        healths: validMove.health
      },
      history: [...props.game.history, nextMove],
      lastMoveBy: otherChessColor(toChessColor(instance.getTurn())),
      turn: toChessColor(instance.getTurn())
    })
  }

    return (
      <>
        <StyledBoard
          key={props.game.id}
          {...props}
          size={400}
          disableContextMenu
          viewOnly={false}
          fen={props.game.fen}
          // turnColor={engine.getTurn()}
          movable={calcMovable()}
          orientation={props.orientation || 'white'}
          onMove={(move, type) => {
            // engine.onMove(move, type)
            onMove(move, type)
          }}
        />
      </>
    )
}
