import { Pieces } from "react-chessboard";
import {createReducer} from 'deox';
import { dealDamage, updateHealth } from "../actions/pieces";

export type PiecesHealthState = {
  [k in Pieces] : number;
}

const state : PiecesHealthState = {
  bP: 2,
  bB: 6,
  bK: 30,
  bN: 6,
  bQ: 18,
  bR: 10,
  wB: 6,
  wK: 30,
  wN: 6,
  wP: 2,
  wQ: 18,
  wR: 10,
}

export const reducer = createReducer(state as PiecesHealthState, (handleAction) => [
  // handleAction(dealDamage, (state,{payload}) => {
  //   const {damage, piece} = payload;
  //   const diff = state[piece] - damage;
  //   return {
  //     ...state,
  //     [piece]: diff < 0 ? 0 : diff
  //   }
  // })
  handleAction(updateHealth, (state, {payload}) => {
    const {health, piece} = payload;
    return {
      ...state,
      [piece]: health
    }
  })
])