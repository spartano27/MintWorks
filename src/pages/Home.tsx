import React from 'react';
import Carrusel from '../components/carrusel';
import PlayButton from '../components/playButton';
import '../assets/css/home.css';

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
        <body className="bg-gradient-primary" >
          <img className="d-block mx-auto w-50" src={require("../images/mint1.jpg")}/>
          <PlayButton user='usuario' />
          <Carrusel jsonValues={lista}/> 
        </body>
      );
    }
  }
  
  export default HomeP;