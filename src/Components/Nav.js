import { useState } from "react"
import Firebase from "./Firebase"

export default function Nav({setGameState}) {

    const [signedIn, setSignedIn] = useState(Firebase.getCurrentUserId() !== null ? true : false);

    function signInPage() {
        console.log("sign in btn...")
        setGameState('Login')
    }

    function homePage() {
        setGameState('Login')
    }

    function gamePage() {
        setGameState('Game')
    }

    function leaderboardPage() {
        setGameState('Leaderboard')
    }

    return (
        <nav className="col col-12 d-flex justify-content-between p-2 align-items-center">
            <div >
                <a href="https://www.theodinproject.com/dashboard" target="_blank" rel="noreferrer noopener">
                    <img src="https://www.theodinproject.com/mstile-310x310.png" alt="TOP logo" style={{height: "5rem"}}/>    
                </a> 
            </div>
            <h1>Where's Waldo Clone</h1>
            <div className="d-flex">
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Menu</button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li className="dropdown-item" onClick={homePage}>home</li>
                        <li className="dropdown-item" onClick={gamePage}>game</li>
                        <li className="dropdown-item" onClick={leaderboardPage}>leader board</li>
                    </ul>
                </div>
                {signedIn && 
                    <button className="btn btn-sm btn-dark" onClick={Firebase.signUserOut()}>Log out</button>
                }
                {
                    !signedIn &&
                    <button className="btn btn-sm btn-dark " onClick={signInPage}>Log in</button>
                }
            </div>
        </nav>
    )
}