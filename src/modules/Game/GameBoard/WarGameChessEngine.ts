import { pieceInitialHealthAndDamage } from "src/config";
import { IndexPosition, PiecesHealth, PiecesID, PiecesPositions } from "src/types";
import {Chess, ShortMove, Square} from 'chess.js';
import { getPiecesDamage } from "src/utils";

class WarChessEngine extends Chess {
  private piecePositions : PiecesPositions =  {
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
  private pieceHealth : PiecesHealth =  {
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

  private piecePositionIndexedBySquare: IndexPosition;

  constructor(pgn?: string) {
    super();
    if (pgn) {
      this.load_pgn(pgn);
    }
    this.piecePositionIndexedBySquare = this.setPiecesPositionsBySquare(this.piecePositions);
  }

  private setPiecesPositionsBySquare(positions: PiecesPositions): IndexPosition {
    return Object.keys(positions).reduce((sum, el) => {
      return {
        ...sum,
        [positions[el as PiecesID]]: el,
      }
    }, {} as IndexPosition)
  }
  
  onMove(move: ShortMove, options? : {sloppy? :boolean} | undefined): boolean {
    const valid = this.move(move);
    if (!valid) {
      return false;
    } 
    this.undo();

    const pieceAtDest = this.piecePositionIndexedBySquare[move.to];
    const pieceAtOrig = this.piecePositionIndexedBySquare[move.from];
    
    if (pieceAtDest) {
      const damage = getPiecesDamage(pieceAtOrig);
      const newHealth = this.pieceHealth[pieceAtDest] - damage;

      if (newHealth > 0) {
        this.updateHealth(pieceAtDest, newHealth);
        this.swapTurn();
        return false;
      }


    }
    this.updatePosition(pieceAtOrig, move.to);
    this.move(move);
    return true;

  }

  setPiecesPositions(positions: PiecesPositions) {
    this.piecePositions = positions;
  }
  setPiecesHealth(healths: PiecesHealth) {
    this.pieceHealth = healths;
  }

  getTurn(){
    return this.turn();
  }

  swapTurn() {
    const tokens = this.fen().split(' ');
    tokens[1] = this.turn() === "b" ? "w" : "b";
    //Without changing the en passant flag, the FEN can fail to load when white pushes a pawn two spaces and then black skips the turn.
    tokens[3] = "-";
    this.load(tokens.join(' '));
  }

  getHealth() {
    return this.pieceHealth;
  }

  getPosition() {
    return this.piecePositions
  }

  removePiece(piece: PiecesID){
    const {[piece]: pieceToRemove, ...restPositions} = this.piecePositions;
    this.setPiecesPositions(restPositions as PiecesPositions);
    const {[piece]: healthToRemove, ...restHealth} = this.pieceHealth;
    this.setPiecesHealth(restHealth as PiecesHealth);
    this.piecePositionIndexedBySquare = this.setPiecesPositionsBySquare(restPositions as PiecesPositions);
  }

  updatePosition(piece:PiecesID, position: Square) {
    const newPositions = {...this.piecePositions};
    newPositions[piece] = position;
    this.setPiecesPositions(newPositions)
  }

  updateHealth (piece: PiecesID, health: number) {
    const newHealths = {...this.pieceHealth};
    newHealths[piece] = health;
    this.setPiecesHealth(newHealths);
  }
}

let instance: WarChessEngine;

export const getNewWargameEngine = (pgn?: string) => {
  if (!instance) {
    instance = new WarChessEngine(pgn);
  } 
  return instance;
}
