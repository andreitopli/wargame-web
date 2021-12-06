import {ShortMove} from 'chess.js'
import React from 'react'
import {ChessBoardProps} from 'react-chessboard'
import {useDispatch} from 'react-redux'
import {addMove, swapTurn} from 'src/reudx/actions/game'
import {Game} from 'src/types'
import {GameBoard} from './GameBoard/GameBoard'

type Props = Omit<
  ChessBoardProps,
  'onMove' | 'id' | 'pgn' | 'overlayComponent' | 'type' | 'config'
> & {
  game: Game
  onAddMove: (p: {move: ShortMove}) => void
}

export const MainGame: React.FC<Props> = ({game, onAddMove, ...props}) => {
  const dispatch = useDispatch()

  return (
    <GameBoard
      canInteract
      size={500}
      id={game.id}
      pgn={game.pgn}
      onMove={({move}) => {
        dispatch(addMove({move}))
      }}
      swapTurn={() => {
        dispatch(swapTurn());
      }}
      playable
      turnColor={game.turn}
      homeColor={'white'}
      {...props}
    />
  )
}
