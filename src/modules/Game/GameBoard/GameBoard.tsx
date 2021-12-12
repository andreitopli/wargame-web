import {ShortMove} from 'chess.js'
import {Color} from 'chessground/types'
import React from 'react'
import {getNewChessGame} from 'src/lib/chess/chess'
import {ChessInstance} from 'src/lib/chess/types'
import {ChessBoardConfig, ChessMove} from 'src/types'
import {StyledBoard, StyledBoardProps} from './StyledBoard/StyledBoard'
import {
  toChessColor,
  toDests,
} from './StyledBoard/utils';

export type ChessBoardProps = Omit<StyledBoardProps, 'onMove' | 'fen'> & {
  id: string
  pgn: string
  homeColor: Color
  config?: ChessBoardConfig
  orientation?: Color
  playable?: boolean
  canInteract: boolean;
  onMove: (p: {move: ShortMove; fen: string; pgn: string}) => void
  swapTurn : () => void;
  fen: string;
}

type ChessState = {
  fen: string
  pgn: string
  turn: Color
  inCheck: boolean
  lastMove: ShortMove | undefined
}

type State = {
  current: ChessState
  uncommited?: ChessState
}

const getCurrentChessState = (chess: ChessInstance): ChessState => {
  const history = chess.history({verbose: true})

  return {
    fen: chess.fen(),
    pgn: chess.pgn(),
    turn: toChessColor(chess.turn()),
    inCheck: chess.in_check(),
    lastMove: history[history.length - 1] as ChessMove,
  }
}

export class GameBoard extends React.PureComponent<ChessBoardProps, State> {
  private chess = getNewChessGame()

  constructor(props: ChessBoardProps) {
    super(props)

    this.chess.load_pgn(this.props.pgn || '')

    this.state = {
      current: getCurrentChessState(this.chess),
    }

    this.onMove = this.onMove.bind(this);
  }

  private commit() {
    if (!this.props.pgn) {
      this.chess.reset()

      const nextChessState = getCurrentChessState(this.chess)

      this.setState({
        current: nextChessState,
        uncommited: undefined,
      })
    } else {
      const loaded = this.chess.load_pgn(this.props.pgn)

      if (loaded) {
        const nextChessState = getCurrentChessState(this.chess)

        this.setState({
          current: nextChessState,
          uncommited: undefined,
        })
      }
    }
  }

  componentDidUpdate(prevProps: ChessBoardProps) {
    if ((prevProps.pgn !== this.props.pgn) || (prevProps.fen !== this.props.fen)) {
      this.commit()
    }
  }

  private onMove(nextMove: ChessMove) {
  

    if (!this.props.canInteract) {
      return;
    }

    const valid = this.chess.move(nextMove);

    if (!valid) {
      return;
    }

    const uncommitedChessState = getCurrentChessState(
      this.chess,
    );


    this.setState({ uncommited: uncommitedChessState });

    this.props.onMove({
      move: nextMove,
      fen: uncommitedChessState.fen,
      pgn: uncommitedChessState.pgn,
    });
  }

  private calcMovable() {
    console.log('turn to move', this.chess.turn())
    return {
      free: false,
      dests: this.props.playable ? toDests(this.chess) : undefined,
      color: toChessColor(this.chess.turn()),
      showDests: true,
    } as const
  }

  render() {
    const {pgn, id, playable, orientation, homeColor, ...boardProps} =
      this.props

    const chessState = this.state.uncommited || this.state.current

    return (
      <>
        <StyledBoard
          key={id}
          {...boardProps}
          disableContextMenu
          viewOnly={false}
          fen={chessState.fen}
          lastMove={chessState.lastMove && [chessState.lastMove.from, chessState.lastMove.to]}
          turnColor={chessState.turn}
          check={chessState.inCheck}
          movable={this.calcMovable()}
          orientation={orientation || 'white'}
          onMove={this.onMove}
        />
      </>
    )
  }
}
