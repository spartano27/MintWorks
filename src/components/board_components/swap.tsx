import React from 'react';
import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "react-bootstrap";
import handleChangeTurn from "../../turn";
import { Presence } from "../../types";


function Swap() {

    const keyClock = useObject<{key:number}>("keyClock");
    const swap = useObject("swap");
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
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

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || swap == null || turno == null || self == null) {
        return null;
    }

    const handleClickSwap = () => {
        
    }

    const handleClick = () => {
        
        swap.set("img", "swapUsed");
        swap.set("occupied", true);
        update({mint:Number(mypresence.mint)+1});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

        return(

            <div >
                <img alt="Swap" style = {{width:210}} src = {require(`../../images/${swap.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickSwap() } />
                <Modal show={visible} onHide={() => setVisible(false)} centered >
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

export default Swap;