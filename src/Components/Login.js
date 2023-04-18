import { useState } from "react";
import Firebase from "./Firebase"

const Login = ({ setGameState }) => {

    const [signedIn, setSignedIn] = useState(false); 

    function startGame () {
        setGameState("Game"); 
        Firebase.startLevel();
    }

    async function signIn() {
        setSignedIn(true); 
        await Firebase.googleSignIn(); 
        startGame();
    }
     
    return (
        <div className="row justify-content-center mt-5">
            
            { !signedIn &&
                <div className="col col-3 text-center">
                <h3>Would you like to sign in or continue as a guest?</h3> 
                <p className="fst-italic">Signing in will save your data to the leaderboard!</p>

                    <div className="mt-3">
                        <button onClick={startGame} className="btn btn-sm btn-outline-primary me-2">Continue as guest</button>
                        <button onClick={signIn} className="btn btn-sm btn-primary">Sign in</button>
                    </div>
                </div>
            }

            {
                signedIn &&
                <div>

                </div>
            }
        </div>
    )
}

export default Login;