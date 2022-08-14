import React, {useState } from "react";
import '../assets/css/cards.css';
import { useList, useMyPresence, useObject} from "@liveblocks/react";
import { ListGroup } from "react-bootstrap";
import { Card, Presence } from "../types";

/**
 * @param valor - {players: number}
 * @returns A list of cards that are being displayed in the shop.
 */
function Shop() {
    
    const [,setValorId] = useState("0");
    const [,update] = useMyPresence<Presence>();
    const shopCards = useList<Card>("ShopCards");
    const actualCards = useList<Card>("ActualCards");
    const turno = useObject("turno");

    if(actualCards == null || shopCards == null || turno == null){
      return null;
    }
    
    return (    
      

      <div className="p-4">
        <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
        {actualCards.map((card)=> {
        
          return(
             
              <div key={card.name}>
                <ListGroup.Item variant="primary"
                onFocus={(e) => update({ focusedId: e.target.id })}
                onClick={() => setValorId(card.id)}
                onBlur={() => update({ focusedId: null })}>

                  <img alt="CardShop" key={`shop-${card.id}`} src = {require(`../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>

                </ListGroup.Item>
              </div>
          )
              
        })}
        </ListGroup>
      </div>
    );
}

export default Shop;
