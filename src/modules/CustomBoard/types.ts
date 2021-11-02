export enum ChessPieceTypes {
  pawn = 'p',
  rook = 'r',
  bishop = 'b',
  knight = 'n',
  queen = 'q',
  king = 'k',
}

export type PiecesNames = keyof ChessPieceTypes;

export enum PlayerColor  {
  black = 'BLACK',
  white = 'WHITE',
}

export type Piece = {
  type : ChessPieceTypes;
  damage: number;
  health: number;
  color: PlayerColor;
  movementDetails: Coordinates;
  attackType: AttackType;
}

export type AttackType = 'melee' | 'range';

export interface AttackDetails {
	direction: Coordinates;
	damage: number;
	attackType: AttackType;
	distance: number;
}

export type Coordinates = {
  x: number;
  y: number;
}

export type IndexedPieces = {
  [k : string] : Piece;
}
