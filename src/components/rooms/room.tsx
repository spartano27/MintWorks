import React from "react";
import { Card } from "react-bootstrap";

interface IRoomProps {
    name: string;
    author: string;
}

class Room extends React.Component<IRoomProps> {
    constructor(props: IRoomProps){
        super(props);
    }

    public render(){
        return(
            <Card> 
                <Card.Body>
                    {this.props.name} created by: {this.props.author}
                </Card.Body>
            </Card>
        );
    }
}

export default Room;