import React from "react";

interface ICoopProps {

}
interface ICoopState {
    build : boolean;
    owned : boolean;

}

class Coop extends React.Component<ICoopProps,ICoopState> {
    constructor(props : ICoopProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/CO-OP.PNG")}/>
           
        );
    }
}
export default Coop;