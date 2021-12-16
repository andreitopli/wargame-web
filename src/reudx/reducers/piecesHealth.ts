import {createReducer} from 'deox'
import {PiecesHealth} from 'src/modules/Game/types'
import {pieceInitialHealthAndDamage} from '../../config'
import {dealDamage, updateHealth} from '../actions/pieces'

const state: PiecesHealth = {
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
}

export const reducer = createReducer(
  state as PiecesHealth,
  (handleAction) => [
    handleAction(dealDamage, (state, {payload}) => {
      const {damage, piece} = payload
      return {
        ...state,
        [piece]: state[piece] - damage
      }
    }),
    handleAction(updateHealth, (state, {payload}) => {
      const {health, piece} = payload
      return {
        ...state,
        [piece] : health
      }
    })
  ],
)
