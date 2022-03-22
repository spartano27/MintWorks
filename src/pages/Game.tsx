import React from 'react';  
import Board from '../components/board';
import Clock from '../components/clock';
import '../assets/css/home.css';
import Shop from '../components/shop';
class Game extends React.Component {

    public render() {
        return (
            <body className='bg-gradient-primary'>
            <Shop />
            <Clock valorInicial={60} /> 
            <Board />
            
            
            
            </body>
        );
    }
}

export default Game;