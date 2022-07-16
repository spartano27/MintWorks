import React from 'react';  
import Room from '../components/rooms/room';
import {RoomProvider} from "@liveblocks/react";
import { useParams } from 'react-router-dom';
import { LiveObject } from '@liveblocks/client';

function RoomPage(){
        
        const {name} = useParams();
        const initialStorage = () => ({
                "logo": new LiveObject({check: false})
        });

        return (
                <RoomProvider 
                initialStorage={initialStorage}
                id={String(name)}>
                        <Room/>
                </RoomProvider>
        );
}

export default RoomPage;