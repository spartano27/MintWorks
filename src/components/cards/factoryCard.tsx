import React from "react";

interface IFactoryProps {

}
interface IFactoryState {
    build : boolean;
    owned : boolean;

}

class Factory extends React.Component<IFactoryProps,IFactoryState> {
    constructor(props : IFactoryProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/FACTORY.PNG")}/>
           
        );
    }
}
export default Factory;