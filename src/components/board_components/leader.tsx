import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import handleChangeTurn from "../../turn";
import { Presence } from "../../types";

/**
 * The function Leader takes no parameters and returns a React element
 * @returns A div with an image and a modal.
 */

function Leader() {

    const keyClock = useObject<{key:number}>("keyClock");
    const leader = useObject("leader");
    const self = useSelf();
    const [,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");

   /**
    * The function DragHandler takes an object with a property called preventDefault that is a function
    * that takes no parameters and returns nothing.
    * @param e - { preventDefault: () => void; }
    */

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || leader == null || turno == null || self == null) {
        return null;
    }

    /**
     * If the turn is equal to the connectionId, and the leader is occupied, then return. Otherwise,
     * set the visible state to true.
     * @returns Nothing.
     */

    const handleClickLeader = () => {

        if(turno.get("turn") === self.connectionId ){

            if(leader.get("occupied")){
                return;
            }
            else{
                setVisible(true)
            }
        }  
    }

    /**
     * When the button is clicked, the image of the leader card is changed, the leader card is set to
     * occupied, the state is updated, the button is set to invisible and the turn is changed.
     */
    
    const handleClick = () => {

        leader.set("img", "leaderUsed.png");
        leader.set("occupied", true);
        update({first:true});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

        return(

            <div>
                <img alt="Leader" style = {{width:210}} src = {require(`../../images/${leader.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickLeader() } />
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