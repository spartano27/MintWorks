import React from 'react';
import Carrusel from '../components/carrusel';
import PlayButton from '../components/playButton';
import '../assets/css/home.css';

const lista = [{
  srcValue: "logo192.png",
  altValue: "First slide"
},{
  srcValue: "logo192.png",
  altValue: "Second slide"
},{
  srcValue: "logo192.png",
  altValue: "Third slide"
}];

class HomeP extends React.Component {
  
    public render() {
      return (
        <body className="bg-gradient-primary" >
          <img className="d-block mx-auto w-50" src={require("../images/mint1.jpg")}></img>
          <PlayButton user='usuario' />
          <Carrusel jsonValues={lista}/>
          
          
         
        </body>
      );
    }
  }
  
  export default HomeP;