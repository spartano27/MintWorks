import React from 'react';
import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Lobby from '../pages/Lobby';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


test('render content',()=>{
    
   const enviroment =
   <BrowserRouter>
        <Routes>
            <Route path='Lobby' element={<Lobby /> }/>
        </Routes>
   </BrowserRouter>
   
 
       
    const lobby = render(enviroment);
    
})