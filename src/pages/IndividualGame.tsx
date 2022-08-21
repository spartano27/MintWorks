import { LiveList, LiveObject } from '@liveblocks/client';
import { RoomProvider } from '@liveblocks/react';
import React from 'react';  
import { useParams } from 'react-router-dom';  
import SoloGame from '../components/soloGame';
import { Card, LocationTypes } from '../types';

/**
 * The IndividualGame function returns the Game component.
 * @returns The Game component is being returned.
 */

function IndividualGame() {

    const {name} = useParams();
        const players = Number(String(name).split("-")[1]);
        const initialStorage = () => ({
            "Ias": new LiveList(),
            "listPLayer": new LiveList(),
            "listShuffle": new LiveList(),
            "ShopCards": new LiveList<Card>(),
            "turno": new LiveObject({firstTurn:true, turn:0, visible:false, nuevaRonda: false}),
            "ActualCards": new LiveList<Card>(),
            "IA": new LiveObject({name: "",stars:0,mint:3,cards:[],lastAction: "",first:false}),
            "winner": new LiveObject({username:"", visible:false}),
            "leader": new LiveObject({img: "leader.png",occupied: false, type: LocationTypes.core}),
            "producer": new LiveObject({img: players === 4 || players === 1 ? "producer.png" : "producer1.png",occupied: 1, type: LocationTypes.core}),
            "builder": new LiveObject({img: players < 4 ? "builder1.png" : "builder.png",occupied: 1, type: LocationTypes.core}),
            "supplier": new LiveObject({img: players < 4 ? "supplier1.png" : "supplier.png",occupied: 1, type: LocationTypes.core}),
            "wholesaler": new LiveObject({img: "wholesaler1.png",occupied: true, type: LocationTypes.deed}),
            "lotto": new LiveObject({img: "lotto1.png",occupied: true,type: LocationTypes.deed}),
            "crow": new LiveObject({img: "crow.png",occupied: false, type: LocationTypes.advanced}),
            "swap": new LiveObject({img: "swap.png",occupied: false, type: LocationTypes.advanced}),
            "temp": new LiveObject({img: "temp.png",occupied: false, type: LocationTypes.advanced}),
            "advancedCards": new LiveList(),
            "recycler": new LiveObject({img: "recycler.png",occupied: false,type: LocationTypes.advanced}),
            "keyClock": new LiveObject({key:0})
            

        });
        return (
            <RoomProvider 
            initialStorage={initialStorage} 
            id={String(name)}>
                <SoloGame/>
            </RoomProvider>
        );
}

export default IndividualGame;