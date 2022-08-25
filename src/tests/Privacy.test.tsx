import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Privacy from '../pages/Privacy';

test('render content',()=>{

   const enviroment =
   <Privacy/>
 
       
    const privacy = render(enviroment);
    privacy.getByText("Privacy");
})