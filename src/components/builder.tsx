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

    

    public render() {
        let whatBuilder;
        if(this.props.players < 4){
            whatBuilder = require("../images/builder1.png")
        }else {
            whatBuilder = require("../images/builder.png")
        }

        return(
            <img className='w-25 p-2' src = {whatBuilder}></img> 
            
        );

    }

}

export default Builder;