import React from "react";

interface ITruckProps {

}
interface ITruckState {
    build : boolean;
    owned : boolean;

}

class Truck extends React.Component<ITruckProps,ITruckState> {
    constructor(props : ITruckProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/TRUCK.PNG")}/>
           
        );
    }
}
export default Truck;