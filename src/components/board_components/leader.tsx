import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useParams } from "react-router-dom";
import handleChangeTurn from "../../turn";

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

function Leader() {
    const {name} = useParams();
    const leader = useObject(`leader-${name}`);
    const self = useSelf();
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
    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || leader == null || turno == null || self == null) {
        return null;
    }
    const handleClickLeader = () => {
        if(turno.get("turn") == self.connectionId ){
            if(leader.get("occupied")){
                return;
            }else{
                setVisible(true)
            }
        }
        
        
    }
    const handleClick = () => {
        leader.set("img", "leaderUsed.png");
        leader.set("occupied", true);
        update({first:true});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);
    }
        return(
            <div>
                <img style = {{width:210}} src = {require(`../../images/${leader.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickLeader() } />
                <Modal  show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use leaderShip card?
                    </ModalHeader>
                    <ModalBody>
                    You will gain 1 mint and the starting player token, which will make you be the first player on the next round.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleClick()}> Yes</Button>
                        <Button onClick={() => setVisible(false)}> No </Button>
                    </ModalFooter>
                </Modal>
            </div>
            
            
        );
   
}
export default Leader;