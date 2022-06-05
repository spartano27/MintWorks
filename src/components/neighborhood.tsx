import { useMyPresence } from "@liveblocks/react";
import React, { useState } from "react";
import {ListGroup, Row} from "react-bootstrap";
import { useSelector } from "react-redux";
import '../assets/css/neighborhood.css';
import Clock from "../containers/clock";
import { ShopCardsTypes } from "../types";
import Landfill from "./cards/landfillCard";
import Mint from "./mint";

type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
   
  }

function Neighborhood(valor:any){
    const turnoId = useSelector((state:any)=> state.turnoId);
    const [myTurn,useMyTurn] = useState(turnoId == valor.id);
    const [mypresence,SetMyPresence] = useMyPresence<Presence>();
    if(mypresence == null){
        return null
    }
    
    const user = () => {
        if(valor.username == undefined){
            return ""
        }else{
            return String(valor.username);
        }
    }
    
                return(
                        <div className={myTurn ? "squareSelected": "square"}>
                            <Row className="">
                                <div className="pl-4 pt-2">
                                    <Clock playerId={valor.id}/>
                                    
                                </div>
                                <div className="pt-2 pl-2">
                                    <Mint  mints = {valor.mints}/>
                                </div>
                                
                                <div className="pl-4 pt-4">
                                    {user()}
                                </div>
                                
                                
                            </Row>
                            
                            <ListGroup horizontal>
                                
                                {valor.cards.map((card: any)=>{
                                        console.log(card)
                                        //<Landfill estado = {ShopCardsTypes.active}/>  esto esta mal, quitar estado y ponerlo como {card.name}, 
                                        //pero asi se superponen las cartas y esta chido hay que ver como poder hacer eso de normal
                                        return(
                                            <ListGroup.Item style={{width:'50px',height:'100px', padding: '0px'}}  variant="secondary">
                                                
                                                {card.name()}  
                                            </ListGroup.Item>
                                        )
                                     
                                        
                                })}
                                
                            </ListGroup>
                                   
                                
                                    
                                
                           
                        </div>  
                );
               
    
}

export default Neighborhood;