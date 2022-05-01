import React, { useState } from "react";
import {useCountdown,CountdownCircleTimer} from 'react-countdown-circle-timer';

interface IClockProps {
    players: number;
    playerId: number;
    currentPlayer: number;
    ChangePlayer: (playerId: number) => any;
}

interface IClockState {

}


class Clock extends React.Component<IClockProps,IClockState> {
    constructor (props: IClockProps) {
        super(props)
    }
    
    public render() {
        console.log(this.props.playerId)
        return (
            <CountdownCircleTimer
                
                isPlaying={this.props.playerId === this.props.currentPlayer}
                duration={6}
                colors={'#43716c'}
                size={50}
                onComplete={() => {
                    
                    return {shouldRepeat:true, delay:1.5}
                }}
                

            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>

        );
    }
}

export default Clock;