import React from 'react';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Carrusel from '../components/carrusel';
test('render content',()=>{

   const enviroment =
   
    <Carrusel />
       
    const carrusel = render(enviroment);
    expect(carrusel.getByAltText("Forth slide")).toContainHTML('0');
})