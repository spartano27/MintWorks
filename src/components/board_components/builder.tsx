import { Presence } from "@liveblocks/client";
import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import handleChangeTurn from "../../turn";


function Builder() {
    const {name} = useParams();
    const builder = useObject(`builder-${name}`);
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
    if (playersList == null || shuffleList == null || builder == null || turno == null || self == null) {
        return null;
    }

    const handleClickBuilder = () => {
        if(turno.get("turn") == self.connectionId ){
            if (players < 4){
                if(Number(builder.get("occupied")) > 2){
                    return;
                }else{
                    setVisible(true)
                }
            }else{
                if(Number(builder.get("occupied")) > 3){
                    return;
                }else{
                    setVisible(true)
                }
            }
            
        }
        
        
    }
    const handleClick = () => {
        
        builder.set("img", players < 4 ? `builder1Used${builder.get("occupied")}.png` : `builderUsed${builder.get("occupied")}.png`);
        builder.set("occupied", Number(builder.get("occupied"))+1);
        setVisible(false);
        handleChangeTurn(playersList,shuffleList,turno);
    }

        return(
            <div>
                <img style = {{width:210}} src = {require(`../../images/${builder.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickBuilder() } />
                <Modal  show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Builder card?
                    </ModalHeader>
                    <ModalBody>
                    choose one of your cards to build it.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleClick()}> Yes</Button>
                        <Button onClick={() => setVisible(false)}> No </Button>
                    </ModalFooter>
                </Modal>
            </div>


        );

   

}

export default Builder;