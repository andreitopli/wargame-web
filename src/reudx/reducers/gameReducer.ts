import {Color} from 'chessground/types'
import {createReducer} from 'deox'
import {getNewChessGame} from 'src/lib/chess/chess'
import {otherChessColor} from 'src/modules/Game/GameBoard/StyledBoard/utils'
import {Game} from 'src/modules/Game/types'
import {addMove, setupGame, swapTurn} from '../actions/game'

const chess = getNewChessGame()

type State = {
  game: Game
  displayable: {
    fen: string
  }
}

const initialState: State = {
  game: {
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
    lastMoveBy: undefined,
    turn: 'white',
  },
  displayable: {
    fen: '',
  },
}

export const reducer = createReducer(initialState as State, (handleAction) => [
  handleAction(setupGame, (_) => {
    return initialState
  }),
  handleAction(addMove, (state, {payload}) => {
    const newChess = getNewChessGame()
    newChess.load_pgn(state.game.pgn)
    newChess.move(payload.move)
    return {
      game: {
        ...state.game,
        pgn: newChess.pgn(),
        state: state.game.lastMoveBy ? state.game.state : 'started',
        lastMoveBy: state.game.turn,
        turn: newChess.turn() === 'b' ? 'black' : ('white' as Color),
      },
      displayable: {
        fen: newChess.fen(),
      },
    }
  }),
  handleAction(swapTurn, (state) => {
    const newChess = getNewChessGame(state.game.pgn)
    let tokens = newChess.fen().split(' ')
    tokens[1] = newChess.turn() === 'b' ? 'w' : 'b'
    tokens[3] = '-'
    newChess.load(tokens.join(' '))
    return {
      game: {
        ...state.game,
        turn: otherChessColor(state.game.turn),
        lastMoveBy: otherChessColor(state.game.turn),
      },
      displayable: {
        fen: tokens.join(' '),
      },
    }
  }),
])
