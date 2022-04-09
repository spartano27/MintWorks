import React from "react";

interface ILeaderProps {
    players : number;
}
interface ILeaderState {

}

class Leader extends React.Component<ILeaderProps,ILeaderState> {
    constructor(props : ILeaderProps){
        super(props);
    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    public render(){

        return(
            
            <img style = {{width:210}} src = {require("../images/leader.png")} onDragStart={this.DragHandler}/>
           
        );
    }
}
export default Leader;