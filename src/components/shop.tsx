import React, {useState } from "react";;
import { Button, ListGroup} from "react-bootstrap";
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

function Shop(players: any) {
    const mazo = useSelector((state:any)=>state.mazo_inicial);
    const [valorId,setValorId] = useState("0");
    const [mypresence,update] = useMyPresence<Presence>();
    const cards = useSelector((state:any)=>state.cards);
    const dispatch = useDispatch();
    const {name} = useParams();
    const rand = useList(`InitialShop-${name}`,[(1 + Math.random() * (21-1)),(1 + Math.random() * (21-1)),(1 + Math.random() * (21-1))].sort((n1,n2) => n1-n2));
                if (rand == null){
                    return null;
                }

/* Initialice the shop*/

    const initialice = () => {
        
        for (var c in cards) {
            if(parseInt(cards[c].id) === Math.round(Number(rand.get(0))) && !mazo.includes(cards[c])){
                
                dispatch(usedCards(cards[c]));
                dispatch(removeCard(parseInt(c)));
            }   
            else if(parseInt(cards[c].id) === Math.round(Number(rand.get(1))) && !mazo.includes(cards[c])){
                
                dispatch(usedCards(cards[c]));
                dispatch(removeCard(parseInt(c)-1));
            }   
            else if(parseInt(cards[c].id) === Math.round(Number(rand.get(2))) && !mazo.includes(cards[c])){
                dispatch(usedCards(cards[c]));
                dispatch(removeCard(parseInt(c)-2));
            } 
  
            }
    }
   
    
    
        
    const handleCompra = (card: { id: string; effect:any; value: number; name: Function;}) => {
        if(mypresence == null){
            return null;
        }
        
        const cardOwner = {id: card.id,name: card.name, effect: card.effect, value: card.value, owner: mypresence.username}
        const totalCards = [...mypresence.cards,cardOwner];
        update({cards:totalCards});
        update({mint: mypresence.mint-cardOwner.value});
        
    
        
    }


/* A function that returns a list of cards. */
 
  
    initialice()

    return (    
        <div className="p-4">
            
        
            <ListGroup horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {mazo.map((card:any)=> {
                
               
                return(
                    <div>
                    
                    <div >
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
