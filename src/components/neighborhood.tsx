import React from "react";
import {ListGroup} from "react-bootstrap";
import '../assets/css/neighborhood.css';


interface INeighborhoodProps {

}

interface INeighborhoodState {

}


class Neighborhood extends React.Component<INeighborhoodProps,INeighborhoodState> {
    constructor(props: INeighborhoodProps){
        super(props);

    }


    public render(){

                return(
                        <div className="square">Flex item 3
                            <ListGroup className="" horizontal>
                                <ListGroup.Item  variant="secondary">

                                </ListGroup.Item>
                            </ListGroup>
                        </div>  
                );
               
    }
}

export default Neighborhood;