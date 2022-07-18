import { LiveList, LiveObject } from '@liveblocks/client';
import { RoomProvider } from '@liveblocks/react';
import React from 'react';  
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Game from '../components/game';  
import { RootState } from '../store';
import { Card, LocationTypes } from '../types';

/**
 * It's a function that returns a component that is wrapped in a RoomProvider component. The
 * RoomProvider component is a component that is provided by the library that I'm using. It's a
 * component that is used to provide the state of the game to the rest of the components.
 * 
 * The RoomProvider component takes two props: initialStorage and id.
 * 
 * The initialStorage prop is a function that returns an object. The object contains the initial state
 * of the game.
 * 
 * The id prop is a string that is used to identify the game.
 * @returns A React component that is a wrapper for the Game component.
 */
 
function GamePage() {
   
        const {name} = useParams();
        const players = Number(String(name).split("-")[1]);
        const initialStorage = () => ({
            "listPLayer": new LiveList(),
            "listShuffle": new LiveList(),
            "ShopCards": new LiveList<Card>(),
            "turno": new LiveObject({firstTurn:true, turn:0, visible:false, nuevaRonda: false}),
            "ActualCards": new LiveList<Card>(),
            "winner": new LiveObject({username:"", visible:false}),
            "leader": new LiveObject({img: "leader.png",occupied: false, type: LocationTypes.core}),
            "producer": new LiveObject({img: players === 4 || players === 1 ? "producer.png" : "producer1.png",occupied: 1, type: LocationTypes.core}),
            "builder": new LiveObject({img: players < 4 ? "builder1.png" : "builder.png",occupied: 1, type: LocationTypes.core}),
            "supplier": new LiveObject({img: players < 4 ? "supplier1.png" : "supplier.png",occupied: 1, type: LocationTypes.core}),
            "wholesaler": new LiveObject({img: "wholesaler1.png",occupied: true, type: LocationTypes.deed}),
            "lotto": new LiveObject({img: "lotto1.png",occupied: true,type: LocationTypes.deed})
            

        });
        return (
            <RoomProvider 
            initialStorage={initialStorage} 
            id={String(name)}>
                <Game/>
            </RoomProvider>
        );
}

export default GamePage;