import React from 'react';
import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroup } from "react-bootstrap";
import handleChangeTurn from "../../turn";
import { Card, Presence } from "../../types";


function Swap() {

    const keyClock = useObject<{key:number}>("keyClock");
    const swap = useObject("swap");
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList<Card>("ShopCards");
    const actualCards = useList<Card>("ActualCards");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || swap == null || turno == null || self == null) {
        return null;
    }

    const handleClickSwap = () => {
        if(turno.get("turn") === self.connectionId ){

            if(swap.get("occupied")){
                return;
            }
            else{
                setVisible(true)
            }
        } 
    }

    const handleClick = (index: number) => {
        if(shopCards == null || mypresence == null){
            return null;
        }

        if(mypresence.mint >= 2){

            if(actualCards.length === 3){
                    
                if (shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && shopCards.get(2) !== undefined && shopCards.get(3) !== undefined){
                    swap.set("img", "swapUsed");
                    swap.set("occupied", true);
                    const cartaLista = shopCards.get(3);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(3);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                   
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    
                    setVisible(false);
                    setVisible2(true);
                    
                }
                
                else{
                    setVisible(false);
                    setVisible1(true);
                }
            }
           
            if(shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && actualCards.length === 2){
                
                if (shopCards.get(2) !== undefined){
                    swap.set("img", "swapUsed");
                    swap.set("occupied", true);
                    const cartaLista = shopCards.get(2);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(2);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    setVisible(false);
                    setVisible2(true);
                    
                }
                
                else{
                    setVisible(false);
                    setVisible1(true);
                }
            }
            if(shopCards.get(0) !== undefined && actualCards.length === 1){
                
                if (shopCards.get(1) !== undefined){

                    swap.set("img", "swapUsed");
                    swap.set("occupied", true);
                    const cartaLista = shopCards.get(1);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(1);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    setVisible(false);
                    setVisible2(true);
                    
                }
                
                else{
                    setVisible(false);
                    setVisible1(true);
                }
            }

            if(actualCards.length === 0){
                
                if (shopCards.get(0) !== undefined){
                    swap.set("img", "swapUsed");
                    swap.set("occupied", true);
                    const cartaLista = shopCards.get(0);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(0);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    setVisible(false);
                    setVisible2(true);
                    
                }else{
                    setVisible(false);
                    setVisible1(true);
                }
            }

            
            update({mint:Number(mypresence.mint)+1});
            setVisible(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
        }
        
        

    }

        return(

            <div >
                <img alt="Swap" style = {{width:210}} src = {require(`../../images/${swap.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickSwap() } />
                <Modal className="Normal_modal" show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Swap Meet card?
                    </ModalHeader>
                    <ModalBody>
                        choose one of your building or plan in your Neighborhood for exchange them for one from the Plan Supply.
                        <div className="p-4">

                        <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                            {mypresence.cards.map((card,index)=> {
                                if(card == null){
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
                                                <Button   id={card.id} onClick={() => handleClick(index)}> Choose </Button>
                                            </div>
                                        </div>
                                    )
                            })}
                        </ListGroup>
                    </div>
                    </ModalBody>
                   
                </Modal>
                <Modal   show={visible1} onHide={() => setVisible1(false)} centered >
                <ModalHeader> 
                    There isnt enough Plan on the Plan Deck.
                    <Button onClick={() => setVisible1(false)}> Ok </Button>
                </ModalHeader>
            </Modal>
            <Modal className="Normal_modal"  show={visible2} onHide={() => setVisible2(false)} centered >
                <ModalHeader> 
                    You get:
                    <Button onClick={() => setVisible2(false)}> Ok </Button>
                </ModalHeader>
                <ModalBody>
                    <ListGroup key={"swap"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                    
                    {mypresence.cards.reverse().map((card,index)=> {
                        if(index === mypresence.cards.length-1){
                            if(card == null){
                                return null;
                            }
                            return(
                                <div key={index}>
                                
                                    <ListGroup.Item variant="primary">
                                        <img alt="Cardswap" key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>
                                    </ListGroup.Item>
                            
                                </div>
                            
                            )
                        }
                        else{
                            return null;
                        }
                        
                    })}
                    </ListGroup>
                </ModalBody>
            </Modal>
            </div>

        );
}

export default Swap;