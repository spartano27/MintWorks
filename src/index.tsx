import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/home.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomeP from './pages/Home';
import Lobby from './pages/Lobby';
import GamePage from './pages/Game';
import Buscar from './pages/Buscar';
import Crear from './pages/Crear';
import { Provider } from 'react-redux';
import IGlobalState, { initialState } from './state/globalState';
import { Action, createStore } from 'redux';
import { IChangeUsername, PlayButtonActions } from './actions/PlayButtonActions';
import { ClockActions, IChangePlayer } from './actions/ClockActions';
import { GameActions, IFirstPlayer } from './actions/GameActions';

const reducer = (state: IGlobalState = initialState, action: Action) => {
  switch(action.type){
    case PlayButtonActions.Change_Username:
      const usernameAction = action as IChangeUsername;
      return {...state, username: usernameAction.payload}
    case ClockActions.Change_Player:
      const clockAction = action as IChangePlayer;
      return {...state, currentPlayer: clockAction.payload}
    case GameActions.FirstPlayer:
      const gameAction = action as IFirstPlayer;
      return {...state, currentPlayer: gameAction.payload}
  }
  
  return state;
}

const store = createStore(reducer,initialState);


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeP />} /> 
      <Route path="Lobby" element={<Lobby />} /> 
      <Route path="Game" element={<GamePage />}/>
      <Route path="Buscar" element={<Buscar />}/>
      <Route path="Crear" element={<Crear />}/>
    </Routes>
     
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

reportWebVitals();
