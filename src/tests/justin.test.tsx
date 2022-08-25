import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Justin from '../components/ia/justin';
test('render content',()=>{

   const enviroment =
   <Justin></Justin>
 
       
    const justin = render(enviroment);
    expect(justin.getByAltText("justin")).toHaveStyle("width:125px");
})