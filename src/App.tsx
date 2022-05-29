import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeP from "./pages/Home";
import Lobby from "./pages/Lobby";
import GamePage from "./pages/Game";
import Buscar from "./pages/Buscar";
import Crear from "./pages/Crear";
import RoomPage from "./pages/Room";
import IndividualGame from "./pages/IndividiualGame";



export default function App() {
  //const dispatch = useDispatch();
/*
  useEffect(() => {
    dispatch(
      actions.enterRoom("redux-demo-room", {
        todos: [],
      })
    );

    return () => {
      dispatch(actions.leaveRoom("redux-demo-room"));
    };
  }, [dispatch]);
*/

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeP />} /> 
        <Route path="Lobby" element={<Lobby />} /> 
        <Route path="Game/:name" element={<GamePage />}/>
        <Route path="IndividualGame" element={<IndividualGame />}/>
        <Route path="Buscar" element={<Buscar />}/>
        <Route path="Crear" element={<Crear />}/>
        <Route path="Room/:name" element={
       
            <RoomPage /> 
        
        }/>
      </Routes>
      
      </BrowserRouter>
  );
}