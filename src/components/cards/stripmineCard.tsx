import React from "react";

interface IStripmineProps {

}
interface IStripmineState {
    build : boolean;
    owned : boolean;

}

class Stripmine extends React.Component<IStripmineProps,IStripmineState> {
    constructor(props : IStripmineProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/STRIPMINE.PNG")} style={{padding:'0px'}}/>
           
        );
    }
}
export default Stripmine;