import { pieceInitialHealthAndDamage } from "../../config";
import { IndexPosition, InitialToPieceName, PiecesID, PiecesPositions } from "./types";

export const pieceTypeToPieceName: InitialToPieceName = {
  b: 'bishop',
  r: 'rook',
  n: 'knight',
  q: 'queen',
  k: 'king',
  p: 'pawn',
}

export function getPiecesDamage(piece: PiecesID): number {
  const p = piece.split('')[1].toLowerCase();
  return pieceInitialHealthAndDamage[pieceTypeToPieceName[p as keyof InitialToPieceName]].damage
} 

export function setPiecesPositionsBySquare(positions: PiecesPositions): IndexPosition {
  return Object.keys(positions).reduce((sum, el) => {
    return {
      ...sum,
      [positions[el as PiecesID]]: el,
    }
  }, {} as IndexPosition)
}