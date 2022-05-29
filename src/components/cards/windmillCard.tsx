import React from "react";

interface IWindmillProps {

}
interface IWindmillState {
    build : boolean;
    owned : boolean;

}

class Windmill extends React.Component<IWindmillProps,IWindmillState> {
    constructor(props : IWindmillProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/WINDMILL.PNG")} style={{padding:'0px'}}/>
           
        );
    }
}
export default Windmill;