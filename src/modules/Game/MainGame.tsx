import {Color} from 'chessground/types'
import React, {useEffect} from 'react'
import {WarGameBoard} from 'wargame-board'
import {useGameProvider} from './Providers/GameProvider/useGameProvider'

type Props = {
  boardOrientation: Color
}

export const MainGame: React.FC<Props> = (props) => {
  const {game, moveAction} = useGameProvider()

  useEffect(() => {
    console.log('game changed', game)
  }, [game])
  return (
    <WarGameBoard
      key={game.id}
      game={game}
      playableColor={'white'}
      orientation={props.boardOrientation}
      size={400}
      onMove={(move, type) => {
        moveAction({move, type})
      }}
      canInteract
      playable
    />
  )
}
