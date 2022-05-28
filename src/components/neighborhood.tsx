import React, { useState } from "react";
import {ListGroup, Row} from "react-bootstrap";
import { useSelector } from "react-redux";
import '../assets/css/neighborhood.css';
import Clock from "../containers/clock";
import Mint from "./mint";





function Neighborhood(valor:any){
    const turnoId = useSelector((state:any)=> state.turnoId);
    const [myTurn,useMyTurn] = useState(turnoId == valor.id);
    
    const user = () => {
        if(valor.username == undefined){
            return ""
        }else{
            return String(valor.username);
        }
    }
    
    
    
                return(
                        <div className={myTurn ? "squareSelected": "square"}>
                            <Row className="p-2">
                                <div className="p-2">
                                    <Clock playerId={valor.id}/>
                                    <Mint  mints = {valor.mints}/>
                                </div>
                                <div className="p-2">
                                    {user()}
                                </div>
                                
                            </Row>
                            
                            <ListGroup className="" horizontal>
                                <ListGroup.Item  variant="secondary">

                                </ListGroup.Item>
                            </ListGroup>
                        </div>  
                );
               
    
}

export default Neighborhood;