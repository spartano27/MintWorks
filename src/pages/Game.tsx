import React from 'react';  
import { Provider } from 'react-redux';
import { Action, createStore } from 'redux';
import Game from '../containers/game';  
import IGlobalState, { initialState } from '../state/globalState';

class GamePage extends React.Component {

    public render() {
        return (
           
            <body className='bg-gradient-primary'>
                          
                            <Game/>

            </body>
           
        );
    }
}

export default GamePage;