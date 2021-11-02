import { ChessPieceTypes, PlayerColor } from "../../types";
import { sumCoordsByColor } from "../../utils";
import { BoardModel, BoardSquareModel } from "../BoardModel/BoardModel";
import { PieceModel } from "./PieceModel/PieceModel";

export class Pawn extends PieceModel {
  private pieceMoved : boolean = false;
  constructor(
    private color: PlayerColor,
    private _currentSquare: BoardSquareModel
  ){ 
    super(ChessPieceTypes.pawn)
  };

  listAvailableMoves(board: BoardModel) : BoardSquareModel[] {
    const squaresToMoveTo = [];
    const [squareToMoveX, squareToMoveY] = sumCoordsByColor(this, [1,0]);
    squaresToMoveTo.push(board[squareToMoveX][squareToMoveY]);

    if (!this.pieceMoved) {
      const [initialMoveSquareX, initialMoveSquareY] = sumCoordsByColor(this, [2,0]);
      squaresToMoveTo.push(board[initialMoveSquareX][initialMoveSquareY]);
    }

    return squaresToMoveTo;
  }

  get hasMoved ():boolean {
    return this.pieceMoved
  }

  get pieceColor (): PlayerColor {
    return this.color;
  }

  get currentSquare (): BoardSquareModel | undefined {
    if (! this._currentSquare) { 
      return undefined;
    }
    return new BoardSquareModel(this._currentSquare.location, this);
  }
}