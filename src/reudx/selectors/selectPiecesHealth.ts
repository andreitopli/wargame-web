import { RootState } from "../reducers/reducer";

export const selectPiecesHealth = (state: RootState) => state.health;

export const selectPiecesPositions = (state:RootState) => state.position;

export const selectGame = (state: RootState) => state.game;