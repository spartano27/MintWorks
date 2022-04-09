import React from 'react';
import { Row,Col, Container, Card } from 'react-bootstrap';
import Builder from './builder';
import Leader from './leader';
import Lotto from './lotto';
import Producer from './producer';
import Supplier from './supplier';
import Wholesaler from './wholesaler';
import '../assets/css/cards.css';
interface IBoardProps {

}
interface IBoardState {

}

class Board extends React.Component<IBoardProps,IBoardState> {
    constructor(props: IBoardProps){
        super(props);

    }
    public coreLocations = () => {

    }
    public render() {




        return (
            <Container className='p-0' style={{width:'500px'}} >
            <Row className='justify-content-center'>
                <Leader players={4}/>
                <Producer players={4}/>
            </Row>

            <Row className='justify-content-center'>
                <Builder players={4}/>
                <Supplier players={4}/>
            
            </Row>

            <Row className='justify-content-center'>
                <Wholesaler />
                <Lotto />
            
            </Row>


            </Container>
            
            
            
            
        );
    }
}

export default Board;