import { ShortMove } from "chess.js";
import { createAction } from "deox";

export const setupGame = createAction('initGame');

export const addMove = createAction('addMove', 
(resolve) => (p : {move: ShortMove}) => resolve(p))

export const swapTurn = createAction('swapTurn');

export const undoMove = createAction('undoMove');
