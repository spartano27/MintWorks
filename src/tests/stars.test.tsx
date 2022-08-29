import React from 'react';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Stars from '../components/stars';
test('render content',()=>{

   const enviroment =
   <Stars stars={0}/>
 
       
    const stars = render(enviroment);
    expect(stars.getByAltText("Stars")).toHaveStyle("width:40px");
    expect(stars.getByAltText("Stars")).toContainHTML("0");
})