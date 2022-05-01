import React from "react";
import Neighborhood from "../containers/neighborhood";

interface IPlayerProps {
    playerId: number;
}

interface IPlayerState {

}

class Player extends React.Component<IPlayerProps,IPlayerState> {
    constructor(props: IPlayerProps){
        super(props);

    }

    public render(){

        return (
            <Neighborhood playerId={this.props.playerId} />
        );
    }
}

export default Player;