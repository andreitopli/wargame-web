import { getNewChessGame } from 'src/lib/chess/chess';
import {getNewWargameEngine} from './WarGameChessEngine';

const warGameEngine = getNewWargameEngine();

beforeEach(() => {
  //reset the PGN to new one
  const chess = getNewChessGame();
  warGameEngine.load_pgn(chess.pgn());
})

describe('wargame engine test', () => {
  test('make a move to an empty square', () => {
    expect(warGameEngine.fen()).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0');
  })
})