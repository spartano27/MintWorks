import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React from "react";
import {Button, ListGroup, Row} from "react-bootstrap";
import '../assets/css/neighborhood.css';
import Clock from "../components/clock";
import handleChangeTurn from "../turn";
import { Card, Presence } from "../types";
import Mint from "./mint";
import Stars from "./stars";

/* A function that returns a div with a list of cards. */
function Neighborhood(valor: { username: undefined | string; id: number; mints: number; stars: number; cards: (Card | undefined)[]; }){
    const keyClock = useObject<{key:number}>("keyClock");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    const self = useSelf();
    const [mypresence,] = useMyPresence<Presence>();
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    if(mypresence == null || self == null || turno == null || actualCards == null || shopCards == null || shuffleList == null || playersList == null){
        return null
    }

    /**
     * If the username is undefined, return an empty string, otherwise return the username as a string.
     * @returns A function.
     */
    const user = () => {
        if(valor.username === ""){
            return "Undefined"
        }
        else{
            return String(valor.username);
        }
    }

    return(

        <div>
            
        <div className={turno.get("turn") === valor.id ? "squareSelected": "square"}>
            <h4 className="text-center"> {user()} </h4>
            <Row className="">
                <div className="pl-4 pt-2">
                    <Clock id = {valor.id}/>
                </div>

                <div className="pt-2 pl-4">
                    <Mint  mints = {valor.mints}/>
                </div>

                <div className="pt-3 pl-4">
                    <Stars stars = {valor.stars}/>
                </div>
                
            </Row>
            <ListGroup style={{overflowX:'auto', overflowY:'hidden'}} className="pt-4" key={"neighborhood"} horizontal>
            
                {valor.cards.map((card)=>{
                        if(card == null){
                            return null;
                        }
                        return(
                            <ListGroup.Item key={card.name} style={{width:'50px',height:'100px', padding: '0px',marginLeft:'10px'}}  variant="secondary">
                                
                                <img alt="CardsNeigh" key={`neigh-${card.id}`} src = {require(`../images/cards_images/${card.active ? card.name.toUpperCase() : "REVERSO"}.PNG`)} style={{width:'50px',height:'100px', padding: '0px'}}/>
                            </ListGroup.Item>
                        )
                        
                        
                })}

            
                
            </ListGroup>
        </div>
        <Button type="button" className="mx-auto d-block" variant="secondary" 
        style={{width:'50%', height:'50px',visibility: turno.get("turn") === valor.id ? 'visible' : 'hidden'}}
                    onClick={()=> handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock)}>
                    Pass 
            </Button>   
        </div>
    );
}

export default Neighborhood;