import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeP from "./pages/Home";
import Lobby from "./pages/Lobby";
import GamePage from "./pages/Game";
import Buscar from "./pages/Buscar";
import Crear from "./pages/Crear";
import RoomPage from "./pages/Room";
import IndividualGame from "./pages/IndividualGame";
import TermsOfService from "./pages/TemsOfService";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";

/**
 * It returns a BrowserRouter component that contains a Routes component that contains a Route
 * component that contains a HomeP component
 * @returns A BrowserRouter component that contains a Routes component that contains a Route component
 * that contains a HomeP component.
 */

export default function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeP />} /> 
        <Route path="Lobby" element={<Lobby />} /> 
        <Route path="Contact" element={<Contact />}/>
        <Route path="Privacy" element={<Privacy />}/>
        <Route path="Termsof" element={<TermsOfService />}/>
        <Route path="Game/:name" element={<GamePage />}/>
        <Route path="IndividualGame" element={<IndividualGame />}/>
        <Route path="Buscar" element={<Buscar />}/>
        <Route path="Crear" element={<Crear />}/>
        <Route path="Room/:name" element={<RoomPage />} />

      </Routes>
    </BrowserRouter>
    
  );  
}