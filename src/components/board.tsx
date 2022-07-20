import React from 'react';
import { Row, Container} from 'react-bootstrap';
import Builder from './board_components/builder';
import Leader from './board_components/leader';
import Lotto from './board_components/lotto';
import Producer from './board_components/producer';
import Supplier from './board_components/supplier';
import Wholesaler from './board_components/wholesaler';
import '../assets/css/cards.css';
import Crow from './board_components/crow';
import Temp from './board_components/temp';
import Recycler from './board_components/recycler';
import Swap from './board_components/swap';

/**
 * The Board function returns a Container component that contains three rows, each of which contains
 * two components.
 * @returns A React component.
 */

function Board(valor:{diff:boolean}){

    const Crow = () => {
        return (
            <Crow/>
        );
    } 

    if(valor.diff){
        
        return (
        
            <Container >
                <Row className='justify-content-start'>
                    <Leader/>
                    <Producer/>                
                </Row>
    
                <Row className='justify-content-start'>
                    <Builder />
                    <Supplier/>
                </Row>
    
                <Row className='justify-content-start'>
                    <Wholesaler />
                    <Lotto />
                </Row>
                <Row className='justify-content-start'>
                    <Crow />
                    <Temp />
                </Row>
            </Container>
                    
        );
    }else{
        
        return (
        
            <Container >
                <Row className='justify-content-start'>
                    <Leader/>
                    <Producer/>                
                </Row>
    
                <Row className='justify-content-start'>
                    <Builder />
                    <Supplier/>
                </Row>
    
                <Row className='justify-content-start'>
                    <Wholesaler />
                    <Lotto />
                </Row>

                <Row className='justify-content-start'>
                    <Crow />
                    <Recycler />
                </Row>
            </Container>
                    
        );
    }
    
}

export default Board;