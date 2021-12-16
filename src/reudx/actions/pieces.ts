import { Square } from "chess.js";
import { createAction } from "deox";
import { PiecesID } from "src/modules/Game/types";

export const dealDamage = createAction('dealDamage', 
(resolve) => (p: {
  damage: number;
  piece: PiecesID;
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