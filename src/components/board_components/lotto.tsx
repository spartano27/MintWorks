import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button, ListGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useParams } from "react-router-dom";
import handleChangeTurn from "../../turn";
import { Presence } from "../../types";

function Lotto() {
   
    const {name} = useParams();
    const lotto = useObject(`lotto-${name}`);
    const self = useSelf();
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const playersList = useList(`listPLayer-${name}`);
    const shuffleList = useList(`list-${name}`);
    const shopCards = useList(`InitialShop-${name}`);
    const actualCards = useList(`ActualCards-${name}`);
    const turno = useObject(`turno-${name}`,{firstTurn: true,turn:0, visible: false, nuevaRonda: false});

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || lotto == null || turno == null || self == null) {
        return null;
    }

    const handleClickWholesoler = () => {
        if(turno.get("turn") === self.connectionId ){

                if((lotto.get("occupied") === "true")){
                    return;
                }
                
                else{
                    setVisible(true)
                }
        }
    }

    const handleClick = () => {

        if(shopCards == null || mypresence == null){
            return null;
        }

        if(mypresence.mint >= 3){
            
                if(actualCards.length === 3){
                    
                    if (shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && shopCards.get(2) !== undefined && shopCards.get(3) !== undefined){
                        lotto.set("img", "lottoUsed.png");
                        lotto.set("occupied", "true");
                        const cartaLista = shopCards.get(3);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(3);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
                       
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);
                        
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
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);
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
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);
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
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);
                        setVisible(false);
                        setVisible2(true);
                        
                    }else{
                        setVisible(false);
                        setVisible1(true);
                    }
                }
        }
    }


    return(
        
        <div>
            <img alt="Lotto" style = {{width:210}} src = {require(`../../images/${lotto.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickWholesoler() } />
            <Modal  show={visible} onHide={() => setVisible(false)} centered >
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
            <Modal  show={visible1} onHide={() => setVisible1(false)} centered >
                <ModalHeader> 
                    There isnt enough Plan on the Plan Deck.
                    <Button onClick={() => setVisible1(false)}> Ok </Button>
                </ModalHeader>
            </Modal>
            <Modal  show={visible2} onHide={() => setVisible2(false)} centered >
                <ModalHeader> 
                    You get:
                    <Button onClick={() => setVisible2(false)}> Ok </Button>
                </ModalHeader>
                <ModalBody>
                    <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                    
                    {mypresence.cards.reverse().map((card:any,index)=> {
                        if(index === mypresence.cards.length-1){
                            return(
                                <div>
                                
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