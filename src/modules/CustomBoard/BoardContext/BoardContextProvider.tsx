import React, { useCallback, useEffect, useState } from 'react';
import { BoardModel, BoardSquareModel } from '../components/BoardModel/BoardModel';
import { getInitialPositionPiece } from '../utils';
import { BoardContext } from './BoardContext';

type Props = {};

export const BoardContextProvider: React.FC<Props> = (props) => {
  const [board, setBoard] = useState<BoardModel>([]);
  const [selectedSquare, setSelectedSquare] = useState<BoardSquareModel>()

  useEffect(() => {
    initBoardSquares();
    initBoardPieces();
  },[]);

  const initBoardSquares = () => {
    setBoard((initialBoard) => {
      for (let line = 0; line < 8; line++) {
        initialBoard[line] = [];
        for (let column = 0; column < 8; column++) {
          initialBoard[line][column] = new BoardSquareModel([line, column]);
        }
      }

      return initialBoard;
    });
  }

  const initBoardPieces = () => {
    setBoard((currentBoard) => {
      const updatedBoard = {...currentBoard};
      for (let line = 0; line < 8; line++) {
        for (let column = 0; column < 8; column++) {
          const boardSquare = updatedBoard[line][column];

          const pieceToBeInserted = getInitialPositionPiece(boardSquare);

          if (pieceToBeInserted) {
            boardSquare.setPiece(pieceToBeInserted)
          };
        }
      }

      return updatedBoard;
    })
  }

  const selectSquare = useCallback((squareToSelect: BoardSquareModel) => {
    if (squareToSelect.isSelected) { 
      return;
   }

    setBoard((currentBoard) => {
      const updatedBoard = currentBoard.map((line) => {
        return line.map((square) => {
          square.unselect();
          if (square.equals(squareToSelect)) {
            square.select();
            setSelectedSquare(square);
          }
          return square;
        });
      })
      return updatedBoard;
    })
  },[setBoard, setSelectedSquare]);

  useEffect(() => {
    if (!selectedSquare || !selectedSquare.currentPiece) { 
      return;
    }
    setBoard((currentBoard) => {
      const updatedBoard = {...currentBoard};
      selectedSquare.currentPiece?.listAvailableMoves(currentBoard).forEach((square : BoardSquareModel) => {
        updatedBoard[square.location[0]][square.location[1]].setCanReceivePiece(true);      
      })
      return updatedBoard;
    })
  },[selectedSquare])

  return (
    <BoardContext.Provider value={{
      board,
      selectSquare
    }}>
      {props.children}
    </BoardContext.Provider>
  );
};
