import { useMyPresence } from "@liveblocks/react";
import React, { useState } from "react";
import {ListGroup, Row} from "react-bootstrap";
import { useSelector } from "react-redux";
import '../assets/css/neighborhood.css';
import Clock from "../containers/clock";
import Mint from "./mint";

function Neighborhood(valor:any){
    const turnoId = useSelector((state:any)=> state.turnoId);
    const [myTurn,useMyTurn] = useState(turnoId == valor.id);
    const [mypresence,SetMyPresence] = useMyPresence();
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
                            
                            <ListGroup className="pt-2" horizontal>
                                <ListGroup.Item  variant="secondary">
                                    
                                </ListGroup.Item>
                            </ListGroup>
                        </div>  
                );
               
    
}

export default Neighborhood;