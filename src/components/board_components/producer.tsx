import { Presence } from "@liveblocks/client";
import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useParams } from "react-router-dom";
import handleChangeTurn from "../../turn";
import builder from "./builder";




function Producer() {
    
    const {name} = useParams();
    const producer = useObject(`producer-${name}`);
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList(`listPLayer-${name}`);
    const shuffleList = useList(`list-${name}`);
    const turno = useObject(`turno-${name}`,{firstTurn: true,turn:0, visible: false, nuevaRonda: false});

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (playersList == null || shuffleList == null || producer == null || turno == null || self == null) {
        return null;
    }

    const handleClickBuilder = () => {
        if(turno.get("turn") == self.connectionId ){
            if (players == 2 || players == 3){
                if(Number(producer.get("occupied")) > 2){
                    return;
                }else{
                    setVisible(true)
                }
            }else{
                if(Number(producer.get("occupied")) > 3){
                    return;
                }else{
                    setVisible(true)
                }
            }
            
        }
        
        
    }
    const handleClick = () => {
        
        producer.set("img", players == 4 || players == 1 ? `producerUsed${producer.get("occupied")}.png` : `producer1Used${producer.get("occupied")}.png`);
        producer.set("occupied", Number(producer.get("occupied"))+1);
        update({mint:Number(mypresence.mint)+2});
        setVisible(false);
        handleChangeTurn(playersList,shuffleList,turno);
    }

        return(
            <div>
            <img style = {{width:210}} src = {require(`../../images/${producer.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickBuilder() } />
                <Modal  show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Producer card?
                    </ModalHeader>
                    <ModalBody>
                    You will get 2 mints.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleClick()}> Yes</Button>
                        <Button onClick={() => setVisible(false)}> No </Button>
                    </ModalFooter>
                </Modal>
            </div>

            
        );
    
}
export default Producer;