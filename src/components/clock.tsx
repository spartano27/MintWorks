import React from "react";
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

function Clock() {
        
    return (

        <CountdownCircleTimer
            
            isPlaying={true}
            duration={6}
            colors={'#43716c'}
            size={50}
            onComplete={() => {
                
                return {shouldRepeat:true, delay:1.5}
            }}>

            {({ remainingTime }) => remainingTime}
            
        </CountdownCircleTimer>

    );
    
}

export default Clock;