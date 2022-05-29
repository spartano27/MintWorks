import React from "react";

interface IMineProps {

}
interface IMineState {
    build : boolean;
    owned : boolean;

}

class Mine extends React.Component<IMineProps,IMineState> {
    constructor(props : IMineProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/MINE.PNG")} style={{padding:'0px'}}/>
           
        );
    }
}
export default Mine;