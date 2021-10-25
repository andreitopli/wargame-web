import { Pieces } from "react-chessboard";
import { PieceName, PiecesHealthAndDamageDict } from "./types";

export const pieceInitialHealthAndDamage : PiecesHealthAndDamageDict = {
  pawn: {
    health: 2,
    damage: 1,
  },
  bishop: {
    health: 6,
    damage: 3,
  },
  rook: {
    health: 10,
    damage: 5,
  },
  knight: {
    health: 6,
    damage: 3,
  },
  queen: {
    health: 18,
    damage: 9,
  },
  king: {
    health: 30,
    damage: 10,
  },
}

type InitialToPieceName = {
  [k: string] : PieceName
}

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