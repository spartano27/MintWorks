import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeP from "./pages/Home";
import Lobby from "./pages/Lobby";
import GamePage from "./pages/Game";
import Buscar from "./pages/Buscar";
import Crear from "./pages/Crear";
import { JoinRoom } from "./components/rooms/joinRoom";
import Room from "./components/rooms/room";



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
        <Route path="Game" element={<GamePage />}/>
        <Route path="Buscar" element={<Buscar />}/>
        <Route path="Crear" element={<Crear />}/>
        <Route path="Room/:name" element={<Room /> }/>
      </Routes>
      
      </BrowserRouter>
  );
}