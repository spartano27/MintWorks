import React from "react";


interface IJustinProps {

}
interface IJustinState {
    build : boolean;
    zoomed: boolean;

}


class Justin extends React.Component<IJustinProps,IJustinState> {
    constructor(props : IJustinProps){
        super(props);
        this.state = {build: false, zoomed: false};

    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    public render(){
      
      
        return(

            <div>
            <img  src = {require("../../images/ias_images/JUSTIN.PNG")} style={{width:'250px'}} 
            onDragStart={this.DragHandler}/>
           
            </div>

        );
    }
}
export default Justin;