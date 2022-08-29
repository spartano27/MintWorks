import React from 'react';
import {render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nightmare from 'nightmare';
import HomeP from '../pages/Home';
test('render content',()=>{
    
   const enviroment =
   <BrowserRouter>
        <Routes>
            <Route path='Lobby' element={<HomeP /> }/>
        </Routes>
   </BrowserRouter>
   
 
       
    const lobby = render(enviroment);

})


const nightmare = new Nightmare({ show: true })

test('navigate for Home',()=>{
    
    let page = nightmare.goto("http://localhost:3000/Home").click("MintPLay").then(link => {
        expect(link).toEqual("http://localhost:3000/Lobby")
    });
    
  
        
    
     
 })