import {Square} from 'chess.js'
import {files} from 'chessground/types'
import {pieceInitialHealthAndDamage} from '../../config'
import {
  IndexPosition,
  InitialToPieceName,
  PiecesID,
  PiecesPositions,
} from './types'

export const pieceTypeToPieceName: InitialToPieceName = {
  b: 'bishop',
  r: 'rook',
  n: 'knight',
  q: 'queen',
  k: 'king',
  p: 'pawn',
}

export function getPiecesDamage(piece: PiecesID): number {
  const p = piece.split('')[1].toLowerCase()
  return pieceInitialHealthAndDamage[
    pieceTypeToPieceName[p as keyof InitialToPieceName]
  ].damage
}

export function setPiecesPositionsBySquare(
  positions: PiecesPositions,
): IndexPosition {
  return Object.keys(positions).reduce((sum, el) => {
    return {
      ...sum,
      [positions[el as PiecesID]]: el,
    }
  }, {} as IndexPosition)
}

const filesByRank = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
}

export type ElementType<T extends Array<unknown>> = T extends Array<
  infer ElementType
>
  ? ElementType
  : never

export function getNumbericalPosition(square: Square): {
  row: number
  col: number
} {
  const col = Number(
    filesByRank[square.split('')[0] as keyof typeof filesByRank],
  )
  const row = Number(square.split('')[1])
  return {
    col,
    row,
  }
}

export function getSquareFromNumbericalPosition({
  col,
  row,
}: {
  col: number
  row: number
}): Square {
  const c = files[col - 1]
  return `${c}${row.toString()}` as Square
}

export function getAdjecentPosition(
  positions: PiecesPositions,
  orig: PiecesID,
  dest: PiecesID,
): Square {
  const positionAtOrigin = getNumbericalPosition(positions[orig])
  const positionAtDest = getNumbericalPosition(positions[dest])
  const diffCol = positionAtDest.col - positionAtOrigin.col
  const diffRow = positionAtDest.row - positionAtOrigin.row
  const direction: {col: number; row: number} = {
    col: diffCol > 0 ? 1 : diffCol < 0 ? -1 : 0,
    row: diffRow > 0 ? 1 : diffRow < 0 ? -1 : 0,
  }
  const steps = Math.abs(Math.max(Math.abs(diffRow), Math.abs(diffCol))) - 1
  const newPosition = {
    col: positionAtOrigin.col + direction.col * steps,
    row: positionAtOrigin.row + direction.row * steps,
  }
  const positionToMove = getSquareFromNumbericalPosition(newPosition)
  return positionToMove
}
