import React from "react";

interface IAssemblerProps {

}
interface IAssemblerState {
    build : boolean;
    owned : boolean;

}

class Assembler extends React.Component<IAssemblerProps,IAssemblerState> {
    constructor(props : IAssemblerProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/ASSEMBLER.PNG")}/>
           
        );
    }
}
export default Assembler;