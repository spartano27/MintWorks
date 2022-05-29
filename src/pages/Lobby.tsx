import React from 'react';
import GButton from '../components/gButton';
class Lobby extends React.Component{

public render(){
    return(
        <body>
            
            <img className="d-block mx-auto w-50" src={require("../images/mint1.jpg")}></img>
        
            <div className='container'>
                <GButton title='Juego Individual' link='/IndividualGame'/> 
                <GButton title='Buscar partida' link='/Buscar'/> 
                <GButton title='Crear partida' link='/Crear'/> 
            </div>
        </body>
        

    );
}

}

export default Lobby;