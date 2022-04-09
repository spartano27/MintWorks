import React from "react";

interface ILandfillProps {

}
interface ILandfillState {
    build : boolean;
    owned : boolean;

}

class Landfill extends React.Component<ILandfillProps,ILandfillState> {
    constructor(props : ILandfillProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/LANDFILL.PNG")}/>
           
        );
    }
}
export default Landfill;