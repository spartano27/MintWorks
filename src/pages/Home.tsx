import { RoomProvider } from '@liveblocks/react';
import React from 'react';
import Carrusel from '../components/carrusel';
import PlayButton from '../components/playButton';

function HomeP(){
  
    return (
      <RoomProvider 
      id={'home'}>

          <img alt='LogoHome' className="d-block mx-auto w-50" src={require("../images/logoMint.png")}/>
          <PlayButton />
          <div className='mt-5'>
            <Carrusel/> 
          </div>
      </RoomProvider>
    );
}

export default HomeP;