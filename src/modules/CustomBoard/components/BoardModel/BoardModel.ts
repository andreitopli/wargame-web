import { PieceModel } from '../Pieces/PieceModel/PieceModel';

export class BoardSquareModel {
  private readonly _location: [number, number];
  private _currentPiece?: PieceModel;
  private _selected: boolean;
  private _canReceivePiece?: boolean;

  constructor(location: [number, number], initialPiece?: PieceModel) {
    this._location = location;
    this._currentPiece = initialPiece;
    this._selected = false;
  }

  setPiece(piece: PieceModel) {
    this._currentPiece = piece;
  }

  clearSquare() {
    this._currentPiece = undefined;
  }

  select() {
    this._selected = true;
  }

  unselect() {
    this._selected = false;
    this._canReceivePiece = false;
  }

  setCanReceivePiece(input: boolean) {
    this._canReceivePiece = input;
  }

  get canReceivePiece() {
    return this._canReceivePiece;
  }

  get currentPiece() {
    return this._currentPiece;
  }

  get isSelected() {
    return this._selected;
  }

  get location(): [number, number] {
    return [...this._location];
  }

  equals(squareModel: BoardSquareModel): boolean {
    return (
      JSON.stringify(this.location) ===
      JSON.stringify(squareModel.location)
    );
  }
}

export type BoardModel = BoardSquareModel[][];