import React from 'react';
import GButton from '../components/gButton';
import Footer from '../footer';

/**
 * It returns a div that contains an image and a div that contains three buttons.
 * @returns A div with an image and a container with three buttons.
 */

function Lobby(){

    return(

        <div style={{overflow:'hidden'}}>
            <img alt='LogoLobby' className="d-block mx-auto w-50" src={require("../images/logoMint.png")}/>
            <div className='container'>
                <GButton title='Solo Game' link='/IndividualGame'/> 
                <GButton title='Search a Game' link='/Buscar'/> 
                <GButton title='Create a Game' link='/Crear'/> 
            </div>
            <Footer/>
        </div>
    );
}

export default Lobby;