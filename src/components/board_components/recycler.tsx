import React from 'react';
import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "react-bootstrap";
import handleChangeTurn from "../../turn";
import { Presence } from "../../types";


function Recycler() {

    const keyClock = useObject<{key:number}>("keyClock");
    const recycler = useObject("recycler");
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

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || recycler == null || turno == null || self == null) {
        return null;
    }

    const handleClickRecycler = () => {
        
    }

    const handleClick = () => {
        
        recycler.set("img", "RecyclerUsed");
        recycler.set("occupied", true);
        update({mint:Number(mypresence.mint)+1});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

        return(

            <div >
                <img alt="Recyler" style = {{width:210}} src = {require(`../../images/${recycler.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickRecycler() } />
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

export default Recycler;