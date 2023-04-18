import { useEffect, useState } from "react"
import Firebase from "./Firebase";
import '../Styles/popup.css';  

const Game = ({  setGameState, image, items }) => {


    const [popup, setPopup] = useState(false); 
    const [position, setPosition] = useState({}); 
    const [itemsFound, setItemsFound] = useState([]); 
    const [game, setGame] = useState("playing");
    const [time, setTime] = useState(0);

    useEffect(() => {
        Firebase.getCurrentUserId(); 
    },[])

    useEffect(() => {

    }, [game])


    
    useEffect(() => {
        checkGameOver();
    }, [itemsFound])

    function showPopup(e) {
        let rect = e.target.getBoundingClientRect(); 
        let vLeft = e.clientX - rect.left; 
        let vTop = e.clientY - rect.top; 
        console.log(vLeft, vTop); 
        if (!popup) {
            setPopup(true);
        }
        let popupEl = document.getElementById('popup'); 
        popupEl.style.left = vLeft + 'px'; 
        popupEl.style.top = vTop + 'px'; 
        setPosition({x: vLeft, y: vTop}); 
    }

    function selectPosition(e) {
        setPopup(false);
        checkPosition(e.target.innerText, position)
    }


    async function checkPosition(img, position) {
        let vLeftMin = position.x - 15; 
        let vLeftMax = position.x + 15; 
        let vTopMin = position.y - 15; 
        let vTopMax = position.y + 15; 
        let pos = {vLeftMin, vLeftMax, vTopMin, vTopMax}
        let answer = await Firebase.getAnswer(img, pos); 

        if (answer) {
            let vItems = [...itemsFound];
            vItems.push(img);
            console.log(vItems);
            setItemsFound(vItems);
        }

        let box = document.createElement('div'); 
        box.classList.add("box");
        box.style.position = 'absolute'; 
        box.style.top = vTopMin + 'px';
        box.style.left = vLeftMin+10 + 'px'; 
        box.style.height = vTopMax - vTopMin + 'px';
        box.style.width = vLeftMax - vLeftMin + 'px';
        box.style.border = `3px solid ${answer ? 'green' : 'red'}`; 
        document.querySelector('.img-container').appendChild(box); 
    }

    async function checkGameOver() {
        console.log("items", items.length)
        if (itemsFound.length === items.length) {
            let time = await Firebase.endLevel(); 
            setTime(time);
            setGame("Game over")
        }
    }

    function closeModal() {
        setGame('close')
    }

    function goToLeaderboard() {
        setGameState("Leaderboard")
    }

    function retry() {
        setGameState("Game")
        setGame('playing'); 
        setItemsFound([]);
        Firebase.startLevel();
        document.querySelectorAll('.box').forEach(b => {
            b.remove(); 
        })
    }


    return (
        <div className="row flex-grow-1 align-items-center justify-content-center">
            {/* Game*/}
            {/* <span>{timer}</span>
            <Link to="/">Back</Link>  */}

            <div className="row align-items-center justify-content-center">
                <div className="items-container col col-6">
                    <ul className="list-unstyled list-group list-group-horizontal justify-content-center">
                        {items.map(i => {
                            return (
                            <li key={i.id} className={`me-2  ${itemsFound.indexOf(i.name) > -1 ? 'found-img' : '' }`}>
                                <img src={process.env.PUBLIC_URL + i.img} style={{height: "50px"}} />
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            
            <div className="img-container col-6">
                <img src={process.env.PUBLIC_URL + image} onClick={showPopup} className=""/>
                <div className={`popup ${popup ? '' : 'hidden'} text-dark`} id="popup">
                        <ul>
                            {/* <li onClick={checkPosition} className={``}>Waldo</li>
                            <hr></hr>
                            <li onClick={checkPosition}>Wizard</li>
                            <hr></hr>
                            <li onClick={checkPosition}>Odlaw</li> */}

                            {items.map((i, ind) => {
                                return (
                                    <div key={i.id}>
                                        <li onClick={selectPosition} className={`${itemsFound.indexOf(i.name) > -1 ? 'found' : '' }`} >{i.name}</li>
                                        {ind < items.length - 1 && <hr />}
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
            </div>

            <div className={`modal text-black ${ game === "Game over" ? 'd-block' : 'd-none'}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Game over</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    You completed the game in {time.toFixed(2)} seconds!
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={retry}>Retry</button>
                    <button type="button" className="btn btn-primary" onClick={goToLeaderboard}>Leaderboard</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Game;