import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Rachael from '../components/ia/rachael';
test('render content',()=>{

   const enviroment =
   <Rachael/>
 
       
    const rachael = render(enviroment);
    expect(rachael.getByAltText("rachael")).toHaveStyle("width:125px");
})