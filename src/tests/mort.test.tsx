import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Mort from '../components/ia/mort';
test('render content',()=>{
  
   const enviroment =
   <Mort/>
 
       
    const mort = render(enviroment);
    expect(mort.getByAltText("mort")).toHaveStyle("width:125px");
})