import {createReducer} from 'deox'
import {PiecesHealth, PiecesPositions} from 'src/modules/Game/types'
import {pieceInitialHealthAndDamage} from '../../config'
import {dealDamage, updateHealth, updatePosition} from '../actions/pieces'
import { GenericStateSlice } from '../types'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';

type State = {
  positions: PiecesPositions;
  health: PiecesHealth;
}

const state: State = { 
  health : {
    bR0: pieceInitialHealthAndDamage.rook.health,
    bN0: pieceInitialHealthAndDamage.knight.health,
    bB0: pieceInitialHealthAndDamage.bishop.health,
    bQ0: pieceInitialHealthAndDamage.queen.health,
    bK0: pieceInitialHealthAndDamage.king.health,
    bB1: pieceInitialHealthAndDamage.bishop.health,
    bN1: pieceInitialHealthAndDamage.knight.health,
    bR1: pieceInitialHealthAndDamage.rook.health,
    bP0: pieceInitialHealthAndDamage.pawn.health, 
    bP1: pieceInitialHealthAndDamage.pawn.health,
    bP2: pieceInitialHealthAndDamage.pawn.health,
    bP3: pieceInitialHealthAndDamage.pawn.health,
    bP4: pieceInitialHealthAndDamage.pawn.health,
    bP5: pieceInitialHealthAndDamage.pawn.health,
    bP6: pieceInitialHealthAndDamage.pawn.health,
    bP7: pieceInitialHealthAndDamage.pawn.health,
    wR0: pieceInitialHealthAndDamage.rook.health,
    wN0: pieceInitialHealthAndDamage.knight.health,
    wB0: pieceInitialHealthAndDamage.bishop.health,
    wQ0: pieceInitialHealthAndDamage.queen.health,
    wK0: pieceInitialHealthAndDamage.king.health,
    wB1: pieceInitialHealthAndDamage.bishop.health,
    wN1: pieceInitialHealthAndDamage.knight.health,
    wR1: pieceInitialHealthAndDamage.rook.health,
    wP0: pieceInitialHealthAndDamage.pawn.health,
    wP1: pieceInitialHealthAndDamage.pawn.health,
    wP2: pieceInitialHealthAndDamage.pawn.health,
    wP3: pieceInitialHealthAndDamage.pawn.health,
    wP4: pieceInitialHealthAndDamage.pawn.health,
    wP5: pieceInitialHealthAndDamage.pawn.health,
    wP6: pieceInitialHealthAndDamage.pawn.health,
    wP7: pieceInitialHealthAndDamage.pawn.health,
  },
  positions: {
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
}

const reducer = createReducer(
  state as State,
  (handleAction) => [
    handleAction(dealDamage, (state, {payload}) => {
      const {damage, piece} = payload
      return {
        ...state,
        health: {
          ...state.health,
          [piece]: state.health[piece] - damage
        }
      }
    }),
    handleAction(updateHealth, (state, {payload}) => {
      const {health} = payload
      return {
        ...state,
        health
      }
    }),
    handleAction(updatePosition, (state, {payload}) => {
      const {position, piece} = payload
      return {
        ...state,
        positions: {
          ...state.positions,
          [piece] : position
        }
      }
    }),
  ],
)

const stateSliceByKeyWithoutPersist = {
  pieces: reducer,
};

export const stateSliceByKey = {
  pieces: persistReducer(
    {
      key: 'pieces',
      storage,
    },
    reducer
  ),
};

export type ModuleState = ReturnType<typeof reducer>;
export type ModuleStateSlice = GenericStateSlice<typeof stateSliceByKeyWithoutPersist, typeof reducer>;
