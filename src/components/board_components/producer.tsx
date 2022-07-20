import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import handleChangeTurn from "../../turn";
import { Presence } from "../../types";

function Producer() {
    
    const keyClock = useObject<{key:number}>("keyClock");
    const producer = useObject("producer");
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");

    /**
     * DragHandler is a function that takes an object with a property called preventDefault that is a
     * function that takes no arguments and returns nothing.
     * @param e - { preventDefault: () => void; }
     */

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || producer == null || turno == null || self == null) {
        return null;
    }

    /**
     * If the turn is equal to the connectionId, and the number of players is 2 or 3, and the number of
     * occupied producers is greater than 2, then return. Otherwise, setVisible(true).
     * 
     * If the number of players is not 2 or 3, then if the number of occupied producers is greater than
     * 3, return. Otherwise, setVisible(true).
     * 
     * @returns the value of the variable "visible"
     */
    const handleClickProducer = () => {
        if(turno.get("turn") === self.connectionId ){
            if (players === 2 || players === 3){

                if(Number(producer.get("occupied")) > 2){
                    return;
                }

                else{
                    setVisible(true)
                }

            }else{
                if(Number(producer.get("occupied")) > 3){
                    return;
                }
                
                else{
                    setVisible(true)
                }
            }
            
        } 
    }

    /**
     * When the user clicks on the producer, the image changes to a used producer, the occupied value
     * increases by 1, the mint value increases by 1, the producer is hidden, and the turn changes.
     */

    const handleClick = () => {
        
        producer.set("img", players === 4 || players === 1 ? `producerUsed${producer.get("occupied")}.png` : `producer1Used${producer.get("occupied")}.png`);
        producer.set("occupied", Number(producer.get("occupied"))+1);
        update({mint:Number(mypresence.mint)+1});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

    return(

        <div>
        <img alt="Producer" style = {{width:210}} src = {require(`../../images/${producer.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickProducer() } />
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
export default Producer;