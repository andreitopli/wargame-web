import {Square} from 'chess.js'
import {files} from 'chessground/types'
import {pieceInitialHealthAndDamage} from '../../config'
import {
  GameWithPieces,
  IndexPosition,
  InitialToPieceName,
  PiecesHealth,
  PiecesHealthAndDamageDict,
  PiecesID,
  PiecesPositions,
} from './types'

import {WarGameRecord, GuestUserRecord, warGameActions} from 'dstnd-io'
import { getNewChessGame } from 'src/lib/chess/chess'
import { defaultPiecesPositions } from 'wargame-engine/dist/gameConfig'

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

export const extractPiecesHealth = (
  defaults: PiecesHealthAndDamageDict,
): PiecesHealth => {
  return {
    bR0: defaults.rook.health,
    bN0: defaults.knight.health,
    bB0: defaults.bishop.health,
    bQ0: defaults.queen.health,
    bK0: defaults.king.health,
    bB1: defaults.bishop.health,
    bN1: defaults.knight.health,
    bR1: defaults.rook.health,
    bP0: defaults.pawn.health,
    bP1: defaults.pawn.health,
    bP2: defaults.pawn.health,
    bP3: defaults.pawn.health,
    bP4: defaults.pawn.health,
    bP5: defaults.pawn.health,
    bP6: defaults.pawn.health,
    bP7: defaults.pawn.health,
    wR0: defaults.rook.health,
    wN0: defaults.knight.health,
    wB0: defaults.bishop.health,
    wQ0: defaults.queen.health,
    wK0: defaults.king.health,
    wB1: defaults.bishop.health,
    wN1: defaults.knight.health,
    wR1: defaults.rook.health,
    wP0: defaults.pawn.health,
    wP1: defaults.pawn.health,
    wP2: defaults.pawn.health,
    wP3: defaults.pawn.health,
    wP4: defaults.pawn.health,
    wP5: defaults.pawn.health,
    wP6: defaults.pawn.health,
    wP7: defaults.pawn.health,
  }
}

const createGuestUser = (
  guest: Pick<GuestUserRecord, 'firstName' | 'lastName' | 'name'>,
) => ({
  firstName: guest.firstName,
  lastName: guest.lastName,
  name: guest.name,
  avatarId: '1',
  isGuest: true,
  id: String(new Date().getTime()),
  sid: String(new Date().getTime()),
})

export function createNewGame(): WarGameRecord {
  const guestA = createGuestUser({
    firstName: 'Guest1',
    lastName: 'User',
    name: 'Guest User 1',
  }) as unknown as GuestUserRecord

  const guestB = createGuestUser({
    firstName: 'Guest2',
    lastName: 'User',
    name: 'Guest User 2',
  }) as unknown as GuestUserRecord
  return {
    ...warGameActions.prepareGame({
      players: [guestA, guestB],
      timeLimit: 'blitz2',
      preferredColor: 'white',
    }),
    id: new Date().getTime().toString(),
    createdAt: new Date().getTime() as any,
    updatedAt: new Date().getTime() as any,
  }
}

export function createNewGameWithPieces(): GameWithPieces {
  const chess = getNewChessGame()
  return {
    fen: chess.fen(),
    id: new Date().getTime().toString(),
    state: 'pending',
    players: [
      {
        player1: 'black',
      },
      {player2: 'white'},
    ],
    pieces: {
      positions: defaultPiecesPositions,
      healths: extractPiecesHealth(pieceInitialHealthAndDamage)
    },
    history: [],
    homeColor: 'white',
    lastMoveBy: undefined,
    turn: 'white',
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

export function getIfPieceInbetweenOrigAndDest(
  positions: PiecesPositions,
  orig: PiecesID,
  dest: PiecesID,
): boolean {
  const indexPositions = setPiecesPositionsBySquare(positions)
  const positionAtOrigin = getNumbericalPosition(positions[orig])
  const positionAtDest = getNumbericalPosition(positions[dest])
  // console.group('get if piece in between ', orig, 'and ', dest);
  // console.log('indexPositions', indexPositions)
  // console.log('positionAtOrigin', positionAtOrigin)
  // console.log('positionAtDEst', positionAtDest)
  // console.groupEnd()
  if (positionAtOrigin.col === positionAtDest.col) {
    //on same column
    const highGround = Math.max(positionAtDest.row, positionAtOrigin.row)
    const lowGround = Math.min(positionAtDest.row, positionAtOrigin.row)
    for (let i = lowGround + 1; i < highGround; i++) {
      if (
        indexPositions[
          getSquareFromNumbericalPosition({col: positionAtOrigin.col, row: i})
        ]
      ) {
        return true
      }
      continue
    }
    return false
  } else if (positionAtOrigin.row === positionAtDest.row) {
    //on same row
    const highGround = Math.max(positionAtDest.col, positionAtOrigin.col)
    const lowGround = Math.min(positionAtDest.col, positionAtOrigin.col)
    for (let i = lowGround + 1; i < highGround; i++) {
      if (
        indexPositions[
          getSquareFromNumbericalPosition({col: i, row: positionAtDest.row})
        ]
      ) {
        return true
      }
      continue
    }
    return false
  }
  return false
}
