import React from 'react';
import { createUseStyles } from '../../../../lib/jss';
import { useBoard } from '../../BoardContext/useBoard';
import { BoardSquare } from '../BoardSquare/BoardSquare';


type Props = {};

export const Board: React.FC<Props> = (props) => {
  const cls = useStyles();
  const {board, selectSquare} = useBoard();

  return (
    <div className={cls.container}>
      {board.length > 0 && board.map((line, index) => (
        <div className={cls.line} key={index}>
          {line.map((square, index) => (
            <button onClick={() => selectSquare(square)} key={index}>
              <BoardSquare
                selected={square.isSelected}
                canReceivePiece={square.canReceivePiece}
                piece={
                  square.currentPiece && {
                    color : square.currentPiece.pieceColor,
                    type: square.currentPiece.type
                  }
                }/>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {},
  line: {
    display: 'flex'
  }
});