import React from 'react'
import {ChessBoardProps} from 'react-chessboard'
import {Game} from 'src/types'
import {GameBoard} from './GameBoard/GameBoard'

type Props = Omit<
  ChessBoardProps,
  'onMove' | 'id' | 'pgn' | 'overlayComponent' | 'type' | 'config'
> & {
  game: Game
}

export const MainGame: React.FC<Props> = ({game, ...props}) => {
  return (
    <GameBoard
      canInteract
      size={500}
      id={game.id}
      pgn={game.pgn}
      playable
      turnColor={game.turn}
      homeColor={'white'}
      {...props}
    />
  )
}
