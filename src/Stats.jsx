import { useEffect, useState } from "react"
import { getStats } from "./firebase"

const Stats = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                let response = await getStats()
                console.log(response)
                setData(response)

            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', width: '100%', height: '100vh', position: 'relative' }}>
            <div className="main-page" style={{ display: 'flex', width: '100%' }}>
                <div className="container" >
                    <div className="box">
                        <div className="card">
                            <h1>{data.matches}</h1>
                            <h2>Partidas Jugadas</h2>
                        </div>
                    </div>

                    <div className="box">
                        <div className="card">
                            <h1>{data.draws}</h1>
                            <h2>Empates</h2>
                        </div>
                    </div>

                    <div className="box">
                        <div className="card">
                            <h1>{data.wins}</h1>
                            <h2>Victorias</h2>
                        </div>
                    </div>

                    <div className="box">
                        <div className="card">
                            <h1>{data.loses}</h1>
                            <h2>Derrotas</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Stats