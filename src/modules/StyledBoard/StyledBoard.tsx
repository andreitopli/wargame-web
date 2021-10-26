import {Chessboard, Pieces} from 'react-chessboard'
import React, { useEffect, useState } from 'react'
import {Piece} from './components/Piece/Piece'
import { piecesToStringName, pieceToPiecesConversion} from './utils'
import { getNewChessGame } from '../../lib/chess/chess'
import {ShortMove, Square} from 'chess.js';
import { pieceInitialHealthAndDamage } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { selectPiecesHealth } from '../../reudx/selectors/selectPiecesHealth'
import { updateHealth } from '../../reudx/actions/pieces'
import { ExtendedPieces } from '../../reudx/reducers/piecesReducer'
import { ChessInstance } from '../../lib/chess/types'

type Props = {}

export const StyledBoard: React.FC<Props> = (props) => {

  const [game, setGame] = useState<ChessInstance>(getNewChessGame());
  const piecesHealth = useSelector(selectPiecesHealth);
  const dispatch = useDispatch();


  const onPieceDrop = (sourceSquare: string, targetSquare:string, piece: Pieces) => {
    let validMove = null;
    const pieceOnTargetSquare = document.getElementById(targetSquare)?.firstElementChild?.id
    if (pieceOnTargetSquare) {
      const currentTargetPieceHealth = piecesHealth[pieceOnTargetSquare as ExtendedPieces];
      const damageToDeal = pieceInitialHealthAndDamage[piecesToStringName(piece)].damage;
      const healthLeft = currentTargetPieceHealth - damageToDeal;
      if (healthLeft > 0) {
        console.log('yes update health');
        dispatch(updateHealth({
          health : healthLeft,
          piece:  pieceOnTargetSquare as ExtendedPieces
        }))
        swapTurn()
        return false;
      }
    }
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

  function swapTurn() {
    let tokens = game.fen().split(" ");
    tokens[1] = game.turn() === "b" ? "w" : "b";
    tokens[3] = "-";
    setGame((prev) => {
      const updatedGame = {...prev}
      updatedGame.load(tokens.join(" "));
      return updatedGame
    })
  }

  useEffect(() => {
    console.log('game changed. new game', game.fen());
  },[game])

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onPieceDrop}
      customPieces={{
        bP: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['pawn'].damage}
            type="bP"
          />
        ),
        bB: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['bishop'].damage}
            type="bB"
          />
        ),
        bK: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['king'].damage}
            type="bK"
          />
        ),
        bN: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['knight'].damage}
            type="bN"
          />
        ),
        bQ: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['queen'].damage}
            type="bQ"
          />
        ),
        bR: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['rook'].damage}
            type="bR"
          />
        ),
        wB: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['bishop'].damage}
            type="wB"
          />
        ),
        wK: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['king'].damage}
            type="wK"
          />
        ),
        wN: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['knight'].damage}
            type="wN"
          />
        ),
        wP: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['pawn'].damage}
            type="wP"
          />
        ),
        wQ: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['queen'].damage}
            type="wQ"
          />
        ),
        wR: () => (
          <Piece
            damage={pieceInitialHealthAndDamage['rook'].damage}
            type="wR"
          />
        ),
      }}
    />
  )
}
