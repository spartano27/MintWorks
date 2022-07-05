import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useParams } from "react-router-dom";
import handleChangeTurn from "../../turn";
import leader from "./leader";

type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
    stars: number;
    first: boolean;
    cursor: {
        x: number,
        y: number
      } | null
  };


function Wholesaler() {
    
    const {name} = useParams();
    const wholesaler = useObject(`wholesaler-${name}`);
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList(`listPLayer-${name}`);
    const shuffleList = useList(`list-${name}`);
    const shopCards = useList(`InitialShop-${name}`);
    const actualCards = useList(`ActualCards-${name}`);
    const turno = useObject(`turno-${name}`,{firstTurn: true,turn:0, visible: false, nuevaRonda: false});

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || wholesaler == null || turno == null || self == null) {
        return null;
    }

    const handleClickWholesoler = () => {
        if(turno.get("turn") == self.connectionId ){
            
                if((wholesaler.get("occupied") == "true")){
                    return;
                }else{
                    setVisible(true)
                }
            }
        
    }
    const handleClick = () => {
        
        wholesaler.set("img", "wholesalerUsed.png");
        wholesaler.set("occupied", "true");
        update({mint:Number(mypresence.mint)+1});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);
    }


        return(
            
            <div>
                <img style = {{width:210}} src = {require(`../../images/${wholesaler.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickWholesoler() } />
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