import React from "react";

interface IStatueProps {

}
interface IStatueState {
    build : boolean;
    owned : boolean;

}

class Statue extends React.Component<IStatueProps,IStatueState> {
    constructor(props : IStatueProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/STATUE.PNG")}/>
           
        );
    }
}
export default Statue;