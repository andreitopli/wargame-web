import { Piece } from "chess.js";
import { Pieces } from "react-chessboard";
import { InitialToPieceName, PieceName} from "../../types";

export const piecesToStringName = (p: Pieces) : PieceName => {
  const dict : InitialToPieceName = {
    P: 'pawn',
    B: 'bishop',
    K: 'king',
    N: 'knight',
    Q: 'queen',
    R: 'rook',
  }
  return dict[p.slice(1) as keyof typeof dict]
}

export const pieceToPiecesConversion = (piece: Piece) : Pieces => {
  return `${piece.color}${piece.type.toUpperCase()}` as Pieces
}