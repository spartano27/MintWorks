import React from "react";

interface IWholesalerProps {

}
interface IWholesalerState {
    build : boolean;

}

class Wholesaler extends React.Component<IWholesalerProps,IWholesalerState> {
    constructor(props : IWholesalerProps){
        super(props);
        this.state = {build: false};

    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    public render(){
        let whatWholesaler;
        if (this.state.build){

            whatWholesaler = require("../images/wholesaler.png");

        }else{
            whatWholesaler = require("../images/wholesaler1.png");
        }

        return(
            
            <img style = {{width:210}} src = {whatWholesaler} onDragStart={this.DragHandler}/>
           
        );
    }
}
export default Wholesaler;