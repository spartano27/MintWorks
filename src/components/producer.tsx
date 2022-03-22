import React from "react";

interface IProducerProps {
    players : number;
}
interface IProducerState {

}

class Producer extends React.Component<IProducerProps,IProducerState> {
    constructor(props : IProducerProps){
        super(props);
    }

    public render(){

        let whatProducer;
        if(this.props.players == 1 || this.props.players == 4){
            whatProducer = require("../images/producer.png")
        }else {
            whatProducer = require("../images/producer1.png")
        }

        return(
            
            <img className='w-25 p-2' src = {whatProducer}/>
            
        );
    }
}
export default Producer;