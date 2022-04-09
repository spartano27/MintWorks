import React from "react";

interface IWholesalerCardProps {

}
interface IWholesalerCardState {
    build : boolean;
    owned : boolean;

}

class WholesalerCard extends React.Component<IWholesalerCardProps,IWholesalerCardState> {
    constructor(props : IWholesalerCardProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/WHOLESALER.PNG")}/>
           
        );
    }
}
export default WholesalerCard;