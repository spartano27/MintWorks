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
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/STRIPMINE.PNG")}/>
           
        );
    }
}
export default Stripmine;