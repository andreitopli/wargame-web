import {Color} from 'chessground/types'
import React from 'react'
import {EngineProvider} from './GameBoard/EngineProvider/EngineProvider'
import {GameBoard} from './GameBoard/GameBoard'

type Props = {
  boardOrientation: Color
}

export const MainGame: React.FC<Props> = (props) => {
  return (
    <EngineProvider
      render={(game) => (
        <GameBoard
          canInteract
          size={600}
          game={game}
          playable
          homeColor={'white'}
          {...props}
        />
      )}
    />
  )
}
