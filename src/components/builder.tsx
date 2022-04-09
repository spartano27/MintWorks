import React from "react";

interface IBuilderProps {
    players : number;
}

interface IBuilderState {

}


class Builder extends React.Component<IBuilderProps,IBuilderState> {

    constructor(props : IBuilderProps){
        super(props);

    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    

    public render() {
        let whatBuilder;
        if(this.props.players < 4){
            whatBuilder = require("../images/builder1.png")
        }else {
            whatBuilder = require("../images/builder.png")
        }

        return(
            <img style = {{width:210}} src = {whatBuilder} onDragStart={this.DragHandler}></img> 

        );

    }

}

export default Builder;