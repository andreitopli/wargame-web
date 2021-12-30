import {useEffect} from 'react'
import {createGenerateId, JssProvider} from 'react-jss'
import './App.css'
import {MainGame} from './modules/Game/MainGame'

function App() {
  // const {game} = useSelector(selectGame)
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setupGame());
  }, [])

  const generateId = createGenerateId();

  return (
    <div className="App">
      <JssProvider 
          generateId={generateId}
          id={{ minify: true }}>
        <MainGame boardOrientation="white" />
      </JssProvider>
    </div>
  )
}

export default App
