import {useEffect} from 'react'
import {createGenerateId, JssProvider} from 'react-jss'
import './App.css'
import {MainGame} from './modules/Game/MainGame'
import {GameProvider} from './modules/Game/Providers/GameProvider/GameProvider'

function App() {
  // const {game} = useSelector(selectGame)
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setupGame());
  }, [])

  const generateId = createGenerateId()

  return (
    <div className="App">
      <JssProvider generateId={generateId} id={{minify: true}}>
        <GameProvider>
          <MainGame boardOrientation="white" />
        </GameProvider>
      </JssProvider>
    </div>
  )
}

export default App
