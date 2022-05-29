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
            
            <img  src = {require("../../images/cards_images/BRIDGE.PNG")} style={{padding:'0px'}}/>
           
        );
    }
}
export default Bridge;