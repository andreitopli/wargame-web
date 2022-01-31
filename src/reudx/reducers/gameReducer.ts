import {createReducer} from 'deox'
import { createNewGame } from 'src/modules/Game/GameBoard/EngineProvider/EngineProvider'
import {Game} from 'src/modules/Game/types'
import {newGame, updateGame} from '../actions/game'
import { GenericStateSlice } from '../types'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';

type State = {
  game: Game
}

const initialState: State = {
  game: createNewGame()
}

const reducer = createReducer(initialState as State, (handleAction) => [
  handleAction(newGame, (_) => {
    return {game : createNewGame()}
  }),
  handleAction(updateGame, (_, {payload}) => {
    return {
      game: payload.game
    }
  })
])

const stateSliceByKeyWithoutPersist = {
  game: reducer,
};

export const stateSliceByKey = {
  // game: persistReducer(
  //   {
  //     key: 'game',
  //     storage,
  //   },
  //   reducer
  // ),
  game: reducer
};

export type ModuleState = ReturnType<typeof reducer>;
export type ModuleStateSlice = GenericStateSlice<typeof stateSliceByKeyWithoutPersist, typeof reducer>;