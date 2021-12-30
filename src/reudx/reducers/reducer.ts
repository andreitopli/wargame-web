import { combineReducers } from "redux-starter-kit";
import {reducer as piecesReducer} from './piecesReducer';
import {reducer as gameReducer} from './gameReducer';

export const reducer = combineReducers({
  pieces: piecesReducer,
  game: gameReducer
})

export type RootState = ReturnType<typeof reducer>;
