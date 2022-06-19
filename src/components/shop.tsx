import React, {useEffect, useState } from "react";;
import { Alert, Button, ListGroup} from "react-bootstrap";
import '../assets/css/cards.css';
import { useList, useMyPresence, useObject} from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShopCardsTypes } from "../types";
import { removeCard, usedCards } from "../store";
import Landfill from "../components/cards/landfillCard";
type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
  };
  

function Shop(players: any) {
    const mazo = useSelector((state:any)=>state.mazo_inicial);
    const [valorId,setValorId] = useState("0");
    const dispatch = useDispatch();
    const [mypresence,update] = useMyPresence<Presence>();
    
    const {name} = useParams();
    const shopCards = useList(`InitialShop-${name}`);
    const turno = useObject(`turno-${name}`);
    
    const initialice = [];
      if(shopCards == null || turno == null){
        return null;
      }
    
/* Initialice the shop*/
    
    if (!turno.get("nuevaRonda")){
            
        if (shopCards.get(0) != undefined && shopCards.get(1) != undefined && shopCards.get(2) != undefined){
            
            initialice.push(shopCards.get(0),shopCards.get(1),shopCards.get(2));
        }else if(shopCards.get(0) != undefined && shopCards.get(1) != undefined){
            initialice.push(shopCards.get(0),shopCards.get(1));
        }else if(shopCards.get(0) != undefined){
            initialice.push(shopCards.get(0));
        }else{

            
            
            
        }

    }
        
    const handleCompra = (card: { id: string; effect:any; value: number; name: Function;}) => {
        
        if(mypresence == null){
            return null;
        }
        if(mypresence.mint >= card.value){
           
            const cardOwner = {id: card.id,name: card.name, effect: card.effect, value: card.value, owner: mypresence.username}
            const totalCards = [...mypresence.cards,cardOwner];
            
            for (var i = 0; i< shopCards.length; i++){
                const carta: any = shopCards.get(i);
                for (const property in carta){
                     if (property == "id"){
                        if(carta[property] == card.id){
                            shopCards.delete(i);
                        }
                     }
                }
            
            update({cards:totalCards});
            update({mint: mypresence.mint-cardOwner.value});
        }
       
        
        
        
    
        
    }
}
   
       
       
        
       
    
        
    
   

/* A function that returns a list of cards. */
 
  

   
    return (    
        <div className="p-4">
            
          
            <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {initialice.map((card:any)=> {
                
               
                return(
                    <div>
                     
                    <div>
                  <Button id={card.id} hidden={valorId == card.id ? false : true} onClick={() => handleCompra(card)}> Comprar </Button>
                  <Button id={card.id} hidden={valorId == card.id ? false : true}
                    onClick = {() => setValorId("cerrar")}>  Cerrar </Button>
                  </div>
                  <ListGroup.Item variant="primary"
                  onFocus={(e) => update({ focusedId: e.target.id })}
                  onClick={(e) => setValorId(card.id)}
                  onBlur={() => update({ focusedId: null })}>
                      <img key={`shop-${card.id}`} src = {require(`../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>
                  </ListGroup.Item>
  
                  </div>
                )
               
                })}
            </ListGroup>
        </div>

        );


}

export default Shop;
