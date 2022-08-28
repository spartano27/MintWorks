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
        srcValue: "EXPLICACIÓNCARTAS1.png",
        altValue: "First slide"
      },{
        srcValue: "EXPLICACIÓNCARTAS2.png",
        altValue: "Second slide"
      },{
        srcValue: "EXPLICACIÓNCARTAS3.png",
        altValue: "Third slide"
      },{
        srcValue: "EXPLICACIÓNCARTAS4.png",
        altValue: "Forth slide"
      },{
        srcValue: "EXPLICACIÓNCARTAS4.png",
        altValue: "Fifth slide"
      }];

    for (const value of lista) {

        carruselItem.push(
            <Carousel.Item key={value.altValue}>
                <img
                className="d-block mx-auto"
                src={require(`../images/${value.srcValue}`)}
                alt={value.altValue}
                style={{width:'300px'}}/>
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