import { ChessPieceTypes, PlayerColor } from '../../../types';
import { BoardModel, BoardSquareModel } from '../../BoardModel/BoardModel';


export abstract class PieceModel {
  constructor(private readonly _type: ChessPieceTypes) { }
  
  get type() {
    return this._type;
  }

  abstract listAvailableMoves(board: BoardModel): BoardSquareModel[];
  
  abstract get pieceColor(): PlayerColor;

  abstract get currentSquare(): BoardSquareModel | undefined;
}