import React, { useEffect, useState } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Assembler from "./cards/assemblerCard";
import Bridge from "./cards/bridgeCard";
import '../assets/css/cards.css';
import Coop from "./cards/coopCard";
import Corporate from "./cards/corporateCard";
import Crane from "./cards/craneCard";
import Factory from "./cards/factoryCard";
import Gallery from "./cards/galleryCard";
import Gardens from "./cards/gardensCard";
import Landfill from "./cards/landfillCard";
import LottoCard from "./cards/lottoCard";
import Mine from "./cards/mineCard";
import Museum from "./cards/museumCard";
import Obelisk from "./cards/obeliskCard";
import Plant from "./cards/plantCard";
import Statue from "./cards/statueCard";
import Stripmine from "./cards/stripmineCard";
import Truck from "./cards/truckCard";
import Vault from "./cards/vaultCard";
import WholesalerCard from "./cards/wholesalerCard";
import Windmill from "./cards/windmillCard";
import Workshop from "./cards/workshopCard";
import { useDispatch, useSelector } from "react-redux";
import { initialStateCard } from "../store";
import { useList, useMyPresence,useOthers, useUpdateMyPresence  } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import Selection from "./selection";

function Shop(players: any) {

    
    const username = useSelector((state:any)=>state.username);
    const [mypresence,update] = useMyPresence<Presence>();
    useEffect(()=>{
        update({username:username});
        
      }, []);

    const cards = [{id:"1", name: "Assembler", component: <Assembler/>},{id:"2", name: "Bridge",component: <Bridge/>}
        ,{id:"3", name: "Coop", component: <Coop/>},{id:"4", name: "Corporate", component: <Corporate/>}
        ,{id:"5", name: "Crane", component: <Crane/>},{id:"6", name: "Factory", component: <Factory/>}
        ,{id:"7", name: "Gallery", component: <Gallery/>},{id:"8", name: "Gardens", component: <Gardens/>}
        ,{id:"9", name: "Landfill", component: <Landfill/>},{id:"10", name: "Lotto", component: <LottoCard/>}
        ,{id:"11", name: "Mine", component: <Mine/>},{id:"12", name: "Museum", component: <Museum/>}
        ,{id:"13", name: "Obelisk", component: <Obelisk/>},{id:"14", name: "Plant", component: <Plant/>}
        ,{id:"15", name: "Statue", component: <Statue/>},{id:"16", name: "Stripmine", component: <Stripmine/>}
        ,{id:"17", name: "Truck", component: <Truck/>},{id:"18", name: "Vault", component: <Vault/>}
        ,{id:"19", name: "Wholesaler", component: <WholesalerCard/>},{id:"20", name: "Windmill", component: <Windmill/>}
        ,{id:"21", name: "Workshop", component: <Workshop/>},
    ];
    const {name} = useParams();
    //String(name)
    const rand = useList("ewwww",[(1 + Math.random() * (21-1)),(1 + Math.random() * (21-1)),(1 + Math.random() * (21-1))]);
                if (rand == null){
                    return null;
                }
                
            
    /* A function that takes an array of objects, a start index and an end index. It then creates a new
    array, removes the element at the start index and inserts it at the end index. */
    const reorder = (list: { id: string; name: string; component: JSX.Element; }[],startIndex: number, endIndex: number) => {
        const result = [...list];
        const [removed] = result.splice(startIndex,1);
        result.splice(endIndex,0,removed);
        return result;
    }


    const mazo_inicial = [];

/* Initialice the shop*/

    
    
    for (var c in cards) {
    if(parseInt(cards[c].id) === Math.round(Number(rand.get(0)))){
        mazo_inicial.push(cards[c]);
        cards.splice(parseInt(c),1);
    }     
    else if(parseInt(cards[c].id) === Math.round(Number(rand.get(1)))){
        mazo_inicial.push(cards[c]);
        cards.splice(parseInt(c),1);
    }    
    else if(parseInt(cards[c].id) === Math.round(Number(rand.get(2)))){
        mazo_inicial.push(cards[c]);
        cards.splice(parseInt(c),1);
    }    else{
        
    } 

    }
        
            
    
    

    console.log(mazo_inicial);
    console.log(cards);

/* A function that returns a list of cards. */
 
    

    return (    
        <div>
            <div>
                <input
                    id="input-name"
                    type="text"
                    
                    onFocus={(e) => update({ focusedId: e.target.id })}
                    onBlur={() => update({ focusedId: null })}
                   
                    maxLength={20}
                />
                <Selections id="input-name" />
                </div>
        
            <ListGroup horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {mazo_inicial.map((card)=> (
                <div>
                <ListGroup.Item id={card.id} variant="primary"
                onFocus={(e) => update({ focusedId: e.target.id })}
                onClick={(e) => update({ focusedId: card.id})}
                onBlur={() => update({ focusedId: null })}>
                    {card.component}
                </ListGroup.Item>
                
                <Selections id={card.id} />

                </div>
                ))}
            </ListGroup>
        </div>

        );


}
type Presence = {
    focusedId: string | null;
    username: string;
  };

function Selections({ id }: { id: string }) {
    const users = useOthers();
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
    return (
      <>
        {users.map(({ connectionId, presence }:any) => {
            if (presence == null){
                return null;
            }
            
          if (presence.focusedId === id) {
            return (
              <Selection
                key={connectionId}
                name={presence.username}
                color={COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]}
              />
            );
          }
        })}
      </>
    );
  }
export default Shop;
