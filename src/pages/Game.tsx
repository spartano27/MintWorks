import { RoomProvider } from '@liveblocks/react';
import React from 'react';  
import { useParams } from 'react-router-dom';
import Game from '../containers/game';  
import {LiveList, LiveObject} from "@liveblocks/client";
import Shop from '../components/shop';
function GamePage() {

   
        const {name} = useParams();
        return (
            <RoomProvider 
            id={String(name)}
            defaultStorageRoot={() => {
                random: new LiveList([(1 + Math.random() * (21-1))])
            }}>

            
            <body style={{backgroundImage: 'url(' + require('../images/fondo1.png') + ')'}}>
                          
                            <Game/>

            </body>
            </RoomProvider>
           
        );
    
}

export default GamePage;