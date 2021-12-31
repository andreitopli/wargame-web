import { combineReducers } from "redux-starter-kit";
import {stateSliceByKey as piecesReducer} from './piecesReducer';
import {stateSliceByKey as gameReducer} from './gameReducer';

export const reducer = combineReducers({
  ...piecesReducer,
  ...gameReducer
})

export type RootState = ReturnType<typeof reducer>;
