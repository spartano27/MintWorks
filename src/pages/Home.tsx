import { RoomProvider } from '@liveblocks/react';
import React from 'react';
import Carrusel from '../components/carrusel';
import PlayButton from '../components/playButton';
import Footer from '../footer';

/**
 * It's a function that returns a RoomProvider component, which is a component that has a child
 * component called PlayButton and Carrusel
 * @returns A component that is a provider of the RoomContext.
 */

function HomeP(){
  
    return (
      <RoomProvider 
      id={'home'}>
          <div style={{overflow:'hidden'}}>
            <img alt='LogoHome' className="d-block mx-auto w-50" src={require("../images/logoMint.png")}/>
            <PlayButton />
            <div className='mt-5'>
              <Carrusel/> 
            </div>
            <Footer/>
          </div>
      </RoomProvider>
    );
}

export default HomeP;