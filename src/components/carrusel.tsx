import React from 'react';
import {Carousel} from 'react-bootstrap';

interface iCarruselProps {
    jsonValues: {srcValue:any,altValue:any}[]
}

class Carrusel extends React.Component<iCarruselProps> {
    public render() {
        const carruselItem = [];
        
        console.log(this.props.jsonValues);
        
        for (const value of this.props.jsonValues) {
            console.log(value.srcValue);
            carruselItem.push(
            <Carousel.Item>
                <img
                className="d-block mx-auto"
                src={require(`../images/${value.srcValue}`)}
                alt={value.altValue}
                />
            </Carousel.Item>);

        }
        return(
            
            <Carousel className="center-block">
                {carruselItem}
            </Carousel>


        );

    }
}

export default Carrusel;