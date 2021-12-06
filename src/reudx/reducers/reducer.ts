import { combineReducers } from "redux-starter-kit";
import {reducer as healthReducer} from './piecesHealth';
import {reducer as positionReducer} from './piecesPositions';
import {reducer as gameReducer} from './gameReducer';

export const reducer = combineReducers({
  health: healthReducer,
  position: positionReducer,
  game: gameReducer
})

export type RootState = ReturnType<typeof reducer>;