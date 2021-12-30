import { RootState } from "../reducers/reducer";

export const selectPiecesHealth = (state: RootState) => state.pieces.health;

export const selectPiecesPositions = (state:RootState) => state.pieces.positions;

export const selectGame = (state: RootState) => state.game;