import React from 'react';
import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Lobby from '../pages/Lobby';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nightmare from 'nightmare';
test('render content',()=>{
    
   const enviroment =
   <BrowserRouter>
        <Routes>
            <Route path='Lobby' element={<Lobby /> }/>
        </Routes>
   </BrowserRouter>
   
 
       
    const lobby = render(enviroment);

})


const nightmare = new Nightmare({ show: true })

test('navigate for lobby',()=>{
    
    let page = nightmare.goto("http://localhost:3000/Lobby").click("Search a Game").then(link => {
        expect(link).toEqual("http://localhost:3000/JoinRoom")
    });
    
  
        
    
     
 })