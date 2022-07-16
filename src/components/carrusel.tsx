import React from 'react';
import {Carousel} from 'react-bootstrap';

/**
 * It takes an array of objects, and for each object in the array, it creates a Carousel.Item component
 * with the object's srcValue and altValue as props.
 * @returns An array of Carousel.Item components.
 */

function Carrusel(){
    
    const carruselItem = [];
    const lista = [{
        srcValue: "mint1.jpg",
        altValue: "First slide"
      },{
        srcValue: "mint1.jpg",
        altValue: "Second slide"
      },{
        srcValue: "mint1.jpg",
        altValue: "Third slide"
      }];

    for (const value of lista) {

        carruselItem.push(
            <Carousel.Item key={value.altValue}>
                <img
                className="d-block mx-auto"
                src={require(`../images/${value.srcValue}`)}
                alt={value.altValue}/>
            </Carousel.Item>
        );
    }

    return(
        
        <Carousel className="center-block">
            {carruselItem}
        </Carousel>
    );   
}

export default Carrusel;