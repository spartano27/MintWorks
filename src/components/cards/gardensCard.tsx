import React from "react";

interface IGardensProps {

}
interface IGardensState {
    build : boolean;
    owned : boolean;

}

class Gardens extends React.Component<IGardensProps,IGardensState> {
    constructor(props : IGardensProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/GARDENS.PNG")}/>
           
        );
    }
}
export default Gardens;