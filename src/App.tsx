import './App.css'
import {MainGame} from './modules/Game/MainGame'
import {GameProvider} from './modules/Game/Providers/GameProvider/GameProvider'

function App() {
  return (
    <div className="App">
        <GameProvider>
          <MainGame boardOrientation="white" />
        </GameProvider>
    </div>
  )
}

export default App
