import React from "react";
import { ShopCardsTypes } from "../../types";



function Factory(valor: any){
    switch(valor.estado){
        case ShopCardsTypes.shop:
            
            return(<img src = {require("../../images/cards_images/FACTORY.PNG")} style={{padding:'0px'}}/>)

        case ShopCardsTypes.neighborhood:

            return(<img src = {require("../../images/REVERSO.PNG")} style={{padding:'0px'}}/>)

        case ShopCardsTypes.active:

           return(<img src = {require("../../images/cards_images/FACTORY.PNG")} style={{padding:'0px'}}/>)

        default:
            return(<img src = {require("../../images/cards_images/FACTORY.PNG")} style={{padding:'0px'}}/>)
    }
    
       
      
    
}
export default Factory;