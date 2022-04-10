import React from "react";


interface IRachaelProps {

}
interface IRachaelState {
    build : boolean;
    zoomed: boolean;

}


class Rachael extends React.Component<IRachaelProps,IRachaelState> {
    constructor(props : IRachaelProps){
        super(props);
        this.state = {build: false, zoomed: false};

    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    public render(){
      
      
        return(

            <div>
            <img  src = {require("../../images/ias_images/RACHAEL.PNG")} style={{width:'250px'}} 
            onDragStart={this.DragHandler} />
           
            </div>

        );
    }
}
export default Rachael;