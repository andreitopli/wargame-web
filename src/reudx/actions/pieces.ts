import { createAction } from "deox";
import { Pieces } from "react-chessboard";

export const dealDamage = createAction('dealDamage', 
(resolve) => (p: {
  damage: number;
  piece: Pieces;
}) => resolve(p))

export const updateHealth = createAction('updateHealth',
(resolve) => (p: {
  health: number;
  piece:Pieces
}) => resolve(p));