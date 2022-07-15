import { RoomProvider } from '@liveblocks/react';
import React from 'react';  
import { useParams } from 'react-router-dom';
import Game from '../components/game';  

function GamePage() {
   
        const {name} = useParams();
        
        return (
            <RoomProvider 
            id={String(name)}>
                <Game/>
            </RoomProvider>
        );
}

export default GamePage;