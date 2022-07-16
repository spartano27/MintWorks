import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import handleChangeTurn from "../../turn";
import { Presence } from "../../types";

function Wholesaler() {
    
    const wholesaler = useObject("wholesaler");
    const self = useSelf();
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || wholesaler == null || turno == null || self == null) {
        return null;
    }

    const handleClickWholesoler = () => {
        if(turno.get("turn") === self.connectionId ){
            
                if((wholesaler.get("occupied"))){
                    return;
                }
                else{
                    setVisible(true)
                }
            } 
    }

    const handleClick = () => {
        wholesaler.set("img", "wholesalerUsed.png");
        wholesaler.set("occupied", true);
        update({mint:Number(mypresence.mint)+1});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);
    }

    return(
        
        <div>
            <img alt="Wholesaler" style = {{width:210}} src = {require(`../../images/${wholesaler.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickWholesoler() } />
            <Modal  show={visible} onHide={() => setVisible(false)} centered >
                <ModalHeader> 
                    Use Wholesoler card?
                </ModalHeader>
                <ModalBody>
                    You will gain 2 mint.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>handleClick()}> Yes</Button>
                    <Button onClick={() => setVisible(false)}> No </Button>
                </ModalFooter>
            </Modal>
        </div>
        
    );
}
export default Wholesaler;