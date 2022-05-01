import React from 'react';  
import Game from '../containers/game';  

class GamePage extends React.Component {

    public render() {
        return (
           
            <body style={{backgroundImage: 'url(' + require('../images/fondo1.png') + ')'}}>
                          
                            <Game/>

            </body>
           
        );
    }
}

export default GamePage;