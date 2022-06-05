import React from "react";
import { ShopCardsTypes } from "../../types";



function Landfill(valor: any){
    switch(valor){
        case ShopCardsTypes.shop:
            
            return(<img src = {require("../../images/cards_images/LANDFILL.PNG")} style={{padding:'0px'}}/>)

        case ShopCardsTypes.neighborhood:

            return(<img src = {require("../../images/REVERSO.PNG")} style={{width:'50px',height:'100px', padding: '0px'}}/>)

        case ShopCardsTypes.active:

           return(<img src = {require("../../images/cards_images/LANDFILL.PNG")} style={{width:'50px',height:'100px', padding: '0px'}}/>)

        default:
            return(<img src = {require("../../images/cards_images/LANDFILL.PNG")} style={{padding:'0px'}}/>)
    }
    
       
      
    
}
export default Landfill;