import React, {useEffect, useState } from "react";;
import { Alert, Button, ListGroup} from "react-bootstrap";
import '../assets/css/cards.css';
import { useList, useMyPresence} from "@liveblocks/react";
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
  
function Shuffle(array: any[]){
    const arrayForSort = [...array];
    for (var i = arrayForSort.length -1; i > 0; i--){
        var j = Math.floor(Math.random()* (i-1));
        var temp = arrayForSort[i];
        arrayForSort[i] = arrayForSort[j];
        arrayForSort[j] = temp;
    }
    return arrayForSort;
} 
function Shop(players: any) {
    const mazo = useSelector((state:any)=>state.mazo_inicial);
    const [valorId,setValorId] = useState("0");
    const dispatch = useDispatch();
    const [mypresence,update] = useMyPresence<Presence>();
    const cards = useSelector((state:any)=>state.cards);
    const {name} = useParams();
    const rand = useList(`InitialShop-${name}`,Shuffle(cards));
      if(rand == null){
        return null;
      }
    const initialice: any[] = []
/* Initialice the shop*/
    if (true){

        if (rand.get(0) != undefined && rand.get(1) != undefined && rand.get(2) != undefined){
            initialice.push(rand.get(0),rand.get(1),rand.get(2));
        }else if(rand.get(0) != undefined && rand.get(1) != undefined){
            initialice.push(rand.get(0),rand.get(1));
        }else if(rand.get(0) != undefined){
            initialice.push(rand.get(0));
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
            update({cards:totalCards});
            update({mint: mypresence.mint-cardOwner.value});
            for (var i = 0; i< rand.length; i++){
                if (rand.get(i).id == card.id){
                    rand.delete(i);
                }
            }
        }
       
        
        
        
    
        
    }


/* A function that returns a list of cards. */
 
  

   
    return (    
        <div className="p-4">
            
            
            <ListGroup horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {initialice.map((card:any)=> {
                
               
                return(
                    <div>
                    
                    <div>
                  <Button id={card.id} hidden={valorId == card.id ? false : true} onClick={() => handleCompra(card)}> Comprar </Button>
                  <Button id={card.id} hidden={valorId == card.id ? false : true}
                    onClick = {() => setValorId("cerrar")}>  Cerrar </Button>
                  </div>
                  <ListGroup.Item id={card.id} variant="primary"
                  onFocus={(e) => update({ focusedId: e.target.id })}
                  onClick={(e) => setValorId(card.id)}
                  onBlur={() => update({ focusedId: null })}>
                      <img src = {require(`../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>
                  </ListGroup.Item>
  
                  </div>
                )
               
                })}
            </ListGroup>
        </div>

        );


}

export default Shop;
