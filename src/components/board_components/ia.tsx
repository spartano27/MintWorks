import { useList, useObject } from "@liveblocks/react";
import React from "react";
import { Row, ListGroup} from "react-bootstrap";
import { Card } from "../../types";
import Justin from '../ia/justin';
import Mort from '../ia/mort';
import Rachael from '../ia/rachael';
import Sonic from '../ia/sonic';
import Mint from "../mint";
import Stars from "../stars";


function IA() {
    const listaSortIas = useList("Ias");
    const IAValors = useObject<{name:string,mint:number,stars:number,cards:Card[]}>("IA");
    let ia;
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    /**
     * The function returns a random component from the array of components.
     * @returns A component.
     */
     if(turno == null || IAValors == null || listaSortIas == null){
        return null;
    }
    

    if(listaSortIas.get(0) === "justin"){
        
        ia = <Justin/>
    }
    if(listaSortIas.get(0) === "rachael"){
       
        ia = <Rachael/>
    }
    if(listaSortIas.get(0) === "mort"){
       
        ia = <Mort/>
    }
    if(listaSortIas.get(0) === "sonic"){
      
        ia = <Sonic/>
    }
    
        return(

            <div>
            
        <div className={"squareIA"}>
            
            <Row style={{marginLeft:'150px'}}>
               
               

                <div  className="pt-2 pl-4">
                    <Mint  mints = {IAValors.get("mint")}/>
                </div>

                <div className="pt-3 pl-4">
                    <Stars stars = {IAValors.get("stars")}/>
                </div>
                
            </Row>
            <Row>
           
            <div className="pl-4 pt-2">
                        {ia}
                </div>
               
               
                <ListGroup style={{marginTop:'50px',maxWidth:'200px',maxHeight:'130px',overflowX:'auto', overflowY:'hidden'}} className="pl-4 pt-2"  key={"neighborhood"} horizontal>
                
                {IAValors.get("cards").map((card)=>{
                            if(card == null){
                                return null;
                            }
                            
                            return(
                                <ListGroup.Item key={card.name} style={{width:'50px',height:'100px', padding: '0px',marginLeft:'10px'}}  variant="secondary">
                                    
                                    <img alt="CardsNeigh" key={`neigh-${card.id}`} src = {require(`../../images/cards_images/${card.active ? card.name.toUpperCase() : "REVERSO"}.PNG`)} style={{width:'50px',height:'100px', padding: '0px'}}/>
                                </ListGroup.Item>
                            )
                            
                            
                    })}

                
                    
                </ListGroup>

           
                
            </Row>
            
        </div> 
        </div>

        );
}

export default IA;