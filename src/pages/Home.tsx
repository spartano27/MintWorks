import React from 'react';
import Carrusel from '../components/carrusel';
import PlayButton from '../containers/playButton';

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
        <body>
          
          <img className="d-block mx-auto w-50" src={require("../images/logoMint.png")}/>
          <PlayButton />
          <Carrusel jsonValues={lista}/> 
        </body>
       
      );
    }
  }
  
  export default HomeP;