import React from "react";
import {ListGroup, Row} from "react-bootstrap";
import '../assets/css/neighborhood.css';
import Clock from "../containers/clock";





function Neighborhood(id:any, username:any){
    
    const user = () => {
        if(id.username == undefined){
            return ""
        }else{
            return String(id.username);
        }
    }
    
    
    
                return(
                        <div className="square">
                            <Row className="p-2">
                                <div className="p-2">
                                    <Clock playerId={id.id}/>
                                       
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