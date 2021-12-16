import React from 'react'
import {GiBattleAxe, GiHearts} from 'react-icons/gi'
import {useSelector} from 'react-redux'
import {pieceInitialHealthAndDamage} from 'src/config'
import { PieceInitial, PieceName, PiecesID} from 'src/modules/Game/types'
import { pieceTypeToPieceName } from 'src/modules/Game/utils'
import {createUseStyles} from '../../../../../../lib/jss'
import {selectPiecesHealth} from '../../../../../../reudx/selectors/selectPiecesHealth'
import {PieceInfoOverlayDOM} from './PieceInfoOverlayDOM'

type Props = {
  piece: PiecesID
}

export const PieceInfoOverlay: React.FC<Props> = ({piece}) => {
  const cls = useStyles()
  const piecesHealth = useSelector(selectPiecesHealth)

  function getPieceDamage(piece: PiecesID): number {
    return pieceInitialHealthAndDamage[
      pieceTypeToPieceName[
        piece.toString()[1].toLowerCase() as PieceInitial
      ] as PieceName
    ].damage
  }
  return (
    <PieceInfoOverlayDOM piece={piece}>
      <div className={cls.container}>
        <div className={cls.infoContainer}>
          <GiBattleAxe color="#2f61bf" />
          <div className={cls.damageDisplay}>{getPieceDamage(piece)}</div>
        </div>
        <div className={cls.infoContainer}>
          <GiHearts color="#cb4141" />
          {<div className={cls.healthDisplay}>{piecesHealth[piece]}</div>}
        </div>
      </div>
    </PieceInfoOverlayDOM>
  )
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    fontSize: '11px',
  },
  infoContainer: {
    display: 'flex',
  },
  damageDisplay: {},
  healthDisplay: {},
})
