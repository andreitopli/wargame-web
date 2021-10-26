import {ChessInstance as ChessJSChessInstance} from 'chess.js';
export type ChessInstance = ChessJSChessInstance & {
  swapTurn: () => void;
}
