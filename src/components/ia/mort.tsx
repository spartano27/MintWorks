import React from "react";


interface IMortProps {

}
interface IMortState {
    build : boolean;
    zoomed: boolean;

}


class Mort extends React.Component<IMortProps,IMortState> {
    constructor(props : IMortProps){
        super(props);
        this.state = {build: false, zoomed: false};

    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    public render(){
      
      
        return(

            <div>
            <img  src = {require("../../images/ias_images/MORT.PNG")} style={{width:'250px'}}
            onDragStart={this.DragHandler} />
           
            </div>

        );
    }
}
export default Mort;