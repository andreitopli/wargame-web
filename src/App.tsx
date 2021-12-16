import {useEffect} from 'react'
import './App.css'
import {MainGame} from './modules/Game/MainGame'

function App() {
  // const {game} = useSelector(selectGame)
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setupGame());
  }, [])

  return (
    <div className="App">
      <MainGame boardOrientation="white" />
    </div>
  )
}

export default App
