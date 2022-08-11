import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button, ListGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import handleChangeTurn from "../../turn";
import { Card, Presence } from "../../types";

/**
 * If the turn is equal to the connectionId, then if the lotto is occupied, return, else setVisible to
 * true
 * @returns a div with an image, and three modals.
 */

function Lotto() {
   
    const keyClock = useObject<{key:number}>("keyClock");
    const lotto = useObject("lotto");
    const self = useSelf();
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const [visible3,setVisible3] = useState(false);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList<Card>("ShopCards");
    const actualCards = useList<Card>("ActualCards");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");

    /**
     * DragHandler is a function that takes an object with a property called preventDefault that is a
     * function that takes no arguments and returns nothing.
     * @param e - { preventDefault: () => void; }
     */

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || lotto == null || turno == null || self == null) {
        return null;
    }

    /**
     * If the turn is equal to the connectionId, then if the lotto is occupied, return, else setVisible
     * to true.
     * @returns the value of the if statement.
     */

    const handleClickLotto = () => {
        if(turno.get("turn") === self.connectionId ){

                if((lotto.get("occupied"))){
                    return;
                }
                
                else{
                    setVisible(true)
                }
        }
    }

    /**
     * If the player has enough money, and the shop has enough cards, then the player gets a card from
     * the shop, and the shop loses a card.
     * @returns null.
     */

    const handleClick = () => {

        if(shopCards == null || mypresence == null){
            return null;
        }

        if(mypresence.mint >= 3){
            
                if(actualCards.length === 3){
                    
                    if (shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && shopCards.get(2) !== undefined && shopCards.get(3) !== undefined){
                        lotto.set("img", "lottoUsed.png");
                        lotto.set("occupied", true);
                        const cartaLista = shopCards.get(3);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(3);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
                       
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
                        lotto.set("img", "lottoUsed.png");
                        lotto.set("occupied", "true");
                        const cartaLista = shopCards.get(2);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(2);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
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

                        lotto.set("img", "lottoUsed.png");
                        lotto.set("occupied", "true");
                        const cartaLista = shopCards.get(1);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(1);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
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
                        lotto.set("img", "lottoUsed.png");
                        lotto.set("occupied", "true");
                        const cartaLista = shopCards.get(0);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(0);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                        setVisible(false);
                        setVisible2(true);
                        
                    }else{
                        setVisible(false);
                        setVisible1(true);
                    }
                }
        }else{
            setVisible3(true);
        }
    }


    return(
        
        <div>
            <img alt="Lotto" style = {lotto.get("occupied") ? {width:210} : {width:210,borderColor:'#eaa856',borderWidth:'5px',borderStyle:'solid'}} src = {require(`../../images/${lotto.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickLotto() } />
            <Modal className="Normal_modal"  show={visible} onHide={() => setVisible(false)} centered >
                <ModalHeader> 
                    Use lotto card?
                </ModalHeader>
                <ModalBody>
                You will gain the top Plan from the Plan Deck.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>handleClick()}> Yes</Button>
                    <Button onClick={() => setVisible(false)}> No </Button>
                </ModalFooter>
            </Modal>

            <Modal className="Normal_modal"   show={visible1} onHide={() => setVisible1(false)} centered >
                <ModalHeader> 
                    There isnt enough Plan on the Plan Deck.
                    <Button onClick={() => setVisible1(false)}> Ok </Button>
                </ModalHeader>
            </Modal>

            <Modal className="Normal_modal"   show={visible3} onHide={() => setVisible3(false)} centered >
                <ModalHeader> 
                    You dont have enough mints.
                    <Button onClick={() => setVisible3(false)}> Ok </Button>
                </ModalHeader>
            </Modal>

            <Modal className="Normal_modal"  show={visible2} onHide={() => setVisible2(false)} centered >
                <ModalHeader> 
                    You get:
                    <Button onClick={() => setVisible2(false)}> Ok </Button>
                </ModalHeader>
                <ModalBody>
                    <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                    
                    {mypresence.cards.reverse().map((card,index)=> {
                        if(index === mypresence.cards.length-1){
                            if(card == null){
                                return null;
                            }
                            return(
                                <div key={index}>
                                
                                    <ListGroup.Item variant="primary">
                                        <img alt="CardLotto" key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>
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
export default Lotto;