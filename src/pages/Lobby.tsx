import React from 'react';
import GButton from '../components/gButton';

/**
 * It returns a div that contains an image and a div that contains three buttons.
 * @returns A div with an image and a container with three buttons.
 */

function Lobby(){

    return(

        <div>
            <img alt='LogoLobby' className="d-block mx-auto w-50" src={require("../images/mint1.jpg")}></img>
            <div className='container'>
                <GButton title='Juego Individual' link='/IndividualGame'/> 
                <GButton title='Buscar partida' link='/Buscar'/> 
                <GButton title='Crear partida' link='/Crear'/> 
            </div>
        </div>
    );
}

export default Lobby;