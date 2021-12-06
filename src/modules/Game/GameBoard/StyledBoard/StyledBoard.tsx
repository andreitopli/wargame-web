import React, {useEffect, useRef, useState} from 'react'
import 'react-chessground/dist/styles/chessground.css';
import Chessground, { ChessgroundApi, ChessgroundProps } from 'react-chessground'
import { ChessMove, PiecesID, PiecesListOfIds } from 'src/types'
import { PieceInfoOverlay } from './components/PieceInfoOverlay/PieceInfoOverlay'
import { Color } from 'chessground/types'
import { Square } from 'chess.js'

export type StyledBoardProps =  Omit<
ChessgroundProps,
'width' | 'height' | 'onMove' | 'orientation'
> & {
  className?: string;
  size: number;
  onMove: (m: ChessMove) => void;
  orientation?: Color;
};

export const StyledBoard: React.FC<StyledBoardProps> = ({
    orientation = 'white',
    onMove,
    lastMove = [], 
    ...props
}) => {
  const chessgroundRef = useRef<ChessgroundApi>();
  const [overlays, setOverlays] = useState<React.ReactNode>(null);
  
  useEffect(() => {
    setOverlays(Object.keys(PiecesListOfIds).map(piece => (
      <PieceInfoOverlay piece={piece as PiecesID}/>
    )))
  },[])
  
  // const onPieceDrop = (
  //   sourceSquare: string,
  //   targetSquare: string,
  //   piece: Pieces,
  // ) => {
  //   let validMove = null
  //   const pieceOnTargetSquare =
  //     document.getElementById(targetSquare)?.firstElementChild?.id
  //   if (pieceOnTargetSquare) {
  //     const currentTargetPieceHealth =
  //       piecesHealth[pieceOnTargetSquare as ExtendedPieces]
  //     const damageToDeal =
  //       pieceInitialHealthAndDamage[piecesToStringName(piece)].damage
  //     const healthLeft = currentTargetPieceHealth - damageToDeal
  //     if (healthLeft > 0) {
  //       console.log('yes update health')
  //       dispatch(
  //         updateHealth({
  //           health: healthLeft,
  //           piece: pieceOnTargetSquare as ExtendedPieces,
  //         }),
  //       )
  //       swapTurn()
  //       return false
  //     }
  //   }
  //   const move: ShortMove = {
  //     to: targetSquare as Square,
  //     from: sourceSquare as Square,
  //     promotion: 'q',
  //   }
  //   setGame((prev) => {
  //     const updatedGame = {...prev}
  //     validMove = updatedGame.move(move)
  //     return updatedGame
  //   })

  //   if (validMove === null) {
  //     return false
  //   }
  //   return true
  // }

  return (
    <>
    <Chessground
          ref={(r) => {
            if (r) {
              chessgroundRef.current = (r as any).cg;
            }
          }}
          fen={props.fen}
          draggable={{
            enabled: true,
          }}
          {...(props.size && {
            width: props.size,
            height: props.size,
          })}
          onMove={(orig, dest) => onMove({ to: dest as Square, from: orig as Square })}
          orientation={orientation}
          lastMove={lastMove}
          {...props}
        />
      {overlays}
    </>
  )
}
