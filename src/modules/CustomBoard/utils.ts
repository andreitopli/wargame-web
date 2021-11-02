import { BoardSquareModel } from "./components/BoardModel/BoardModel";
import { Pawn } from "./components/Pieces/Pawn";
import { PieceModel } from "./components/Pieces/PieceModel/PieceModel";
import { Coordinates, Piece, PlayerColor } from "./types";

export const Directions = {
	UP: { x: 0, y: -1 },
	RIGHT: { x: 1, y: 0 },
	DOWN: { x: 0, y: 1 },
	LEFT: { x: -1, y: 0 }
};

export const getTileCoordinates = (x: number, y: number) : Coordinates => ({x, y});

export const getDeltaBetween2Points = (a : Coordinates, b: Coordinates) => ({
  x: Math.abs(a.x - b.x),
  y: Math.abs(a.y - b.y)
})

export const getDistanceBetween2Points = (a: Coordinates, b:Coordinates) => {
  const {x, y} = getDeltaBetween2Points(a, b);
  return x + y;
}

export const getRelativeDirectionFromAtoB = (from: Coordinates, to: Coordinates) => {
	if (from.x < to.x) {
		return Directions.RIGHT;
	}
	if (from.x > to.x) {
		return Directions.LEFT;
	}
	if (from.y < to.y) {
		return Directions.DOWN;
	}
	if (from.y > to.y) {
		return Directions.UP;
	}
	return { x: 0, y: 0 };
};

export const getInitialPositionPiece = (square: BoardSquareModel) : PieceModel | undefined => {
  const [x, y] =  square.location;
  let color : PlayerColor | undefined;

  if (x === 0 || x === 1) {
    color = PlayerColor.black;
  } else if (x === 6 || x === 7) {
    color = PlayerColor.white;
  }

  if (!color) {
    return undefined
  }

  if (x === 1 || x === 6) {
    return new Pawn(color, square)
  }
}

export function sumCoordsByColor(
  chessPiece: PieceModel,
  operatorVec: [number, number]
): [number, number] {
  if (!chessPiece.currentSquare) return [-1, -1];

  const [currentX, currentY] = chessPiece.currentSquare.location;
  const [operatorX, operatorY] = operatorVec;

  return chessPiece.pieceColor === PlayerColor.black
    ? [currentX + operatorX, currentY + operatorY]
    : [+(currentX - operatorX), +(currentY - operatorY)];
}