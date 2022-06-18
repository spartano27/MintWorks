import React from 'react';
import { Row, Container} from 'react-bootstrap';
import Builder from './board_components/builder';
import Leader from './board_components/leader';
import Lotto from './board_components/lotto';
import Producer from './board_components/producer';
import Supplier from './board_components/supplier';
import Wholesaler from './board_components/wholesaler';
import '../assets/css/cards.css';



interface IBoardProps {
players: number;
}

interface IBoardState {

}

class Board extends React.Component<IBoardProps,IBoardState> {
    constructor(props: IBoardProps){
        super(props);

    }
  
    public render() {

        return (
            
            <Container >
                
            <Row className='justify-content-start'>
                    <Leader/>
                    <Producer players={this.props.players}/>               
                
            </Row>
            <Row className='justify-content-start'>
                <Builder players={this.props.players}/>
                <Supplier players={this.props.players}/>
            
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