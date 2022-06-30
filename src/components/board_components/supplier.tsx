import { Presence } from "@liveblocks/client";
import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useParams } from "react-router-dom";
import handleChangeTurn from "../../turn";



function Supplier(){
    
    const {name} = useParams();
    const supplier = useObject(`supplier-${name}`);
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
    if (playersList == null || shuffleList == null || supplier == null || turno == null || self == null) {
        return null;
    }

    const handleClickBuilder = () => {
        if(turno.get("turn") == self.connectionId ){
            if (players < 4){
                if(Number(supplier.get("occupied")) > 2){
                    return;
                }else{
                    setVisible(true)
                }
            }else{
                if(Number(supplier.get("occupied")) > 3){
                    return;
                }else{
                    setVisible(true)
                }
            }
            
        }
        
        
    }
    const handleClick = () => {
        
        supplier.set("img", players < 4 ? `supplier1Used${supplier.get("occupied")}.png` : `supplierUsed${supplier.get("occupied")}.png`);
        supplier.set("occupied", Number(supplier.get("occupied"))+1);
        setVisible(false);
        handleChangeTurn(playersList,shuffleList,turno);
    }



        return(
            
            <div>
                <img style = {{width:210}} src = {require(`../../images/${supplier.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickBuilder() } />
                <Modal  show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Supplier card?
                    </ModalHeader>
                    <ModalBody>
                    Choose one card to buy it.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleClick()}> Yes</Button>
                        <Button onClick={() => setVisible(false)}> No </Button>
                    </ModalFooter>
                </Modal>
            </div>
            
        );
    
}
export default Supplier;