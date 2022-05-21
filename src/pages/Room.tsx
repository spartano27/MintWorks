import React from 'react';  
import Room from '../components/rooms/room';
import {RoomProvider, useRoom} from "@liveblocks/react";
import { useParams } from 'react-router-dom';

function RoomPage(){
        const {name} = useParams();
        return (
                <RoomProvider id={String(name)} 

                
                >
                        

                        <Room />
                </RoomProvider>
                
           
        );
    
}

export default RoomPage;