import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { MainGame } from './modules/Game/MainGame'
import { addMove, setupGame } from './reudx/actions/game';
import { selectGame } from './reudx/selectors/selectPiecesHealth'

function App() {

  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setupGame());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div className="App">
      <MainGame 
        game={game}
        boardOrientation='white'
        onAddMove={(move) => {
          dispatch(addMove(move))
        }}
      />
    </div>
  )
}

export default App
