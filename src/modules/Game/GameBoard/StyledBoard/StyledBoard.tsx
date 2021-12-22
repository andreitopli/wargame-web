import React, {useEffect, useRef, useState} from 'react'
import 'react-chessground/dist/styles/chessground.css'
import Chessground, {ChessgroundApi, ChessgroundProps} from 'react-chessground'
import {ChessMove, MoveType, PiecesID, PiecesListOfIds} from 'src/modules/Game/types'
import {PieceInfoOverlay} from './components/PieceInfoOverlay/PieceInfoOverlay'
import {Color} from 'chessground/types'
import {Square} from 'chess.js'

export type StyledBoardProps = Omit<
  ChessgroundProps,
  'width' | 'height' | 'onMove' | 'orientation'
> & {
  className?: string
  size: number
  onMove: (m: ChessMove, type: MoveType) => void
  orientation?: Color
}

export const StyledBoard: React.FC<StyledBoardProps> = ({
  orientation = 'white',
  onMove,
  ...props
}) => {
  const chessgroundRef = useRef<ChessgroundApi>()
  const [overlays, setOverlays] = useState<React.ReactNode>(null)
  useEffect(() => {
    setOverlays(
      Object.keys(PiecesListOfIds).map((piece) => (
        <PieceInfoOverlay key={piece} piece={piece as PiecesID} />
      )),
    )
  }, [])

  return (
    <>
      <Chessground
        ref={(r) => {
          if (r) {
            chessgroundRef.current = (r as any).cg
          }
        }}
        turnColor={props.turnColor}
        fen={props.fen}
        draggable={{
          enabled: true,
          showGhost: true,
        }}
        {...(props.size && {
          width: props.size,
          height: props.size,
        })}
        onMove={(orig, dest,type) => {
          console.log('type of move :', type);
          onMove({to: dest as Square, from: orig as Square}, type)
        }}
        orientation={orientation}
        {...props}
      />
      {overlays}
    </>
  )
}
