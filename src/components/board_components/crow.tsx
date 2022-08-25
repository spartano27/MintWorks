import React from 'react';
import { useObject, useSelf, useMyPresence, useList, useOthers } from "@liveblocks/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "react-bootstrap";
import handleChangeTurn from "../../turn";
import { Presence } from "../../types";


function Crow() {

    const keyClock = useObject<{key:number}>("keyClock");
    const crow = useObject("crow");
    const self = useSelf();
    const others = useOthers();
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

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || crow == null || turno == null || self == null) {
        return null;
    }

    const handleClickCrow = () => {
        if(turno.get("turn") === self.connectionId ){

            if(crow.get("occupied")){
                return;
            }
            else{
                setVisible(true)
            }
        } 
        
    }

    const handleClick = () => {

        

            crow.set("img", "crowUsed.png");
            crow.set("occupied", true);
            update({mint:Number(mypresence.mint)+2});
            others.map(({presence})=>{
                if(presence == null){
                    return null;
                }
                presence.mint = Number(presence.mint) + 1
            })
            setVisible(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
          
        
        
    }

        return(

            <div >
                <img alt="Crow" style = {crow.get("occupied") ? {width:210} : {width:210,borderColor:'#eaa856',borderWidth:'5px',borderStyle:'solid'}} src = {require(`../../images/${crow.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickCrow() } />
                <Modal className="Normal_modal" show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Crowdfunder card?
                    </ModalHeader>
                    <ModalBody>
                        You will get 3 mints and each players will get 1 mint.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleClick()}> Yes</Button>
                        <Button onClick={() => setVisible(false)}> No </Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
}

export default Crow;