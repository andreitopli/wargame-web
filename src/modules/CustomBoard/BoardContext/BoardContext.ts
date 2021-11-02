import { createContext } from "react";
import { BoardModel, BoardSquareModel } from "../components/BoardModel/BoardModel";

export type BoardContextProps = {
  board: BoardModel;
  selectSquare: (square: BoardSquareModel) => void;
}

export const BoardContext = createContext<BoardContextProps>({} as BoardContextProps);
