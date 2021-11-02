import React from 'react';
import { createUseStyles } from 'src/lib/jss';
import { ChessPieceTypes, PlayerColor } from '../../types';
import Piece from 'react-chess-pieces';

type Props = {
  selected: boolean;
  canReceivePiece?: boolean;
  piece?: {
    color: PlayerColor;
    type: ChessPieceTypes;
  }
};

export const BoardSquare: React.FC<Props> = ({
  selected,
  canReceivePiece,
  piece
}) => {
  const cls = useStyles();
  
  return (
    <div className={cls.container} style={{backgroundColor: selected ? 'lightgrey' : 'grey'}}>
      {canReceivePiece && <div className={cls.receiver}></div>}
      {piece && <div style={{...(piece?.color === PlayerColor.black) && {transform: 'rotate(180deg)'}}}>
        <Piece piece={
          piece.color === PlayerColor.white ? piece.type.toUpperCase() : piece?.type.toLowerCase()
        }/>
      </div>}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    width: '100px',
  height: '100px',
  border: '1px solid darkgray',
  color: 'white',
  position: 'relative',
  },
  receiver: {
    width: '25px',
  height: '25px',
  background: 'lightblue',
  borderRadius: '50%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  }
});