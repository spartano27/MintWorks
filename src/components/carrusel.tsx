import React from 'react';
import {Carousel} from 'react-bootstrap';

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
            <Carousel.Item>
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