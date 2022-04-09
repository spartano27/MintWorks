import React from "react";

interface IMuseumProps {

}
interface IMuseumState {
    build : boolean;
    owned : boolean;

}

class Museum extends React.Component<IMuseumProps,IMuseumState> {
    constructor(props : IMuseumProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/MUSEUM.PNG")}/>
           
        );
    }
}
export default Museum;