import React from 'react';
import {GiBattleAxe, GiHearts} from 'react-icons/gi'
import {useSelector} from 'react-redux'
import { createUseStyles } from '../../../../lib/jss';
import {selectPiecesHealth} from '../../../../reudx/selectors/selectPiecesHealth';

type Props = {
  piece: string;
};

export const PieceInfoOverlay: React.FC<Props> = (props) => {
  const cls = useStyles();
  const damage = 0;
  const health = 0;
  return (
    <div className={cls.container}>
        <div className={cls.infoContainer}>
          <GiBattleAxe color="#2f61bf" />
          <div className={cls.damageDisplay}>{damage}</div>
        </div>
        <div className={cls.infoContainer}>
          <GiHearts color="#cb4141" />
          {<div className={cls.healthDisplay}>{health}</div>}
        </div>
      </div>
  );
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    fontSize: '11px'
  },
  infoContainer:{
    display: 'flex'
  },
  damageDisplay:{},
  healthDisplay:{},
});