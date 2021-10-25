import { combineReducers } from "redux-starter-kit";
import {reducer as piecesReducer} from './piecesReducer';

export const reducer = combineReducers({
  pieces: piecesReducer
})

export type RootState = ReturnType<typeof reducer>;