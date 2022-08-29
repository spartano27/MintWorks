import React from 'react';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Mint from '../components/mint';
test('render content',()=>{

   const enviroment =
   <Mint mints={0}/>
 
       
    const mint = render(enviroment);
    expect(mint.getByAltText("Mints")).toHaveStyle("width:50px");
    expect(mint.getByAltText("Mints")).toContainHTML("0");
})