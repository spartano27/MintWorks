import { useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React from "react";
import {ListGroup, Row} from "react-bootstrap";
import { useParams } from "react-router-dom";
import '../assets/css/neighborhood.css';
import Clock from "../components/clock";
import { CardTypes, Presence } from "../types";
import Mint from "./mint";
import Stars from "./stars";

function Neighborhood(valor: { username: undefined | string; id: number; mints: number; stars: number; cards: {id:string,name:string,value:number,owner:number,active:boolean,stars:number,type:CardTypes}[]; }){
    const {name} = useParams();
    const turno = useObject(`turno-${name}`);
    const self = useSelf();
    const [mypresence,] = useMyPresence<Presence>();
    
    if(mypresence == null || self == null || turno == null){
        return null
    }

    const user = () => {
        if(valor.username === undefined){
            return ""
        }
        else{
            return String(valor.username);
        }
    }
    
    return(

        <div className={turno.get("turn") === valor.id ? "squareSelected": "square"}>
            <Row className="">
                <div className="pl-4 pt-2">
                    <Clock/>
                </div>

                <div className="pt-2 pl-2">
                    <Mint  mints = {valor.mints}/>
                </div>

                <div className="pt-2 pl-2">
                    <Stars stars = {valor.stars}/>
                </div>
                
                <div className="pl-4 pt-4">
                    {user()}
                </div>
            </Row>
            <ListGroup key={"neighborhood"} horizontal>
            
                {valor.cards.map((card: any)=>{
                        
                        return(
                            <ListGroup.Item key={"CardNeigh"} style={{width:'50px',height:'100px', padding: '0px'}}  variant="secondary">
                                
                                <img alt="CardsNeigh" key={`neigh-${card.id}`} src = {require(`../images/cards_images/${card.active ? card.name.toUpperCase() : "REVERSO"}.PNG`)} style={{width:'50px',height:'100px', padding: '0px'}}/>
                            </ListGroup.Item>
                        )
                        
                        
                })}
                
            </ListGroup>
        </div>  
    );
}

export default Neighborhood;