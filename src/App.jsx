import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tablero from './Tablero'
import Docs from './Docs'
import Stats from './Stats'

const App = () => {

  const [player, setPlayer] = useState(null)
  const [view, setView] = useState('game')

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {view === 'game' &&
        <>
          {
            player === null ?
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Quién eres?</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <button onClick={() => setPlayer(0)}>X</button>
                  <button onClick={() => setPlayer(1)}>O</button>
                </div>
              </div> :
              <>
                <Tablero
                  player={player}
                  setPlayer={setPlayer}
                />
              </>
          }
        </>
      }
      {
        view === 'docs' &&
        <>
          <Docs />
        </>
      }
      {
        view === 'stats' &&
        <Stats />
      }

      {/* Docs Button 
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button onClick={() => setView(p => p === 'game' ? 'docs' : 'game' )}>
          {view ? "Documentación" : "Juego"}
        </button>
      </div>
      */}
      {/* stats Button */}
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <button onClick={() => setView(p => p === 'game' ? 'stats' : 'game')}>
          {view === 'stats' ? "Regresar" : "Estadísticas"}
        </button>
      </div>

    </div>
  )
}

export default App
