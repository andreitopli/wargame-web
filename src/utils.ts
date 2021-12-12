import { pieceInitialHealthAndDamage } from "./config";
import { InitialToPieceName, PiecesID } from "./types";

export const pieceTypeToPieceName: InitialToPieceName = {
  b: 'bishop',
  r: 'rook',
  n: 'knight',
  q: 'queen',
  k: 'king',
  p: 'pawn',
}

export function getPiecesDamage(piece: PiecesID): number {
  const p = piece.split('')[1];
  return pieceInitialHealthAndDamage[pieceTypeToPieceName[p as keyof InitialToPieceName]].damage
} 