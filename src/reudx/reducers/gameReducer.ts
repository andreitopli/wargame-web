import { Color } from 'chessground/types'
import {createReducer} from 'deox'
import {getNewChessGame} from 'src/lib/chess/chess'
import { pgnToHistory } from 'src/modules/Game/GameBoard/StyledBoard/utils'
import {Game} from 'src/types'
import { addMove, setupGame, swapTurn } from '../actions/game'

const chess = getNewChessGame()

const initialState: Game = {
  pgn: chess.pgn(),
  id: new Date().getTime().toString(),
  state: 'pending',
  players: [
    {
      player1: 'black',
    },
    {player2: 'white'},
  ],
  homeColor: 'white',
  history: pgnToHistory(chess.pgn()),
  lastMoveBy: undefined,
  turn: 'white'
}

export const reducer = createReducer(
  initialState as Game,
  (handleAction) => [
    handleAction(setupGame, (_) => {
      return initialState;
    }),
    handleAction(addMove, (state, {payload}) => {
      const newChess = getNewChessGame();
      newChess.load_pgn(state.pgn);
      newChess.move(payload.move);
      return {
        ...state,
        pgn : newChess.pgn(),
        state: state.lastMoveBy ? state.state : 'started',
        history: pgnToHistory(newChess.pgn()),
        lastMoveBy: state.turn,
        turn: newChess.turn() === 'b' ? 'black' : 'white' as Color
      }
    }),
    handleAction(swapTurn, (state) => {
        const newChess = getNewChessGame(state.pgn);
        let tokens = newChess.fen().split(' ')
        tokens[1] = newChess.turn() === 'b' ? 'w' : 'b'
        tokens[3] = '-'
        newChess.load(tokens.join(' '))
        console.log('new pgn', newChess.pgn())
        console.log('new fen', newChess.fen())
        console.log('new turn', newChess.turn())
        return {
          ...state,
          pgn: newChess.pgn(),
          turn: state.turn === 'white' ? 'black' : 'white' as Color,
          history: pgnToHistory(newChess.pgn()),
          lastMoveBy: state.turn
        }
      })
  ],
)

