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
        <main className="bg-gradient-primary" >
          <img className="d-block mx-auto" src={require("../images/logo192.png")}></img>
          <PlayButton />
          <Carrusel jsonValues={lista}/>
          
          
         
        </main>
      );
    }
  }
  
  export default HomeP;