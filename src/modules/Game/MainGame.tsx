import {ShortMove, Square} from 'chess.js'
import React, {useEffect, useState} from 'react'
import {ChessBoardProps} from 'react-chessboard'
import {useDispatch, useSelector} from 'react-redux'
import {addMove, swapTurn} from 'src/reudx/actions/game'
import {
  updateHealth,
  updatePosition,
} from 'src/reudx/actions/pieces'
import {
  selectPiecesHealth,
  selectPiecesPositions,
} from 'src/reudx/selectors/selectPiecesHealth'
import {Game, PiecesID} from 'src/types'
import {getPiecesDamage} from 'src/utils'
import {GameBoard} from './GameBoard/GameBoard'

type Props = Omit<
  ChessBoardProps,
  'onMove' | 'id' | 'pgn' | 'overlayComponent' | 'type' | 'config'
> & {
  game: Game
  displayable: {
    fen: string
  }
  onAddMove: (p: {move: ShortMove}) => void
}

type IndexPosition = {
  [k in Square]: PiecesID
}

export const MainGame: React.FC<Props> = ({game, onAddMove, ...props}) => {
  const dispatch = useDispatch()
  const piecesPositions = useSelector(selectPiecesPositions)
  const piecesHealth = useSelector(selectPiecesHealth)
  const [indexByPosition, setIndexByPosition] = useState<IndexPosition>(
    piecesBySquare(),
  )

  useEffect(() => {
    setIndexByPosition(piecesBySquare())
  }, [piecesPositions])

  function piecesBySquare() {
    return Object.keys(piecesPositions).reduce((sum, el) => {
      return {
        ...sum,
        [piecesPositions[el as PiecesID]]: el,
      }
    }, {} as IndexPosition)
  }

  const onMove = (move: ShortMove) => {
    const pieceAtDest = indexByPosition[move.to]
    const pieceAtOrigin = indexByPosition[move.from]

    if (pieceAtDest) {
      const damage = getPiecesDamage(pieceAtOrigin)
      const updatedHealth = piecesHealth[pieceAtDest] - damage
      if (updatedHealth > 0) {
        dispatch(updateHealth({piece: pieceAtDest, health: updatedHealth}))
        return
      }
      dispatch(updatePosition({piece: pieceAtOrigin, position: move.to}))
      dispatch(addMove({move}))
      return;
    }
    dispatch(updatePosition({piece: pieceAtOrigin, position: move.to}))
    dispatch(addMove({move}))
  }

  return (
    <GameBoard
      canInteract
      size={500}
      id={game.id}
      pgn={game.pgn}
      fen={props.displayable.fen}
      onMove={({move}) => onMove(move)}
      swapTurn={() => {
        dispatch(swapTurn())
      }}
      playable
      turnColor={game.turn}
      homeColor={'white'}
      {...props}
    />
  )
}
