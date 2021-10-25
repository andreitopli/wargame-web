import {Chessboard, Pieces} from 'react-chessboard'
import React, { useEffect, useState } from 'react'
import {Piece} from '../components/Piece/Piece'
import {pieceInitialHealthAndDamage, piecesToStringName} from '../components/Piece/utils'
import { getNewChessGame } from '../../lib/chess/chess'
import {ChessInstance, ShortMove, Square} from 'chess.js';
import { useDispatch } from 'react-redux'
import { setupPieces } from '../../reudx/actions/pieces'

type Props = {}

export const StyledBoard: React.FC<Props> = (props) => {

  const [game, setGame] = useState<ChessInstance>(getNewChessGame());
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('current Game:', game.board());
  },[game])

  useEffect(() => {
    dispatch(setupPieces());
  },[])

  const onPieceDrop = (sourceSquare: string, targetSquare:string, piece: Pieces) => {
    let validMove = null;
    const pieceOnTargetSquare = game.get(targetSquare as Square);
    if (pieceOnTargetSquare) {

    }
    const damageToDeal = pieceInitialHealthAndDamage[piecesToStringName(piece)].damage;
    const move : ShortMove = {
      to: targetSquare as Square,
      from: sourceSquare as Square,
      promotion: 'q'
    }
    setGame((prev) => {
      const updatedGame = {...prev};
      validMove = updatedGame.move(move);
      return updatedGame;
    })

    if (validMove === null) { return false};
    return true;
  }

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onPieceDrop}
      customPieces={{
        bP: () => (
          <Piece
            health={pieceInitialHealthAndDamage['pawn'].health}
            damage={pieceInitialHealthAndDamage['pawn'].damage}
            type="bP"
          />
        ),
        bB: () => (
          <Piece
            health={pieceInitialHealthAndDamage['bishop'].health}
            damage={pieceInitialHealthAndDamage['bishop'].damage}
            type="bB"
          />
        ),
        bK: () => (
          <Piece
            health={pieceInitialHealthAndDamage['king'].health}
            damage={pieceInitialHealthAndDamage['king'].damage}
            type="bK"
          />
        ),
        bN: () => (
          <Piece
            health={pieceInitialHealthAndDamage['knight'].health}
            damage={pieceInitialHealthAndDamage['knight'].damage}
            type="bN"
          />
        ),
        bQ: () => (
          <Piece
            health={pieceInitialHealthAndDamage['queen'].health}
            damage={pieceInitialHealthAndDamage['queen'].damage}
            type="bQ"
          />
        ),
        bR: () => (
          <Piece
            health={pieceInitialHealthAndDamage['rook'].health}
            damage={pieceInitialHealthAndDamage['rook'].damage}
            type="bR"
          />
        ),
        wB: () => (
          <Piece
            health={pieceInitialHealthAndDamage['bishop'].health}
            damage={pieceInitialHealthAndDamage['bishop'].damage}
            type="wB"
          />
        ),
        wK: () => (
          <Piece
            health={pieceInitialHealthAndDamage['king'].health}
            damage={pieceInitialHealthAndDamage['king'].damage}
            type="wK"
          />
        ),
        wN: () => (
          <Piece
            health={pieceInitialHealthAndDamage['knight'].health}
            damage={pieceInitialHealthAndDamage['knight'].damage}
            type="wN"
          />
        ),
        wP: () => (
          <Piece
            health={pieceInitialHealthAndDamage['pawn'].health}
            damage={pieceInitialHealthAndDamage['pawn'].damage}
            type="wP"
          />
        ),
        wQ: () => (
          <Piece
            health={pieceInitialHealthAndDamage['queen'].health}
            damage={pieceInitialHealthAndDamage['queen'].damage}
            type="wQ"
          />
        ),
        wR: () => (
          <Piece
            health={pieceInitialHealthAndDamage['rook'].health}
            damage={pieceInitialHealthAndDamage['rook'].damage}
            type="wR"
          />
        ),
      }}
    />
  )
}
