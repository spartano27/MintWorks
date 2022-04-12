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
            
            <Container className='p-0' style={{width:'500px'}} >
                
            <Row className='justify-content-center'>
                    <Leader players={this.props.players}/>
                    <Producer players={this.props.players}/>               
                
            </Row>
            <Row className='justify-content-center'>
                <Builder players={this.props.players}/>
                <Supplier players={this.props.players}/>
            
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