import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, To } from 'react-router-dom';

/**
 * GButton is a function that takes an object with a link and a title and returns a div with a link and
 * a button with the title.
 * @param valor - {link: To; title: string}
 * @returns A function that returns a div with a link and a button.
 */

function GButton(valor: {link: To; title: string}){

    return(
        
        <div className='col-md-12 text-center p-2 '>
            <Link to={valor.link}>
                <Button className='btn btn-secondary h-25 w-25'> {valor.title}</Button>
            </Link>
        </div>
        
    );
}

export default GButton;