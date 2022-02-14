import {
  WarGameHistory,
  WarGameHistoryMove,
  WarGameMove,
  WarGameRecord,
  WarGameStatePending,
  WarGameStateStarted,
} from 'dstnd-io'
import {otherChessColor} from 'dstnd-io/dist/chessGame/util/util'
import {ISODateTime, toISODateTime} from 'io-ts-isodatetime'
import React, {createContext, useState} from 'react'
import {PiecesPositions, RooksMoved, WarGameEngine} from 'wargame-engine'
import {createNewGame} from '../../utils'

export type GameContextType = {
  game: WarGameRecord
  moveAction: (move: WarGameMove) => void
}

export const GameContext = createContext<GameContextType>({
  game: createNewGame(),
  moveAction: () => {},
})

function extractRooksMovesFromHistory(history: WarGameHistory): RooksMoved {
  return history.length > 0
    ? history[history.length - 1].rooksMoved
    : {
        wR0: false,
        wR1: false,
        bR0: false,
        bR1: false,
      }
}

export const GameProvider: React.FC = (props) => {
  const [game, setGame] = useState<WarGameRecord>(createNewGame())

  const moveAction = (move: WarGameMove) => {
    console.log('move : ', move)
    const now = toISODateTime(new Date());
    const nextGameState = getNewGameState(game as WarGameStatePending | WarGameStateStarted, {move, moveAt: now})
    setGame(nextGameState as WarGameRecord)
  }

  const getNewGameState = (
    prev: WarGameStatePending | WarGameStateStarted,
    {
      move,
      moveAt,
    }: {
      move: WarGameMove
      moveAt: ISODateTime
    },
  ) => {

    const {lastMoveBy: prevTurn = 'black'} = prev
    const turn = otherChessColor(prevTurn)

    const movedAtAsDate = new Date(moveAt)

    const lastMoveAt =
      prev.state === 'pending' ? movedAtAsDate : new Date(prev.lastMoveAt)
    const elapsed = movedAtAsDate.getTime() - lastMoveAt.getTime()
    const nextTimeLeft = prev.timeLeft[turn] - elapsed

    // Finish The Game if the time has passed
    if (
      prev.timeLimit !== 'untimed' &&
      prev.state !== 'pending' &&
      nextTimeLeft < 0
    ) {
      return {
        ...prev,
        state: 'finished',
        timeLeft: {
          ...prev.timeLeft,
          // If the time is 0 we know the game ended b/c of clock running out!
          [turn]: 0,
        },
        winner: prevTurn,

        // Last activity is the state change!
        lastActivityAt: moveAt,
      }
    }
    const instance =
      prev.state === 'pending'
        ? new WarGameEngine()
        : new WarGameEngine(
            prev.pieces.healths,
            prev.pieces.positions as PiecesPositions,
            prev.fen,
            extractRooksMovesFromHistory(prev.history),
          )

    const {move: warGameMove, type: moveType} = move

    const validMove = instance.move(warGameMove, moveType)

    if (typeof validMove === 'undefined') {
      return prev
    }

    const nextMove: WarGameHistoryMove = {
      ...move,
      rooksMoved: validMove.rooksMoved,
      clock: nextTimeLeft,
      color: turn,
    }

    const nextHistory = [...(prev.history || []), nextMove]

    const nextStartedGameProps = {
      state: 'started',
      fen: instance.fen(),
      history: nextHistory,
      lastMoveAt: moveAt,
      lastMoveBy: turn,
      timeLeft: {
        ...prev.timeLeft,
        [turn]: nextTimeLeft,
      },
      pieces: {
        positions: validMove.positions,
        healths: validMove.health,
      },
      winner: undefined,
      lastActivityAt: moveAt,
    } as const

    if (prev.state === 'pending') {
      return {
        ...prev,
        ...nextStartedGameProps,
        startedAt: moveAt,
      }
    }

    //TODO - add game over!

    return {
      ...prev,
      ...nextStartedGameProps,
    }
  }

  return (
    <GameContext.Provider
      value={{
        game,
        moveAction,
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}
