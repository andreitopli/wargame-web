import {pieceInitialHealthAndDamage} from 'src/config'
import {
  IndexPosition,
  MovableDests,
  PieceInitial,
  PiecesHealth,
  PiecesID,
  PiecesPositions,
} from 'src/modules/Game/types'
import {ChessInstance, ShortMove, Square} from 'chess.js'
import {
  getAdjecentPosition,
  getIfPieceInbetweenOrigAndDest,
  getPiecesDamage,
  pieceTypeToPieceName,
  setPiecesPositionsBySquare,
} from 'src/modules/Game/utils'
import {MoveType} from 'chessground/types'
import {toChessColor} from './StyledBoard/utils'
import { Pubsy } from 'src/lib/Pubsy'

type Rooks = 'wR1' | 'wR0' | 'bR0' | 'bR1'

type UpdateEvents = {
  onUpdateHealth: undefined;
}

const piecesInitialPositions: PiecesPositions = {
  bR0: 'a8',
  bN0: 'b8',
  bB0: 'c8',
  bQ0: 'd8',
  bK0: 'e8',
  bB1: 'f8',
  bN1: 'g8',
  bR1: 'h8',
  bP0: 'a7',
  bP1: 'b7',
  bP2: 'c7',
  bP3: 'd7',
  bP4: 'e7',
  bP5: 'f7',
  bP6: 'g7',
  bP7: 'h7',
  wR0: 'a1',
  wN0: 'b1',
  wB0: 'c1',
  wQ0: 'd1',
  wK0: 'e1',
  wB1: 'f1',
  wN1: 'g1',
  wR1: 'h1',
  wP0: 'a2',
  wP1: 'b2',
  wP2: 'c2',
  wP3: 'd2',
  wP4: 'e2',
  wP5: 'f2',
  wP6: 'g2',
  wP7: 'h2',
}

export class WarChessEngine {
  private piecePositions: PiecesPositions = {
    bR0: 'a8',
    bN0: 'b8',
    bB0: 'c8',
    bQ0: 'd8',
    bK0: 'e8',
    bB1: 'f8',
    bN1: 'g8',
    bR1: 'h8',
    bP0: 'a7',
    bP1: 'b7',
    bP2: 'c7',
    bP3: 'd7',
    bP4: 'e7',
    bP5: 'f7',
    bP6: 'g7',
    bP7: 'h7',
    wR0: 'a1',
    wN0: 'b1',
    wB0: 'c1',
    wQ0: 'd1',
    wK0: 'e1',
    wB1: 'f1',
    wN1: 'g1',
    wR1: 'h1',
    wP0: 'a2',
    wP1: 'b2',
    wP2: 'c2',
    wP3: 'd2',
    wP4: 'e2',
    wP5: 'f2',
    wP6: 'g2',
    wP7: 'h2',
  }
  private rooksMoved: {[k in Rooks]: boolean} = {
    wR0: false,
    wR1: false,
    bR0: false,
    bR1: false,
  }

  private pieceHealth: PiecesHealth = {
    bR0: pieceInitialHealthAndDamage.rook.health,
    bN0: pieceInitialHealthAndDamage.knight.health,
    bB0: pieceInitialHealthAndDamage.bishop.health,
    bQ0: pieceInitialHealthAndDamage.queen.health,
    bK0: pieceInitialHealthAndDamage.king.health,
    bB1: pieceInitialHealthAndDamage.bishop.health,
    bN1: pieceInitialHealthAndDamage.knight.health,
    bR1: pieceInitialHealthAndDamage.rook.health,
    bP0: pieceInitialHealthAndDamage.pawn.health,
    bP1: pieceInitialHealthAndDamage.pawn.health,
    bP2: pieceInitialHealthAndDamage.pawn.health,
    bP3: pieceInitialHealthAndDamage.pawn.health,
    bP4: pieceInitialHealthAndDamage.pawn.health,
    bP5: pieceInitialHealthAndDamage.pawn.health,
    bP6: pieceInitialHealthAndDamage.pawn.health,
    bP7: pieceInitialHealthAndDamage.pawn.health,
    wR0: pieceInitialHealthAndDamage.rook.health,
    wN0: pieceInitialHealthAndDamage.knight.health,
    wB0: pieceInitialHealthAndDamage.bishop.health,
    wQ0: pieceInitialHealthAndDamage.queen.health,
    wK0: pieceInitialHealthAndDamage.king.health,
    wB1: pieceInitialHealthAndDamage.bishop.health,
    wN1: pieceInitialHealthAndDamage.knight.health,
    wR1: pieceInitialHealthAndDamage.rook.health,
    wP0: pieceInitialHealthAndDamage.pawn.health,
    wP1: pieceInitialHealthAndDamage.pawn.health,
    wP2: pieceInitialHealthAndDamage.pawn.health,
    wP3: pieceInitialHealthAndDamage.pawn.health,
    wP4: pieceInitialHealthAndDamage.pawn.health,
    wP5: pieceInitialHealthAndDamage.pawn.health,
    wP6: pieceInitialHealthAndDamage.pawn.health,
    wP7: pieceInitialHealthAndDamage.pawn.health,
  }

  private pubsy = new Pubsy<UpdateEvents>();

  private piecePositionIndexedBySquare: IndexPosition =
    setPiecesPositionsBySquare(this.piecePositions)

  constructor(private chess: ChessInstance, pgn?: string) {
    if (pgn) {
      chess.load_pgn(pgn)
    }
  }

  fen() {
    return this.chess.fen()
  }

  pgn() {
    return this.chess.pgn()
  }

  turn() {
    return this.chess.turn()
  }

  move(
    move: ShortMove,
    type: MoveType,
    options?: {sloppy?: boolean} | undefined,
  ): boolean {
    const valid = this.chess.move(move, {}, type)
    if (!valid) {
      return false
    }
    this.chess.undo()

    const pieceAtDest = this.piecePositionIndexedBySquare[move.to]
    const pieceAtOrig = this.piecePositionIndexedBySquare[move.from]
    if (pieceAtDest) {
      const damage = getPiecesDamage(pieceAtOrig)
      const newHealth = this.pieceHealth[pieceAtDest] - damage

      const originPieceType =
        pieceTypeToPieceName[
          pieceAtOrig.split('')[1].toLowerCase() as PieceInitial
        ]

      //DEALING DAMAGE
      if (newHealth > 0) {
        // For King, Pawn and Knight - keep position and deal damage
        if (
          originPieceType === 'king' ||
          originPieceType === 'pawn' ||
          originPieceType === 'knight'
        ) {
          this.updateHealth(pieceAtDest, newHealth)
          this.swapTurn()
          return false
        }

        // For Bishop, Queen and Rook - deal damage and move adjecent - only if square is farther than the near one
        if (type === 'melee') {
          const positionToMove = getAdjecentPosition(
            this.piecePositions,
            pieceAtOrig,
            pieceAtDest,
          )
          if (positionToMove !== move.from) {
            console.log(`moving the ${originPieceType} to adjecent position`)
            const moveAdj: ShortMove = {
              from: move.from,
              to: positionToMove,
            }
            this.chess.move(moveAdj, {sloppy: true}, 'melee')
            if (pieceAtOrig in this.rooksMoved) {
              this.rooksMoved[pieceAtOrig as Rooks] = true
              console.log('PIECE IS ROOK!', this.rooksMoved);
            }
            this.updatePosition(pieceAtOrig, positionToMove)
            this.updateHealth(pieceAtDest, newHealth)
            return true
          }
        }

        // Range
        //Queen and Bishop and Rook
        this.updateHealth(pieceAtDest, newHealth)
        this.swapTurn()
        if (pieceAtOrig in this.rooksMoved) {
          if (this.rooksMoved[pieceAtOrig as Rooks]){
            this.rooksMoved[pieceAtOrig as Rooks] = false
          }
          console.log('PIECE IS ROOK!', this.rooksMoved);
        }
        return false
      }

      //New health < 0 - CAPTURE MOVE

      //For King, Pawn and Knight - move normally
      if (
        originPieceType === 'pawn' ||
        originPieceType === 'king' ||
        originPieceType === 'knight'
      ) {
        this.updatePosition(pieceAtOrig, move.to)
        this.removePiece(pieceAtDest)
        this.chess.move(move, {}, 'melee')
        return true
      }

      //For Queen, Bishop and Rook - melee move normally and range just take the piece out
      if (type === 'melee') {
        this.updatePosition(pieceAtOrig, move.to)
        this.removePiece(pieceAtDest)
        this.chess.move(move, {}, 'melee')
        if (pieceAtOrig in this.rooksMoved) {
          this.rooksMoved[pieceAtOrig as Rooks] = true
          console.log('PIECE IS ROOK!',this.rooksMoved);
        }
        return true
      }
      this.removePiece(pieceAtDest)
      this.chess.remove(move.to)
      if (pieceAtOrig in this.rooksMoved) {
        if (this.rooksMoved[pieceAtOrig as Rooks]) {
          this.rooksMoved[pieceAtOrig as Rooks] = false
        }
        console.log('PIECE IS ROOK!', this.rooksMoved);
      }
      return false
    }
    // Empty square at dest
    this.updatePosition(pieceAtOrig, move.to)
    this.chess.move(move, {}, 'melee')
    if (pieceAtOrig in this.rooksMoved) {
      console.log('PIECE IS ROOK!', this.rooksMoved);
      this.rooksMoved[pieceAtOrig as Rooks] = true
    }
    return true
  }

  dests(): MovableDests {
    const rangeDests = new Map()
    const meleeDests = new Map()
    console.log('CALCULATING NEW DESTS!')
    this.SQUARES().forEach((s) => {
      const msRange = this.chess.moves({square: s, verbose: true}, 'range')
      const filterRookMoves = msRange.filter((move) => {
        //if it's a rook and it's a CAPTURE move, otherwise skip this check and return the moves
        if (move.piece === 'r' && 'captured' in move) {
          //first check if any piece in between them, otherwise it's a normal attack 
          if (
                getIfPieceInbetweenOrigAndDest(
                  this.piecePositions,
                  this.piecePositionIndexedBySquare[move.from],
                  this.piecePositionIndexedBySquare[move.to]
          )) {
            //check if the attacked piece has moved before. if it's still in initial position it cannot be attacked!
            if (this.piecePositionIndexedBySquare[move.to] === setPiecesPositionsBySquare(piecesInitialPositions)[move.to]) {
              return false
            }
            //check if the rook has moved before. if it has moved, it must hold position so it cannot attack over a piece
            if (this.rooksMoved[this.piecePositionIndexedBySquare[move.from] as Rooks]) {
              return false
            }
          }
          return true;
        }
        return true
      }).map((m) => m.to)
      if (filterRookMoves.length)
      rangeDests.set(
        s,
        filterRookMoves
        )
      const msMelee = this.chess.moves({square: s, verbose: true}, 'melee')
      if (msMelee.length)
        meleeDests.set(
          s,
          msMelee.map((m) => m.to),
        )
    })
    return {
      free: false,
      showDests: true,
      color: toChessColor(this.getTurn()),
      rangeDests,
      meleeDests,
    }
  }

  history() {
    return this.chess.history({verbose: true})
  }

  load(pgn: string) {
    this.chess.load_pgn(pgn)
  }

  setPiecesPositions(positions: PiecesPositions) {
    this.piecePositions = positions
    this.piecePositionIndexedBySquare = setPiecesPositionsBySquare(positions)
  }
  setPiecesHealth(healths: PiecesHealth) {
    this.pieceHealth = healths
    this.pubsy.publish('onUpdateHealth', undefined);
  }

  getTurn() {
    return this.chess.turn()
  }

  SQUARES() {
    return this.chess.SQUARES
  }

  moves(options: {verbose: true; square?: string | undefined}, type: MoveType) {
    return this.chess.moves(options, type)
  }

  swapTurn() {
    console.group('swap turn now!')
    console.log('current turn', this.chess.turn())
    console.log('fen: ', this.chess.fen())

    const tokens = this.chess.fen().split(' ')
    tokens[1] = this.chess.turn() === 'b' ? 'w' : 'b'
    //Without changing the en passant flag, the FEN can fail to load when white pushes a pawn two spaces and then black skips the turn.
    tokens[3] = '-'
    //if turn is w the full moves should be an even number as it updates after black moves.
    tokens[5] =
      this.chess.turn() === 'b' ? (Number(tokens[5]) + 1).toString() : tokens[5]
    this.chess.load(tokens.join(' '))
    console.log('new fen: ', tokens.join(' '))
    console.log('new turn:', this.chess.turn())
    console.groupEnd()
  }

  getHealth() {
    return this.pieceHealth
  }

  moveRook(piece: Rooks) {
    this.rooksMoved[piece] = true
  }

  getPosition() {
    return this.piecePositions
  }

  removePiece(piece: PiecesID) {
    const {[piece]: pieceToRemove, ...restPositions} = this.piecePositions
    this.setPiecesPositions(restPositions as PiecesPositions)
    const {[piece]: healthToRemove, ...restHealth} = this.pieceHealth
    this.setPiecesHealth(restHealth as PiecesHealth)
    this.piecePositionIndexedBySquare = setPiecesPositionsBySquare(
      restPositions as PiecesPositions,
    )
  }

  updatePosition(piece: PiecesID, position: Square) {
    const newPositions = {...this.piecePositions}
    newPositions[piece] = position
    this.setPiecesPositions(newPositions)
  }

  updateHealth(piece: PiecesID, health: number) {
    const newHealths = {...this.pieceHealth}
    newHealths[piece] = health
    this.setPiecesHealth(newHealths)
  }

  onHealthUpdate(fn : () => void) {
    this.pubsy.subscribe('onUpdateHealth', fn)
  }
}
