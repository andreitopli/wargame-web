import React, { createContext, useState } from 'react';
import { GameWithPieces } from '../../types';
import { createNewGameWithPieces } from '../../utils';

export type GameContextType = {
  game: GameWithPieces;
  updateGame : (props: Partial<GameWithPieces>) => void
}

export const GameContext = createContext<GameContextType>({
  game: createNewGameWithPieces(),
  updateGame: () => {}
}) 

export const GameProvider: React.FC = (props) => {
  const [game, setGame] = useState<GameWithPieces>(createNewGameWithPieces())

  const updateGame = (props: Partial<GameWithPieces>) => {
    console.log('UPDATING game with', props);
    setGame(prev => {
      return {
        ...prev,
        ...props
      }
    })
  }

  return (
    <GameContext.Provider value={{
      game,
      updateGame
    }}>
      {props.children}
    </GameContext.Provider>
  )
}