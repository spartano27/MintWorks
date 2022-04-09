import React from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import '../assets/css/neighborhood.css';
import Board from "./board";
import Shop from "./shop";

interface INeighborhoodProps {
    players: number;

}

interface INeighborhoodState {

}


class Neighborhood extends React.Component<INeighborhoodProps,INeighborhoodState> {
    constructor(props: INeighborhoodProps){
        super(props);

    }


    public render(){
        switch(this.props.players) {
            case 1:
                return(
                <div className='bg-gradient-primary'>
                    <div className="d-flex justify-content-between">                      
                        <Shop/>
                    </div>
                    <div className="d-flex align-items-end">
                        <div className="square">Flex item 3</div>
                        <Board/>  
                    </div>   
                </div>
                );
                break;               
            case 2:
                return(
                    <div className='bg-gradient-primary'>
                        <div className="d-flex justify-content-between">
                            <div className="square">Flex item 3</div>
                            <Shop/>
                        </div>
                        <div className="d-flex align-items-end">
                            <div className="square">Flex item 3</div>
                            <Board/>
                        </div>               
                    </div>
                );
                break;    
            case 3:
                return(
                    <div className='bg-gradient-primary'>
                        <div className="d-flex justify-content-between">
                            <div className="square">Flex item 3</div>
                            <Shop/>
                            <div className="square">Flex item 3</div>                            
                        </div>
                        <div className="d-flex align-items-end">
                            <div className="square">Flex item 3</div>
                            <Board/> 
                        </div>                
                    </div>
                );
                break;   
            case 4:
                return(
                <div className='bg-gradient-primary'>
                    <div className="d-flex justify-content-between">
                        <div className="square">Flex item 1</div>
                        <Shop/>
                        <div className="square">Flex item 2</div>                        
                    </div>
                    <div className="d-flex align-items-end">
                        <div className="square">Flex item 3</div>
                        <Board/>
                        <div className="square">Flex item 4</div>                        
                    </div>                   
                </div>
                );
                break;    
            default:
                return(
                <div className='bg-gradient-primary'>
                    <div className="d-flex justify-content-between">                        
                        <Shop/>              
                    </div>
                    <div className="d-flex align-items-end">
                        <div className="square">Flex item 3</div>
                        <Board/>                                                
                    </div>                    
                </div>
                );    
       }
    }    
}

export default Neighborhood;