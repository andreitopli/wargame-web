import { Square } from "chess.js";
import { createAction } from "deox";
import { Pieces } from "react-chessboard";
import { PiecesID } from "src/types";

export const dealDamage = createAction('dealDamage', 
(resolve) => (p: {
  damage: number;
  piece: Pieces;
}) => resolve(p))

export const updateHealth = createAction('updateHealth',
(resolve) => (p: {
  health: number;
  piece:PiecesID
}) => resolve(p));

export const updatePosition = createAction('updatePosition',
(resolve) => (p : {
  piece: PiecesID,
  position: Square
}) => resolve(p))