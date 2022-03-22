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

    public render(){

        return(
            
            <img className='w-25 p-2' src = {require("../images/leader.png")}/>
           
        );
    }
}
export default Leader;