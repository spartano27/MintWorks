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
import { useList } from '@liveblocks/react';
import { ids } from 'webpack';

/**
 * The Board function returns a Container component that contains three rows, each of which contains
 * two components.
 * @returns A React component.
 */
 
function Board(valor:{diff:boolean}){
    const listaSortDifficult = useList("advancedCards");
    let firstAdvanced;
    let SecondAdvanced;
    if(listaSortDifficult == null){
        return null;
    }
   

    if(listaSortDifficult.get(0) == "crow"){
        firstAdvanced = <Crow />
    }
    if(listaSortDifficult.get(0) == "swap"){
        firstAdvanced = <Swap />
    }
    if(listaSortDifficult.get(0) == "temp"){
        firstAdvanced = <Temp />
    }
    if(listaSortDifficult.get(0) == "recycler"){
        firstAdvanced = <Recycler />
    }
    
    if(listaSortDifficult.get(1) == "crow"){
        SecondAdvanced = <Crow />
    }
    if(listaSortDifficult.get(1) == "swap"){
        SecondAdvanced = <Swap />
    }
    if(listaSortDifficult.get(1) == "temp"){
        SecondAdvanced = <Temp />
    }
    if(listaSortDifficult.get(1) == "recycler"){
        SecondAdvanced = <Recycler />
    }




    if(valor.diff){
        
        return (
        
            <Container style={{marginTop:'50px',marginLeft:'50px'}}>
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
                    {firstAdvanced}
                    {SecondAdvanced}
                </Row>
            </Container>       
        );
    }else{
        
        return (
        
            <Container style={{marginTop:'50px',marginLeft:'50px'}}>
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
                
            </Container>
                    
        );
    }
    
}

export default Board;