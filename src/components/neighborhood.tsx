import React from "react";
import {ListGroup} from "react-bootstrap";
import '../assets/css/neighborhood.css';
import Clock from "./clock";


interface INeighborhoodProps {
username: string;
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
                            {this.props.username}
                            <Clock valorInicial={60}/>
                            <ListGroup className="" horizontal>
                                <ListGroup.Item  variant="secondary">

                                </ListGroup.Item>
                            </ListGroup>
                        </div>  
                );
               
    }
}

export default Neighborhood;