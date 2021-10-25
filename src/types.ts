export type PieceName = 'bishop' | 'pawn' | 'rook' | 'knight' | 'king' | 'queen'

export type PiecesHealthAndDamageDict = {
  [k in PieceName] : {
    health : number;
    damage: number;
  }
}

export type InitialToPieceName = {
  [k: string] : PieceName
}