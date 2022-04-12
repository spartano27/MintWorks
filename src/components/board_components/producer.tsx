import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface IProducerProps {
    players : number;
}
interface IProducerState {
    zoomed : boolean;

}


class Producer extends React.Component<IProducerProps,IProducerState> {
    constructor(props : IProducerProps){
        super(props);
        this.state = {zoomed : false};
    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    public render(){

        let whatProducer;
        if(this.props.players == 1 || this.props.players == 4){
            whatProducer = require("../../images/producer.png");
        }else {
            whatProducer = require("../../images/producer1.png");
        }

        return(
            <>
            <img style = {{width:210}} src = {whatProducer} onMouseEnter={(e) => this.setState({zoomed:true})} 
            onMouseLeave={(e) => this.setState({zoomed:false})} onDragStart={this.DragHandler}/>
           
            </>
            
        );
    }
}
export default Producer;