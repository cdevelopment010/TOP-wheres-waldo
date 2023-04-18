import { useEffect,useState } from "react"
import Firebase from "./Firebase"

export default function Leaderboard() {

    const [leaderboardData, setLeaderboardData] = useState([]);
    useEffect(() => { 
        getData();
    }, [])

    async function getData() {
        setLeaderboardData(await Firebase.getLeaderboard()); 
        console.log("leaderboard", leaderboardData);
    }

    return (
        <div>
            <table className="table table-dark w-50 m-auto">
                <thead>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Time (s)</th>
                </thead>
                <tbody>
                        {
                        leaderboardData && leaderboardData.map((item, i) => {
                            console.log(item)
                            return (
                                <tr key={item.id}>
                                    <td >{i + 1}</td>
                                    <td >{item.displayName}</td>
                                    <td className="text-align-right">{item.timeTaken.toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>
            
        </div>
    )
}