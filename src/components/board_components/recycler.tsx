import React from 'react';
import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, ListGroup } from "react-bootstrap";
import handleChangeTurn from "../../turn";
import { Card, Presence } from "../../types";


function Recycler() {

    const keyClock = useObject<{key:number}>("keyClock");
    const recycler = useObject("recycler");
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

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || recycler == null || turno == null || self == null) {
        return null;
    }

    const handleClickRecycler = () => {
        if(turno.get("turn") === self.connectionId ){

            if(recycler.get("occupied")){
                return;
            }
            else{
                setVisible(true)
            }
        } 
    }

    const handleClick = (card: Card | undefined,index: number) => {
        if (card == null){
            return null;
        }
            const cost = card.value + card.stars;
            const nuevaCards = mypresence.cards.slice();
            nuevaCards.splice(index,1);
            update({cards:nuevaCards});
            update({mint:Number(mypresence.mint)+cost});
            recycler.set("img", "recyclerUsed.png");
            recycler.set("occupied", true);
    
            setVisible(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
        
       
        
    }

        return(

            <div >
                <img alt="Recyler" style = {recycler.get("occupied") ? {width:210} : {width:210,borderColor:'#eaa856',borderWidth:'5px',borderStyle:'solid'}} src = {require(`../../images/${recycler.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickRecycler() } />
                <Modal className="Normal_modal" show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Recycler card?
                    </ModalHeader>
                    <ModalBody>
                        Choose one of your plans for gain mints equal to the sum of its cost and stars.
                        <div className="p-4">

                        <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                            {mypresence.cards.length === 0 ? "You dont have any card on your neighborhood" : ""}
                            {mypresence.cards.map((card,index)=> {
                                
                                if(card == null){
                                    console.log("aaa");
                                    return null;
                                }
                    
                                    return(

                                        <div key={card.id}>
                                            <ListGroup.Item variant="primary"
                                            onFocus={(e) => update({ focusedId: e.target.id })}
                                            onBlur={() => update({ focusedId: null })}>

                                                <img alt="CardSwap" key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>

                                            </ListGroup.Item>

                                            <div style={{paddingLeft:'44px'}}>
                                                <Button   id={card.id} onClick={() => handleClick(card,index)}> Choose </Button>
                                            </div>
                                        </div>
                                    )
                            })}
                        </ListGroup>
                    </div>
                    </ModalBody>

                </Modal>
            </div>

        );
}

export default Recycler;