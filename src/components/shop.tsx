import React, {useState } from "react";
import '../assets/css/cards.css';
import { useList, useMyPresence, useObject} from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";


type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
  };
  

function Shop(players: any) {
    
    const [valorId,setValorId] = useState("0");
    const [mypresence,update] = useMyPresence<Presence>();
    const {name} = useParams();
    const shopCards = useList(`InitialShop-${name}`);
    const actualCards = useList(`ActualCards-${name}`);
    const turno = useObject(`turno-${name}`);

      if(actualCards == null || shopCards == null || turno == null){
        return null;
      }
    


/* A function that returns a list of cards. */
 
  

   
    return (    
        <div className="p-4">
            
          
            <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {actualCards.map((card:any)=> {
                
               
                return(
                    <div>

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
