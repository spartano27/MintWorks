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

    public render(){
        let whatWholesaler;
        if (this.state.build){

            whatWholesaler = require("../images/wholesaler.png");

        }else{
            whatWholesaler = require("../images/wholesaler1.png");
        }

        return(
            
            <img className='w-25 p-2' src = {whatWholesaler}/>
           
        );
    }
}
export default Wholesaler;