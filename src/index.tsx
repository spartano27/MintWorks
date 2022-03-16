import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/home.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomeP from './pages/Home';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Buscar from './pages/Buscar';
import Crear from './pages/Crear';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeP />} /> 
      <Route path="Lobby" element={<Lobby />} /> 
      <Route path="Game" element={<Game />}/>
      <Route path="Buscar" element={<Buscar />}/>
      <Route path="Crear" element={<Crear />}/>
    </Routes>
     
    </BrowserRouter>
  </React.StrictMode>,
  
  document.getElementById('root')
);

reportWebVitals();
