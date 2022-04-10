import React from "react";


interface ISonicProps {

}
interface ISonicState {
    build : boolean;
    zoomed: boolean;

}


class Sonic extends React.Component<ISonicProps,ISonicState> {
    constructor(props : ISonicProps){
        super(props);
        this.state = {build: false, zoomed: false};

    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    public render(){
      
      
        return(

            <div>
            <img  src = {require("../../images/ias_images/SONIC.PNG")} style={{width:'250px'}} 
            onDragStart={this.DragHandler}/>
           
            </div>

        );
    }
}
export default Sonic;