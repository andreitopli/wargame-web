import { createReducer } from 'deox'
import {PiecesPositions} from 'src/types'
import { updatePosition } from '../actions/pieces'

const initialState: PiecesPositions = {
  bR0: 'a8',
  bN0: 'b8',
  bB0: 'c8',
  bQ0: 'd8',
  bK0: 'e8',
  bB1: 'f8',
  bN1: 'g8',
  bR1: 'h8',
  bP0: 'a7',
  bP1: 'b7',
  bP2: 'c7',
  bP3: 'd7',
  bP4: 'e7',
  bP5: 'f7',
  bP6: 'g7',
  bP7: 'h7',
  wR0: 'a1',
  wN0: 'b1',
  wB0: 'c1',
  wQ0: 'd1',
  wK0: 'e1',
  wB1: 'f1',
  wN1: 'g1',
  wR1: 'h1',
  wP0: 'a2',
  wP1: 'b2',
  wP2: 'c2',
  wP3: 'd2',
  wP4: 'e2',
  wP5: 'f2',
  wP6: 'g2',
  wP7: 'h2',
}

export const reducer = createReducer(
  initialState as PiecesPositions,
  (handleAction) => [
    handleAction(updatePosition, (state, {payload}) => {
      const {position, piece} = payload
      return {
        ...state,
        [piece]: position,
      }
    }),
  ],
)
