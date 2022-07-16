import React from "react";
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

/**
 * The Clock function returns a CountdownCircleTimer component that is playing, has a duration of 6
 * seconds, a color of #43716c, a size of 50, and when it's complete, it should repeat with a delay of
 * 1.5 seconds.
 * @returns The return statement is returning an object with two properties: shouldRepeat and delay.
 */

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