import React, { useEffect, useReducer, useRef} from 'react'
import {createUseStyles} from '../../../../lib/jss'
import {Pieces} from 'react-chessboard'
import {pieces} from './media/pieces'
// import {defaultPieces} from './media/pieces_svg';
import {GiBattleAxe, GiHearts} from 'react-icons/gi'
import {useSelector} from 'react-redux'
import {selectPiecesHealth} from '../../../../reudx/selectors/selectPiecesHealth'

type Props = {
  damage: number
  type: Pieces
  id:string;
}

const PIECES = [
  'wP-a',
  'wP-b',
  'wP-c',
  'wP-d',
  'wP-e',
  'wP-f',
  'wP-g',
  'wP-h',
  'wB-c',
  'wB-f',
  'wN-b',
  'wN-g',
  'wR-a',
  'wR-h',
  'wQ',
  'wK',
  'bP-a',
  'bP-b',
  'bP-c',
  'bP-d',
  'bP-e',
  'bP-f',
  'bP-g',
  'bP-h',
  'bB-c',
  'bB-f',
  'bN-b',
  'bN-g',
  'bR-a',
  'bR-h',
  'bQ',
  'bK',
]

export const Piece: React.FC<Props> = (props) => {
  const cls = useStyles()
  const {damage, type} = props
  const piecesHealth = useSelector(selectPiecesHealth)
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useRef<string | undefined>(undefined);
  const [_, rerender] = useReducer(s => s + 1, 0);
  const pieceKeyID = useRef<string | null>(null);

  useEffect(() => {
      id.current = containerRef.current?.parentElement?.className;
      rerender();
  },[piecesHealth])

  useEffect(() => {
    if (!pieceKeyID.current){
      pieceKeyID.current = containerRef.current?.parentElement?.className as string;
    }
    console.log('piece id ', props.id)
  },[])

  return (
    <div className={cls.container}>
      <img src={pieces[type]} width={45} height={45} alt={props.type} />
      <div className={cls.bottomPart}>
        <div className={cls.infoContainer}>
          <GiBattleAxe color="#2f61bf" />
          <div className={cls.damageDisplay}>{damage}</div>
        </div>
        <div className={cls.infoContainer}>
          <GiHearts color="#cb4141" />
          {<div className={cls.healthDisplay}>{piecesHealth[pieceKeyID.current as unknown as keyof typeof piecesHealth]}</div>}
        </div>
      </div>
      {/* {defaultPieces[type]} */}
    </div>
  )
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  damageDisplay: {
    fontSize: '11px',
  },
  healthDisplay: {
    fontSize: '11px',
  },
  bottomPart: {
    display: 'flex',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
})
