import React from "react";

interface ICraneProps {

}
interface ICraneState {
    build : boolean;
    owned : boolean;

}

class Crane extends React.Component<ICraneProps,ICraneState> {
    constructor(props : ICraneProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/CRANE.PNG")}/>
           
        );
    }
}
export default Crane;