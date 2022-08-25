import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Sonic from '../components/ia/sonic';
test('render content',()=>{
  
   const enviroment =
   <Sonic/>
 
       
    const sonic = render(enviroment);
    expect(sonic.getByAltText("sonic")).toHaveStyle("width:125px");
})