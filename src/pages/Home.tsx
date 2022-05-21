import { RoomProvider } from '@liveblocks/react';
import React from 'react';
import Carrusel from '../components/carrusel';
import {PlayButton} from '../components/playButton';

const lista = [{
  srcValue: "mint1.jpg",
  altValue: "First slide"
},{
  srcValue: "mint1.jpg",
  altValue: "Second slide"
},{
  srcValue: "mint1.jpg",
  altValue: "Third slide"
}];




class HomeP extends React.Component {
  
    public render() {
      return (
        <RoomProvider id={'home'} >

        
        <body >
          
          <img className="d-block mx-auto w-50" src={require("../images/logoMint.png")}/>
          <PlayButton />
          <div className='mt-5'>
          <Carrusel jsonValues={lista}/> 
          </div>
          
        </body>
        </RoomProvider>
       
      );
    }
  }
  
  export default HomeP;