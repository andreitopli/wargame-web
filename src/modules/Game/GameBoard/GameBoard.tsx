import {Color} from 'chessground/types'
import React from 'react'
import {
  ChessBoardConfig, Game,
} from 'src/modules/Game/types'
import {StyledBoard, StyledBoardProps} from './StyledBoard/StyledBoard'
import { useEngineProvider } from './EngineProvider/useEngineProvider'
import { toDests } from './StyledBoard/utils'
import { WarChessEngine } from './WarGameChessEngine'
import { getNewChessGame } from 'src/lib/chess/chess'

export type ChessBoardProps = Omit<StyledBoardProps, 'onMove' | 'fen'> & {
  game: Game
  homeColor: Color
  config?: ChessBoardConfig
  orientation?: Color
  playable?: boolean
  canInteract: boolean
}

export const GameBoard: React.FC<ChessBoardProps> = (props) => {
  const engine = useEngineProvider();

  if (!engine) {
    return null;
  }

  function calcMovable() {
    return engine?.getDests();
  }

    return (
      <>
        <StyledBoard
          key={props.game.id}
          {...props}
          disableContextMenu
          viewOnly={false}
          fen={engine.getFen()}
          turnColor={engine.getTurn()}
          movable={calcMovable()}
          orientation={props.orientation || 'white'}
          onMove={(move, type) => {
            engine.onMove(move, type)
          }}
        />
      </>
    )
}
