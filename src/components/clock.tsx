import { useList, useMyPresence, useObject } from "@liveblocks/react";
import React from "react";
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import handleChangeTurn from "../turn";
import { Presence } from "../types";

/**
 * The Clock function returns a CountdownCircleTimer component that is playing, has a duration of 6
 * seconds, a color of #43716c, a size of 50, and when it's complete, it should repeat with a delay of
 * 1.5 seconds.
 * @returns The return statement is returning an object with two properties: shouldRepeat and delay.
 */

function Clock(valor:{id:number}) {
    const keyClock = useObject<{key:number}>("keyClock");
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    const [mypresence,] = useMyPresence<Presence>();
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    if( keyClock == null || mypresence == null || turno == null || actualCards == null || shopCards == null || shuffleList == null || playersList == null){
        return null
    }
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    const remainingTime = 60;
    const setPlaying = () => {
        
        delay(2000);
        
        return turno.get("turn") === valor.id;
    }
    return (
        
        <CountdownCircleTimer
            key={keyClock.get("key")}
            isPlaying={setPlaying()}
            duration={remainingTime}
            colors={'#43716c'}
            size={50}
            onComplete= {() => {
                keyClock.set("key",keyClock.get("key")+1);
                handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                
            }}>

            {({ remainingTime }) => remainingTime}
            
        </CountdownCircleTimer>

    );
    
}

export default Clock;