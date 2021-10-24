import {Chessboard} from 'react-chessboard'
import React from 'react'
import {Piece} from '../components/Piece/Piece'
import {pieceInitialHealthAndDamage} from '../components/Piece/utils'

type Props = {}

export const StyledBoard: React.FC<Props> = (props) => {
  return (
    <Chessboard
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
