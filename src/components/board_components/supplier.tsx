import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, Button, ListGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import handleChangeTurn from "../../turn";
import { Card, Presence } from "../../types";

/* The above code is a React component that is used to buy a card from the supplier. */

function Supplier(){

    const keyClock = useObject<{key:number}>("keyClock");
    const [,setValorId] = useState("0");
    const supplier = useObject("supplier");
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(false);
    const playersList = useList("listPLayer");
    const actualCards = useList<Card>("ActualCards");
    const shuffleList = useList("listShuffle");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    const shopCards = useList<Card>("ShopCards");
    const wholesaler = useObject("wholesaler");
    const lotto = useObject("lotto");
    
    /**
     * DragHandler is a function that takes an object with a property called preventDefault that is a
     * function that takes no arguments and returns nothing.
     * @param e - { preventDefault: () => void; }
     */

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (wholesaler == null || lotto == null || actualCards == null || shopCards == null || playersList == null || shuffleList == null || supplier == null || turno == null || self == null) {
        return null;
    }

    /**
     * If the turn is equal to the connectionId, and the number of players is less than 4, and the
     * number of occupied suppliers is greater than 2, then return. Otherwise, setVisible(true).
     * 
     * If the number of players is greater than 4, and the number of occupied suppliers is greater than
     * 3, then return. Otherwise, setVisible(true).
     * 
     * @returns the value of the function.
     */

    const handleClickSupplier = () => {
        if(turno.get("turn") === self.connectionId ){

            if (players < 4){
                if(Number(supplier.get("occupied")) > 2){
                    return;
                }
                
                else{
                    setVisible(true)
                }
            }
            
            else{

                if(Number(supplier.get("occupied")) > 3){
                    return;
                }
                
                else{
                    setVisible(true)
                }
            }
        }   
    }
 
   /**
    * It's a function that handles the purchase of a card, it has a parameter of type Card, it has a
    * discount variable of type number, a builderEffect variable of type boolean, it has a forEach loop
    * that iterates over the cards in the mypresence object, it has a conditional that checks if the
    * card name is equal to "Truck", it has a conditional that checks if the card value is equal to 1
    * and if the card is active, it has a conditional that checks if the card name is equal to
    * "Assembler" and if the card is active, it has a conditional that checks if the card name is equal
    * to "Wholesaler", it has a conditional that checks if the card name is equal to "Lotto", it has a
    * conditional that checks if the mypresence mint is greater than or equal to the card value, it has
    * a cardOwner variable of type object, it has a totalCards variable of type array,
    * @param {Card} card
    * @returns null.
    */
    const handleCompra = (card: Card) => {
        
        let discount = 0;
        let builderEffect = false;

        if(mypresence == null){
            return null;
        }

        mypresence.cards.forEach((carta)=>{
            if(carta == null){
                return null
            }
            
            if(carta.name === "Truck"){
                if(card.value === 1 && carta.active){
                    discount = 0;
                }
                else{
                    discount = 1;
                }
            }

            if(carta.name === "Assembler" && carta.active){
                builderEffect = true;
                if(card.name === "Wholesaler"){
                    wholesaler.set("img", "wholesaler.png");
                    wholesaler.set("occupied", false);
                }
                if(card.name === "Lotto"){
                    lotto.set("img", "lotto.png");
                    lotto.set("occupied", false);
                }
            }
        })

        if(mypresence.mint >= card.value){
            
            const cardOwner = {id: card.id,name: card.name, value: card.value, active: builderEffect ? true : false, stars: card.stars, type: card.type}
            const totalCards = [...mypresence.cards,cardOwner];
            
            for (let i = 0; i< shopCards.length; i++){
                const carta = shopCards.get(i);
                for (const property in carta){
                     if (property === "id"){
                        if(carta[property] === card.id){
                            shopCards.delete(i);
                        }
                     }
                }

                const actualCarta = actualCards.get(i);

                for (const property in actualCarta){
                    if (property === "id"){
                       if(actualCarta[property] === card.id){
                        actualCards.delete(i);
                       }
                    }
               }
    
                update({cards:totalCards});
                update({mint: mypresence.mint-cardOwner.value+discount});

            }  

            supplier.set("img", players < 4 ? `supplierUsed${supplier.get("occupied")}.png` : `supplier1Used${supplier.get("occupied")}.png`);
            supplier.set("occupied", Number(supplier.get("occupied"))+1);
            setVisible(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);   
    
        }else{
            setVisible1(true);
        }
    }

    return(
        
        <div>
            <img alt="Supplier" style = {(Number(supplier.get("occupied")) > 2) || (players == 4 && Number(supplier.get("occupied")) > 3) ? {width:210} : {width:210,borderColor:'#eaa856',borderWidth:'5px',borderStyle:'solid'}} src = {require(`../../images/${supplier.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickSupplier() } />
            <Modal className="Normal_modal" size="lg" show={visible} onHide={() => setVisible(false)} centered >
                <ModalHeader> 
                    Use Supplier card?
                    <Button onClick={() => setVisible(false)}> Close </Button>
                </ModalHeader>
                <ModalBody>
                    Choose one card to buy it.
                    <div className="p-4">
                    <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >

                    {actualCards.map((card)=> {

                        if(actualCards.length === 0){
                            return(
                                <a> There arent cards to buy</a>
                            )
                        }

                        return(

                            <div key={card.name}>
                                <ListGroup.Item variant="primary"
                                onFocus={(e) => update({ focusedId: e.target.id })}
                                onClick={() => setValorId(card.id)}
                                onBlur={() => update({ focusedId: null })}>
                                    
                                    <img alt="SupplierCard" key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>

                                </ListGroup.Item>

                                <div style={{paddingLeft:'44px'}}>
                                    <Button   id={card.id} onClick={() => handleCompra(card)}> Comprar </Button>
                                </div>

                            </div>
                        )

                        })}

                    </ListGroup>
                            </div>
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal"  show={visible1} onHide={() => setVisible1(false)} centered >
                <ModalHeader> 
                    You dont have enough mints.
                    <Button onClick={() => setVisible1(false)}> Ok </Button>
                </ModalHeader>
            </Modal>
        </div>
        
    );
    
}
export default Supplier;