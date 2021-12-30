import { createAction } from "deox";
import { Game } from "src/modules/Game/types";

export const newGame = createAction('newGame');

export const updateGame = createAction('updateGame', (resolve) => (p: {game: Game}) => resolve(p))
