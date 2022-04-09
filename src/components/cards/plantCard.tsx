import React from "react";

interface IPlantProps {

}
interface IPlantState {
    build : boolean;
    owned : boolean;

}

class Plant extends React.Component<IPlantProps,IPlantState> {
    constructor(props : IPlantProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/PLANT.PNG")}/>
           
        );
    }
}
export default Plant;