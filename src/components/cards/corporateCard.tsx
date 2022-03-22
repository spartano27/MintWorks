import React from "react";

interface ICorporateProps {

}
interface ICorporateState {
    build : boolean;
    owned : boolean;

}

class Corporate extends React.Component<ICorporateProps,ICorporateState> {
    constructor(props : ICorporateProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/CORPORATE.PNG")}/>
           
        );
    }
}
export default Corporate;