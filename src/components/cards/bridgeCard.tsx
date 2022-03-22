import React from "react";

interface IBridgeProps {

}
interface IBridgeState {
    build : boolean;
    owned : boolean;

}

class Bridge extends React.Component<IBridgeProps,IBridgeState> {
    constructor(props : IBridgeProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/BRIDGE.PNG")}/>
           
        );
    }
}
export default Bridge;