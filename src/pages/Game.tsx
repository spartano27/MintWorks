import { LiveList, LiveObject } from '@liveblocks/client';
import { RoomProvider } from '@liveblocks/react';
import React from 'react';  
import { useParams } from 'react-router-dom';
import Game from '../components/game';  
import { Card, LocationTypes } from '../types';

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