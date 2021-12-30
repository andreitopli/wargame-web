import {createReducer} from 'deox'
import { createNewGame } from 'src/modules/Game/GameBoard/EngineProvider/EngineProvider'
import {Game} from 'src/modules/Game/types'
import {newGame, updateGame} from '../actions/game'

type State = {
  game: Game
}

const initialState: State = {
  game: createNewGame()
}

export const reducer = createReducer(initialState as State, (handleAction) => [
  handleAction(newGame, (_) => {
    return {game : createNewGame()}
  }),
  handleAction(updateGame, (_, {payload}) => {
    return {
      game: payload.game
    }
  })
])
