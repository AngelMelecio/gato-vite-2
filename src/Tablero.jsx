import { useState, useEffect } from "react"
import { find_best_move, result } from "./Logic"
import { postResult } from "./firebase"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const Tablero = ({ player, setPlayer }) => {

  const [tab, setTab] = useState([[null, null, null], [null, null, null], [null, null, null]])
  const [waiting, setWaiting] = useState(false)
  const [turn, setTurn] = useState(0)
  const [end, setEnd] = useState(false)
  const [line, setLine] = useState(null)

  const handleEndGame = async (obj) => {
    await postResult({
      ...obj,
      player: player ? 'O' : 'X',
      date: new Date().toISOString()
    })
    setEnd(true)
    setLine(obj.line)
  }

  useEffect(() => {
    let currState = result(tab, player)
    console.log(currState)

    if (!currState.end) {
      if (player !== turn) {
        cpuMove()
      }
    } else {
      handleEndGame(currState)
    }

  }, [turn])

  async function cpuMove() {
    try {
      setWaiting(true)
      await sleep(1000)
      const aux = [...tab]
      const { i, j } = find_best_move(tab, turn)
      if (i !== -1 && j !== -1) {
        aux[i][j] = turn ? 'O' : 'X'
        setTab(aux)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setWaiting(false)
      setTurn(p => p ? 0 : 1)
    }
  }

  const handleMove = (i, j) => {
    if (waiting) return
    if (tab[i][j] !== null) return
    setTab(p => {
      const aux = [...p]
      aux[i][j] = player ? 'O' : 'X'
      return aux
    })
    setTurn(p => p ? 0 : 1)
  }

  return (
    <div style={{ position: 'relative' }}>
      <table>
        <tbody>
          {
            tab.map((fila, i) => {
              return (
                <tr key={i}>
                  {
                    fila.map((col, j) => {
                      return (
                        <td
                          onClick={() => !end && handleMove(i, j)}
                          className={(col === null && turn === player && !end ? 'hov' : '')
                            + (end && line && line.includes(i * 3 + j) ? ' win' : '')}
                          key={j}>{col}</td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div style={{ position: 'absolute', width: '100%' }}>
        {
          end ? <button onClick={() => setPlayer(null)}>Reiniciar</button> : null
        }
      </div>
    </div>
  )
}
export default Tablero