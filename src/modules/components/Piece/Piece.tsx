import React from 'react';
import { createUseStyles } from '../../../lib/jss';
import {Pieces} from 'react-chessboard';
import {pieces} from './media/pieces';
import {defaultPieces} from './media/pieces_svg';
import {GiBattleAxe, GiHearts} from 'react-icons/gi';

type Props = {
  damage: number;
  health: number;
  type: Pieces
};

export const Piece: React.FC<Props> = (props) => {
  const cls = useStyles();
  const {damage, health, type} = props;

  return (
    <div className={cls.container}>
    <img src={pieces[type]} width={45} height={45} alt={props.type}/>
    <div className={cls.bottomPart}>
    <div className={cls.infoContainer}>
      <GiBattleAxe color='#2f61bf'/>
      <div className={cls.damageDisplay}>{damage}</div>
    </div>
    <div className={cls.infoContainer}>
      <GiHearts color='#cb4141'/>
      <div className={cls.healthDisplay}>{health}</div>
    </div>
    </div>
   {/* {defaultPieces[type]} */}
   </div>
  );
};

const useStyles = createUseStyles({
  container: {
    display:'flex',
    flexDirection:'column'
  },
  damageDisplay: {
    fontSize: '11px'
  },
  healthDisplay:{
    fontSize:'11px'
  },
  bottomPart: {
    display:'flex',
  },
  infoContainer:{
    display:'flex',
    flexDirection:'row',
  }
});