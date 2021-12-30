/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {GiBattleAxe, GiHearts} from 'react-icons/gi'
import {pieceInitialHealthAndDamage} from 'src/config'
import {PieceInitial, PieceName, PiecesID} from 'src/modules/Game/types'
import {pieceTypeToPieceName} from 'src/modules/Game/utils'
import {createUseStyles} from '../../../../../../lib/jss'
import {PieceInfoOverlayDOM} from './PieceInfoOverlayDOM'
import cx from 'classnames'
import { useSelector } from 'react-redux'
import { selectPiecesHealth } from 'src/reudx/selectors/selectPiecesHealth'

type Props = {
  piece: PiecesID
}

export const PieceInfoOverlay: React.FC<Props> = ({piece}) => {
  const cls = useStyles()
  const piecesHealth = useSelector(selectPiecesHealth)
  // const engine = useEngineProvider()
  const [prevHealth, setPrevHealth] = useState(piecesHealth[piece])
  const [damage, setDamage] = useState(0)
  const [fadeClass, setFadeClass] = useState<'fadeIn' | 'fadeOut'>('fadeOut')

  // useEffect(() => {
  //   if (engine) {
  //     engine.onUpdate(({health: updatedHealth}) => {
  //       setHealth(updatedHealth)
  //       if (health && updatedHealth && health[piece] !== updatedHealth[piece]) {
  //         setDamage(health[piece] - updatedHealth[piece])
  //       }
  //     })
  //   }
  // }, [engine])

  useEffect(() => {
    if (piecesHealth && piecesHealth[piece] !== prevHealth) {
      setDamage(prevHealth - piecesHealth[piece]);
      setPrevHealth(piecesHealth[piece])
    }
  },[piecesHealth])

  useEffect(() => {
    if (damage > 0) {
      setFadeClass('fadeIn')
      const timeout = setTimeout(() => {
        setFadeClass('fadeOut')
      }, 700)
      return () => clearTimeout(timeout)
    }
  }, [damage])

  useEffect(() => {
    if (fadeClass === 'fadeOut' && damage > 0) {
      const timeout = setTimeout(() => {
        setDamage(0)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [fadeClass])

  function getPieceDamage(piece: PiecesID): number {
    return pieceInitialHealthAndDamage[
      pieceTypeToPieceName[
        piece.toString()[1].toLowerCase() as PieceInitial
      ] as PieceName
    ].damage
  }
  return (
    <PieceInfoOverlayDOM piece={piece}>
      {damage > 0 && (
        <div className={cls.damageContainer}>
          <div
            className={cx(cls.text, {
              [cls.fadeIn]: fadeClass === 'fadeIn',
              [cls.fadeOut]: fadeClass === 'fadeOut',
            })}
          >
            -{damage}
          </div>
        </div>
      )}
      <div className={cls.container}>
        <div className={cls.infoContainer}>
          <GiBattleAxe color="#2f61bf" />
          <div className={cls.damageDisplay}>{getPieceDamage(piece)}</div>
        </div>
        <div className={cls.infoContainer}>
          <GiHearts color="#cb4141" />
          {
            <div className={cls.healthDisplay}>
              {piecesHealth[piece]}
            </div>
          }
        </div>
      </div>
    </PieceInfoOverlayDOM>
  )
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    fontSize: '11px',
    justifyContent: 'space-between',
  },
  infoContainer: {
    display: 'flex',
  },
  damageDisplay: {},
  healthDisplay: {},
  damageContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    position: 'absolute',
  },
  fadeIn: {
    opacity: 1,
    transform: 'scale(140%)',
  },
  fadeOut: {
    opacity: 0,
    transform: 'scale(100%)',
  },
  text: {
    textShadow:
      '-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5), 1px 1px 11px rgba(0,0,0,0.33)',
    color: 'red',
    transition: 'all 1s ease',
  },
})
