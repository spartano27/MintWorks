import React, { useEffect, useState } from "react";;
import { Button, ListGroup} from "react-bootstrap";
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
import { useList, useMyPresence} from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShopCardsTypes } from "../types";

type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
  };

function Shop(players: any) {

    const [valorId,setValorId] = useState("0");
    const username = useSelector((state:any)=>state.username);
    const [mypresence,update] = useMyPresence<Presence>();


    const cards = [{id:"1", name: "Assembler", component: <Assembler/>, value:5, owner: 0},{id:"2", name: "Bridge",component: <Bridge/>, value:1, owner: 0}
        ,{id:"3", name: "Coop", component: <Coop/>, value:1, owner: 0},{id:"4", name: "Corporate", component: <Corporate/>, value:3, owner: 0}
        ,{id:"5", name: "Crane", component: <Crane/>, value:2, owner: 0},{id:"6", name: "Factory", component: <Factory estado={ShopCardsTypes.shop}/>, value:4, owner: 0}
        ,{id:"7", name: "Gallery", component: <Gallery/>, value:4, owner: 0},{id:"8", name: "Gardens", component: <Gardens/>, value:3, owner: 0}
        ,{id:"9", name: "Landfill", component: <Landfill/>, value:3, owner: 0},{id:"10", name: "Lotto", component: <LottoCard/>, value:4, owner: 0}
        ,{id:"11", name: "Mine", component: <Mine/>, value:2, owner: 0},{id:"12", name: "Museum", component: <Museum/>, value:2, owner: 0}
        ,{id:"13", name: "Obelisk", component: <Obelisk/>, value:4, owner: 0},{id:"14", name: "Plant", component: <Plant/>, value:5, owner: 0}
        ,{id:"15", name: "Statue", component: <Statue/>, value:2, owner: 0},{id:"16", name: "Stripmine", component: <Stripmine/>, value:4, owner: 0}
        ,{id:"17", name: "Truck", component: <Truck/>, value:2, owner: 0},{id:"18", name: "Vault", component: <Vault/>, value:5, owner: 0}
        ,{id:"19", name: "Wholesaler", component: <WholesalerCard/>, value:1, owner: 0},{id:"20", name: "Windmill", component: <Windmill/>, value:1, owner: 0}
        ,{id:"21", name: "Workshop", component: <Workshop/>, value:3, owner: 0},
    ];
    console.log(cards.length);
    const {name} = useParams();
    const rand = useList(`InitialShop-${name}`,[(1 + Math.random() * (21-1)),(1 + Math.random() * (21-1)),(1 + Math.random() * (21-1))]);
                if (rand == null){
                    return null;
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
    if(mazo_inicial.length < 3){
      mazo_inicial.push(cards[Math.round(Number(rand.get(0)))+1]);
    }
        
    const handleCompra = (card: { id: string; name: string; component: JSX.Element; }) => {
        if(mypresence == null){
            return null;
        }
        const totalCards = [...mypresence.cards,card.id];
        console.log(card.component);
        update({cards:totalCards});
        console.log(mypresence);
    }
    

/* A function that returns a list of cards. */
 
  
  
    return (    
        <div className="p-4">
            
        
            <ListGroup horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {mazo_inicial.map((card)=> (
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
                    {card.component}
                </ListGroup.Item>

                </div>
                ))}
            </ListGroup>
        </div>

        );


}

export default Shop;
