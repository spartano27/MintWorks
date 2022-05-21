import React, { useState } from "react";
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
import { useList, useOthers } from "@liveblocks/react";


function Shop(players: any) {

const cards = useSelector((state:any) => state.cards);

const mazo_inicial = useSelector((state:any) => state.mazo_inicial);
const dispatch = useDispatch();
const rand = useList("rand",[]);
        if (rand == null){
            return null;
        }
        
        console.log(rand.get(0));

/* A function that takes an array of objects, a start index and an end index. It then creates a new
array, removes the element at the start index and inserts it at the end index. */

const reorder = (list: { id: string; name: string; component: JSX.Element; }[],startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex,1);
    result.splice(endIndex,0,removed);
    return result;
}

    const Inicio = (card: { id: string; name: string; component: JSX.Element; }[]) => {
        
    if(players === 1){
        var i = 1;
    }else {
        var i = 0;
    }
    
    while(i<3){
        
        for (var c in card) {
            if(parseInt(card[c].id) === Math.round(Number(rand))){
                dispatch(initialStateCard(card[c]));
                
                i++;
            }
                    
        }
       
    }
    console.log(mazo_inicial);
    return [];
}

    return (    
        
        <ListGroup horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            
      
    </ListGroup>

        );


}

export default Shop;
