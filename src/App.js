// import Home from "./Components/Home";
import Firebase from './Components/Firebase';
import Login from './Components/Login';
import Game from './Components/Game';
import Nav from './Components/Nav';
import Leaderboard from './Components/Leaderboard';
import { useState, useEffect } from 'react';


// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import './Styles/styles.css';

function App() {
  const [gameState, setGameState] = useState('Login'); 
  
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column bg-dark text-white">
      <Nav setGameState={setGameState}/>
      {gameState === 'Login' && 
        <Login  setGameState={setGameState}/>
      }
      {
        gameState === "Game" &&
        <Game  setGameState={setGameState}  image='/images/wheres-waldo.png' items={[{id:1, img: '/images/waldo.png', name: 'Waldo'},{id:2, img: '/images/odlaw.jpg', name: 'Odlaw'}, {id:3, img: '/images/Wizard.jpg', name: 'Wizard'}]} />
      }
      {
        gameState === "Leaderboard" &&
        <Leaderboard  setGameState={setGameState}/>
      }

    </div>
  );
}

export default App;
