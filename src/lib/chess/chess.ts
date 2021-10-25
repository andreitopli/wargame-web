import { ChessInstance , Chess as ChessA} from 'chess.js';
import * as ChessB from 'chess.js';

//This weirdness is due to the fact that node and browser js imports are working differently.
const ChessConstructor = ChessA || ChessB

export const getNewChessGame = (pgn?: string) => {
  const instance = new ChessConstructor() as ChessInstance;

  if (pgn) {
    instance.load_pgn(pgn);
  }

  return instance;
};

export type { ChessInstance } from 'chess.js';