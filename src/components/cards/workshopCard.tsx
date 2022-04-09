import React from "react";

interface IWorkshopProps {

}
interface IWorkshopState {
    build : boolean;
    owned : boolean;

}

class Workshop extends React.Component<IWorkshopProps,IWorkshopState> {
    constructor(props : IWorkshopProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/WORKSHOP.PNG")}/>
           
        );
    }
}
export default Workshop;