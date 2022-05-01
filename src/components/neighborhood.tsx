import React from "react";
import {ListGroup, Row} from "react-bootstrap";
import '../assets/css/neighborhood.css';
import Clock from "../containers/clock";


interface INeighborhoodProps {
username: string;
playerId: number;
}

interface INeighborhoodState {

}


class Neighborhood extends React.Component<INeighborhoodProps,INeighborhoodState> {
    constructor(props: INeighborhoodProps){
        super(props);

    }

    
    public render(){

                return(
                        <div className="square">
                            <Row className="p-2">
                                <div className="p-2">
                                    <Clock playerId={this.props.playerId}/>
                                       
                                </div>
                                <div className="p-2">
                                    {this.props.username}
                                </div>
                                
                            </Row>
                            
                            <ListGroup className="" horizontal>
                                <ListGroup.Item  variant="secondary">

                                </ListGroup.Item>
                            </ListGroup>
                        </div>  
                );
               
    }
}

export default Neighborhood;