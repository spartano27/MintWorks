import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import TermsOfService from '../pages/TemsOfService';
test('render content',()=>{
    
   const enviroment =
   <TermsOfService/>
 
       
    const terms = render(enviroment);
    terms.getByText("Terms of Sevice");
})