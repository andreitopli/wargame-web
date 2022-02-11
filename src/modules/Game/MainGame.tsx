import {Color} from 'chessground/types'
import React, { useEffect } from 'react'
import {EngineProvider} from './Providers/EngineProvider/EngineProvider'
import {GameBoard} from './GameBoard/GameBoard'
import {WarGameBoard} from 'wargame-board'
import {createNewGame} from './utils'
import {GameProvider} from './Providers/GameProvider/GameProvider'
import {useGameProvider} from './Providers/GameProvider/useGameProvider'

type Props = {
  boardOrientation: Color
}

export const MainGame: React.FC<Props> = (props) => {
  const {game} = useGameProvider()
  useEffect(() => {
    console.log('game changed', game);
  },[game])
  return (
    <>
      {/* <EngineProvider
      render={(game) => ( */}

      <GameBoard
        canInteract
        size={600}
        game={game}
        playable
        homeColor={'white'}
        {...props}
      />

      {/* )} */}
      {/* /> */}
      {/* <WarGameBoard
      game={createNewGame()}
      homeColor='white'
      orientation={props.boardOrientation}
      size={400}
      onMove={() => {}}
      canInteract
      playable
    /> */}
    </>
  )
}
