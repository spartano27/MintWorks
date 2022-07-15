import React, {useState } from "react";
import '../assets/css/cards.css';
import { useList, useMyPresence, useObject} from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { Presence } from "../types";

function Shop(players: any) {
    
    const [,setValorId] = useState("0");
    const [,update] = useMyPresence<Presence>();
    const {name} = useParams();
    const shopCards = useList(`InitialShop-${name}`);
    const actualCards = useList(`ActualCards-${name}`);
    const turno = useObject(`turno-${name}`);

    if(actualCards == null || shopCards == null || turno == null){
      return null;
    }

    return (    

      <div className="p-4">
        <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
        {actualCards.map((card:any)=> {
          return(

              <div key={"Shop"}>
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
