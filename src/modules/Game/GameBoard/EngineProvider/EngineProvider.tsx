import {ShortMove} from 'chess.js'
import {Color, MoveType} from 'chessground/types'
import React, {useEffect, useState} from 'react'
import {getNewChessGame} from 'src/lib/chess/chess'
import { Pubsy } from 'src/lib/Pubsy'
import {Game, PiecesHealth, PiecesPositions} from '../../types'
import {otherChessColor, toChessColor} from '../StyledBoard/utils'
import {WarChessEngine} from '../WarGameChessEngine'

export type EngineContextProps =
  | {
      onMove: (move: ShortMove, type: MoveType) => void
      getPositions: () => PiecesPositions
      getHealth: () => PiecesHealth
      getFen: () => string
      getTurn: () => Color
      getEngine: () => WarChessEngine
      onUpdate: (fn : (data: {health: PiecesHealth}) => void) => void;
    }
  | undefined

export const EngineContext = React.createContext<EngineContextProps>(undefined)

function createNewGame(): Game {
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

  useEffect(() => {
    setContextValue(() => {
      const engine = new WarChessEngine(getNewChessGame())
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
          pubsy.publish('updateOverlays', {health: engine.getHealth()})
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
        getPositions: () => {
          return engine.getPosition()
        },
        getHealth: () => {
          return engine.getHealth()
        },
        onUpdate: (fn : (data: {health: PiecesHealth}) => void) => {
          pubsy.subscribe('updateOverlays', fn)
        }
      }
    })
  }, [])

  return (
    <EngineContext.Provider value={contextValue}>
      {props.render(game)}
    </EngineContext.Provider>
  )
}
