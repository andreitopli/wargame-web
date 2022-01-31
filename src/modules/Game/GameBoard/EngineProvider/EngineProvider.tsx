import {Move, ShortMove} from 'chess.js'
import {Color, MoveType} from 'chessground/types'
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import {getNewChessGame} from 'src/lib/chess/chess'
import { Pubsy } from 'src/lib/Pubsy'
import { updateHealth } from 'src/reudx/actions/pieces'
import {Game, MovableDests, PiecesHealth, PiecesPositions} from '../../types'
import {otherChessColor, toChessColor} from '../StyledBoard/utils'
import {WarChessEngine} from '../WarGameChessEngine'

export type EngineContextProps =
  | {
      onMove: (move: ShortMove, type: MoveType) => void
      getPositions: () => PiecesPositions
      getHealth: () => PiecesHealth
      getFen: () => string
      getTurn: () => Color
      getHistory :() => Move[]
      getEngine: () => WarChessEngine
      onUpdate: (fn : (data: {health: PiecesHealth}) => void) => void;
      getDests: () => MovableDests
    }
  | undefined

export const EngineContext = React.createContext<EngineContextProps>(undefined)

export function createNewGame(): Game {
  const chess = getNewChessGame()
  return {
    pgn: chess.pgn(),
    id: new Date().getTime().toString(),
    state: 'pending',
    players: [
      {
        player1: 'black',
      },
      {player2: 'white'},
    ],
    homeColor: 'white',
    lastMoveBy: undefined,
    turn: 'white',
  }
}

type SubscriptionEvents = {
  updateOverlays: {health: PiecesHealth};
}

const pubsy = new Pubsy<SubscriptionEvents>();

type Props = {
  render: (game: Game) => React.ReactNode
}

export const EngineProvider: React.FC<Props> = (props) => {
  const [contextValue, setContextValue] = useState<EngineContextProps>()
  const [game, setGame] = useState<Game>(createNewGame())
  const dispatch = useDispatch()

  useEffect(() => {
    setContextValue(() => {
      const engine = new WarChessEngine(getNewChessGame())
      engine.onHealthUpdate(() => {
        dispatch(updateHealth({health: engine.getHealth()}))
      })
      return {
        onMove: (move: ShortMove, type: MoveType) => {
          engine.move(move, type)
          setGame((prev) => ({
            ...prev,
            pgn: engine.pgn(),
            state: 'started',
            lastMoveBy: otherChessColor(toChessColor(engine.turn())),
            turn: toChessColor(engine.turn()),
          }))
        },
        getEngine: () => {
          return engine
        },
        getFen: () => {
          return engine.fen()
        },
        getTurn: () => {
          return toChessColor(engine.turn())
        },
        getHistory :() => {
          return engine.history()
        },
        getPositions: () => {
          return engine.getPosition()
        },
        getHealth: () => {
          return engine.getHealth()
        },
        getDests: () => {
          return engine.dests()
        },
        onUpdate: (fn : (data: {health: PiecesHealth}) => void) => {
          pubsy.subscribe('updateOverlays', fn)
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EngineContext.Provider value={contextValue}>
      {props.render(game)}
    </EngineContext.Provider>
  )
}
