import { Move, ShortMove, Square } from "chess.js";
import { Color, Key } from "chessground/types";
import { ChessgroundProps } from "react-chessground";
import { RooksMoved } from "wargame-engine";

export type PieceName = 'bishop' | 'pawn' | 'rook' | 'knight' | 'king' | 'queen';

export type ChessDests = Map<Key, Key[]>;

export type ChessColorWhite = 'white';

export type ChessColorBlack = 'black';

export type ChessColor = ChessColorWhite | ChessColorBlack;

export type GamePlayer = {
  // name: string;
  [id :string]: Color;
};

export type ActivePieces = {
  white: Record<PieceInitial, number>;
  black :Record<PieceInitial, number>;
}

export type Game = {
  id: string;
  // timeLeft : {
  //   white: number;
  //   black: number;
  // };
  homeColor: Color,
  fen: string;
  state : 'started' | 'stopped' | 'pending';
  players: [GamePlayer, GamePlayer];
  lastMoveBy: Color | undefined;
  turn: Color;
  // lastMoveAt: string | undefined;
  // startedAt: string;
  // activePieces: ActivePieces;
}

export type HistoryMove = {
  move: ChessMove,
  type: MoveType,
  rooksMoved: RooksMoved
}

export type GameWithPieces = Game & {
  pieces: {
    positions: PiecesPositions
    healths: PiecesHealth
  },
  history: HistoryMove[]
}

export type PiecesHealthAndDamageDict = {
  [k in PieceName]: {
    health: number
    damage: number
  }
}

export type ChessBoardGameState = {
  pgn: string;
  fen: string;
  history: Move[];

  turn: Color;
  inCheck: boolean;
  isPreMovable: boolean;
  movable: ChessgroundProps['movable'];

  displayable: {
    fen: string;
    lastMoveFromTo: [ChessMove['from'], ChessMove['to']] | undefined;
  }
};

// export type ChessHistoryBaseMove = ChessMove & {
//    san: string;
//    clock: number;
// }

// export type ChessHistoryMoveWhite = ChessHistoryBaseMove & {
//   color: 'white'
// }

// export type ChessHistoryMoveBlack = ChessHistoryBaseMove & {
//   color: 'black';
// }

// export type ChessHistoryMove = ChessHistoryMoveBlack | ChessHistoryMoveWhite;

export type ChessHistory = ShortMove[];

export type ChessMove = {
  to: Square;
  from: Square;
  promotion? : 'n' | 'q' | 'b' | 'r'; 
}

export type ChessBoardConfig = {
  showDests?: boolean;
};

export type CalcMovableProps = {
  playableColor: Color;
  canInteract?: boolean;
  playable?: boolean;
  config?: ChessBoardConfig;
  displayable?: {
    fen: string;
    pgn: string;
    history: ChessHistory;
  };
};

export const PiecesListOfIds = {
  bR0: null,
  bN0: null,
  bB0: null,
  bQ0: null,
  bK0: null,
  bB1: null,
  bN1: null,
  bR1: null,
  bP0: null,
  bP1: null,
  bP2: null,
  bP3: null,
  bP4: null,
  bP5: null,
  bP6: null,
  bP7: null,
  wR0: null,
  wN0: null,
  wB0: null,
  wQ0: null,
  wK0: null,
  wB1: null,
  wN1: null,
  wR1: null,
  wP0: null,
  wP1: null,
  wP2: null,
  wP3: null,
  wP4: null,
  wP5: null,
  wP6: null,
  wP7: null,
}

export type PiecesID = keyof typeof PiecesListOfIds;

export type PiecesHealth = {
  [k in PiecesID] : number;
}

export type PiecesPositions = {
  [k in PiecesID] : Square;
}

export type PieceInitial = 'k' | 'r' | 'q' | 'n' | 'b' | 'p';

export type InitialToPieceName = {
  [k in PieceInitial]: PieceName
}

export type IndexPosition = {
  [k in Square]: PiecesID
}

export type MoveType = 'range' | 'melee'

export type MovableDests = {
  free? :boolean;
  rangeDests: ChessDests;
  meleeDests: ChessDests;
  color: Color;
  showDests: boolean;
}