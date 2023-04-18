import React from "react";


const Home = () => {

    return (
        <div>
            <h1>Home page...</h1>

            <div>
                Select which image to play
                <div>
                    {/* <img src={process.env.PUBLIC_URL + '/images/pokemon-wheres-waldo-1.jpg'} /> */}
                    <img src={process.env.PUBLIC_URL + '/images/pokemon-wheres-waldo-2.jpg'} />
                </div>
            </div>
        </div>
    )
}

export default Home;