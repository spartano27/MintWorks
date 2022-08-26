import React from 'react';  
import {RoomProvider} from "@liveblocks/react";
import { useParams } from 'react-router-dom';
import { LiveList, LiveObject } from '@liveblocks/client';
import RoomP from '../components/rooms/room';

/**
 * The RoomPage function returns a RoomProvider component that has an initialStorage prop that is a
 * function that returns an object with a logo property that is a LiveObject with a check property that
 * is false.
 * @returns A React component that is a wrapper for the Room component.
 */

function RoomPage(){
        
        const {name} = useParams();
        const initialStorage = () => ({
                "logo": new LiveObject({check: false}),
                "check": new LiveList(),
                "visible": new LiveObject({visible:false})
        });

        return (
                <RoomProvider 

                initialStorage={initialStorage}
                id={String(name)}>
                        <RoomP/>
                </RoomProvider>
        );
}

export default RoomPage;