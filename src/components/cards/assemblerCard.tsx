import React from "react";


interface IAssemblerProps {

}
interface IAssemblerState {
    build : boolean;
    owned : boolean;
    zoomed: boolean;

}


class Assembler extends React.Component<IAssemblerProps,IAssemblerState> {
    constructor(props : IAssemblerProps){
        super(props);
        this.state = {build: false, owned: false, zoomed: false};

    }

    
    public render(){
      
      
        return(

            <div>
            <img  src = {require("../../images/cards_images/ASSEMBLER.PNG")} style={{padding:'0px'}} />
           
            </div>

        );
    }
}
export default Assembler;