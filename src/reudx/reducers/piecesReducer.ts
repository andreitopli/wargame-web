import {createReducer} from 'deox'
import {pieceInitialHealthAndDamage} from '../../config'
import {dealDamage, updateHealth} from '../actions/pieces'

export type ExtendedPieces =
  | 'wP-a'
  | 'wP-b'
  | 'wP-c'
  | 'wP-d'
  | 'wP-e'
  | 'wP-f'
  | 'wP-g'
  | 'wP-h'
  | 'wB-c'
  | 'wB-f'
  | 'wN-b'
  | 'wN-g'
  | 'wR-a'
  | 'wR-h'
  | 'wQ'
  | 'wK'
  | 'bP-a'
  | 'bP-b'
  | 'bP-c'
  | 'bP-d'
  | 'bP-e'
  | 'bP-f'
  | 'bP-g'
  | 'bP-h'
  | 'bB-c'
  | 'bB-f'
  | 'bN-b'
  | 'bN-g'
  | 'bR-a'
  | 'bR-h'
  | 'bQ'
  | 'bK'

export type PiecesHealthState = {
  [k in ExtendedPieces]: number
}

const state: PiecesHealthState = {
  'wP-a': pieceInitialHealthAndDamage.pawn.health,
  'wP-b': pieceInitialHealthAndDamage.pawn.health,
  'wP-c': pieceInitialHealthAndDamage.pawn.health,
  'wP-d': pieceInitialHealthAndDamage.pawn.health,
  'wP-e': pieceInitialHealthAndDamage.pawn.health,
  'wP-f': pieceInitialHealthAndDamage.pawn.health,
  'wP-g': pieceInitialHealthAndDamage.pawn.health,
  'wP-h': pieceInitialHealthAndDamage.pawn.health,
  'wB-c': pieceInitialHealthAndDamage.bishop.health,
  'wB-f': pieceInitialHealthAndDamage.bishop.health,
  'wN-b': pieceInitialHealthAndDamage.knight.health,
  'wN-g': pieceInitialHealthAndDamage.knight.health,
  'wR-a': pieceInitialHealthAndDamage.rook.health,
  'wR-h': pieceInitialHealthAndDamage.rook.health,
  wQ: pieceInitialHealthAndDamage.queen.health,
  wK: pieceInitialHealthAndDamage.king.health,
  'bP-a': pieceInitialHealthAndDamage.pawn.health,
  'bP-b': pieceInitialHealthAndDamage.pawn.health,
  'bP-c': pieceInitialHealthAndDamage.pawn.health,
  'bP-d': pieceInitialHealthAndDamage.pawn.health,
  'bP-e': pieceInitialHealthAndDamage.pawn.health,
  'bP-f': pieceInitialHealthAndDamage.pawn.health,
  'bP-g': pieceInitialHealthAndDamage.pawn.health,
  'bP-h': pieceInitialHealthAndDamage.pawn.health,
  'bB-c': pieceInitialHealthAndDamage.bishop.health,
  'bB-f': pieceInitialHealthAndDamage.bishop.health,
  'bN-b': pieceInitialHealthAndDamage.knight.health,
  'bN-g': pieceInitialHealthAndDamage.knight.health,
  'bR-a': pieceInitialHealthAndDamage.rook.health,
  'bR-h': pieceInitialHealthAndDamage.rook.health,
  bQ: pieceInitialHealthAndDamage.queen.health,
  bK: pieceInitialHealthAndDamage.king.health,
}

export const reducer = createReducer(
  state as PiecesHealthState,
  (handleAction) => [
    // handleAction(dealDamage, (state,{payload}) => {
    //   const {damage, piece} = payload;
    //   const diff = state[piece] - damage;
    //   return {
    //     ...state,
    //     [piece]: diff < 0 ? 0 : diff
    //   }
    // })
    handleAction(updateHealth, (state, {payload}) => {
      const {health, piece} = payload
      return {
        ...state,
        [piece]: health,
      }
    }),
  ],
)
