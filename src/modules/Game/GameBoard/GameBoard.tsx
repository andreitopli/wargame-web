import {ChessInstance, ShortMove, Square} from 'chess.js'
import {Color} from 'chessground/types'
import React from 'react'
import {getNewChessGame} from 'src/lib/chess/chess'
import {
  ChessBoardConfig,
  ChessMove,
  IndexPosition,
  PiecesHealth,
  PiecesID,
  PiecesPositions,
} from 'src/modules/Game/types'
import {StyledBoard, StyledBoardProps} from './StyledBoard/StyledBoard'
import {otherChessColor, toChessColor, toDests} from './StyledBoard/utils'
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux'
import {RootState} from 'src/reudx/reducers/reducer'
import {updateHealth, updatePosition} from 'src/reudx/actions/pieces'
import {AppDispatch} from 'src/reudx/Provider'
import {addMove} from 'src/reudx/actions/game'
import {getPiecesDamage} from 'src/modules/Game/utils'

export type ChessBoardProps = Omit<StyledBoardProps, 'onMove' | 'fen'> & {
  id: string
  pgn: string
  homeColor: Color
  config?: ChessBoardConfig
  orientation?: Color
  playable?: boolean
  canInteract: boolean
}

type ConnectedProps = {
  piecesPositions: PiecesPositions
  piecesHealth: PiecesHealth
  indexByPosition: IndexPosition
}

type DispatchProps = {
  updateHealth: (piece: PiecesID, health: number) => void
  updatePosition: (piece: PiecesID, position: Square) => void
  addMove: (move: ShortMove) => void
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
}

type ComponentProps = ChessBoardProps & ConnectedProps & DispatchProps

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

class GameBoardComponent extends React.PureComponent<ComponentProps, State> {
  private chess = getNewChessGame()

  constructor(props: ComponentProps) {
    super(props)

    this.chess.load_pgn(this.props.pgn || '')

    this.state = {
      current: getCurrentChessState(this.chess),
    }

    this.onMove = this.onMove.bind(this)
  }

  private commit() {
    if (!this.props.pgn) {
      this.chess.reset()

      const nextChessState = getCurrentChessState(this.chess)

      this.setState({
        current: nextChessState,
      })
    } else {
      const loaded = this.chess.load_pgn(this.props.pgn)

      if (loaded) {
        const nextChessState = getCurrentChessState(this.chess)

        this.setState({
          current: nextChessState,
        })
      }
    }
  }

  componentDidUpdate(prevProps: ChessBoardProps) {
    if (prevProps.pgn !== this.props.pgn) {
      this.commit()
    }
  }

  private onMove(nextMove: ChessMove) {
    if (!this.props.canInteract) {
      return
    }

    const valid = this.chess.move(nextMove)

    if (!valid) {
      return
    }

    const pieceAtDest = this.props.indexByPosition[nextMove.to]
    const pieceAtOrigin = this.props.indexByPosition[nextMove.from]

    if (pieceAtDest) {
      const damage = getPiecesDamage(pieceAtOrigin)
      const updatedHealth = this.props.piecesHealth[pieceAtDest] - damage

      if (updatedHealth > 0) {
        this.props.updateHealth(pieceAtDest, updatedHealth)
        this.swapTurn()
        return
      }

      this.props.updatePosition(pieceAtOrigin, nextMove.to)
      this.setState({current: getCurrentChessState(this.chess)})
      this.props.addMove(nextMove)
      return
    }

    this.setState({current: getCurrentChessState(this.chess)})
    this.props.updatePosition(pieceAtOrigin, nextMove.to)
    this.props.addMove(nextMove)
  }

  private swapTurn() {
    this.setState({
      current: {
        ...this.state.current,
        turn: otherChessColor(this.state.current.turn),
      },
    })
  }

  private calcMovable() {
    return {
      free: false,
      dests: this.props.playable ? toDests(this.chess) : undefined,
      color: this.state.current.turn,
      showDests: true,
    } as const
  }

  render() {
    const {pgn, id, playable, orientation, homeColor, ...boardProps} =
      this.props

    const chessState = this.state.current

    return (
      <>
        <StyledBoard
          key={id}
          {...boardProps}
          disableContextMenu
          viewOnly={false}
          fen={chessState.fen}
          lastMove={
            chessState.lastMove && [
              chessState.lastMove.from,
              chessState.lastMove.to,
            ]
          }
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

function piecesBySquare(positions: PiecesPositions): IndexPosition {
  return Object.keys(positions).reduce((sum, el) => {
    return {
      ...sum,
      [positions[el as PiecesID]]: el,
    }
  }, {} as IndexPosition)
}

const mapStateToProps: MapStateToProps<
  ConnectedProps,
  ChessBoardProps,
  RootState
> = (state: RootState) => {
  const positions = state.position
  const indexByPosition = piecesBySquare(positions)
  return {
    piecesPositions: state.position,
    piecesHealth: state.health,
    indexByPosition,
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, ChessBoardProps> = (
  dispatch: AppDispatch,
) => {
  return {
    updateHealth: (piece: PiecesID, health: number) =>
      dispatch(updateHealth({piece, health})),
    updatePosition: (piece: PiecesID, position: Square) =>
      dispatch(updatePosition({piece, position})),
    addMove: (move: ShortMove) => dispatch(addMove({move})),
  }
}

export const GameBoard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBoardComponent)
