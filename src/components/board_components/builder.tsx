import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, Button, ListGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import handleChangeTurn from "../../turn";
import { CardTypes, Presence } from "../../types";
const playersSet = (state:RootState) => state.playersGeneral;
/* The above code is a React component that is used to build a card. */

function Builder() {

    
    const builder = useObject("builder");
    const self = useSelf();
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    const players = useSelector(playersSet);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList("listPLayer");
    const wholesaler = useObject("wholesaler");
    const lotto = useObject("lotto");
    const shuffleList = useList("listShuffle");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");

    /**
     * DragHandler is a function that takes an object with a property called preventDefault that is a
     * function that takes no arguments and returns nothing.
     * @param e - { preventDefault: () => void; }
     */

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if (lotto == null || wholesaler == null || actualCards == null || shopCards == null || playersList == null || shuffleList == null || builder == null || turno == null || self == null) {
        return null;
    }

    /**
     * If the turn is equal to the connectionId, and the number of players is less than 4, and the
     * number of occupied builders is greater than 2, then return. Otherwise, set the visibility to
     * true.
     * @returns the value of the function.
     */

    const handleClickBuilder = () => {
        if(turno.get("turn") === self.connectionId ){
            if (players < 4){

                if(Number(builder.get("occupied")) > 2){
                    return;
                }

                else{
                    setVisible(true)
                }
            }
            else{

                if(Number(builder.get("occupied")) > 3){
                    return;
                }

                else{
                    setVisible(true)
                }
            }
        }
    }

    /**
     * "If the player has enough money, he can build a card and add it to his neighborhood, and then the turn
     * changes."
     *
     * @param card - { id: string; value: number; name: string; active:boolean; stars: number;
     * type:CardTypes}
     * @returns null.
     */
    
    const handleBuild = (card: { id: string; value: number; name: string; active:boolean; stars: number; type:CardTypes}) => {
        
        let discount = 0;

        if(mypresence == null){
            return null;
        }

        mypresence.cards.forEach((carta)=>{
            if(carta == null){
                return null;
            }
            if(carta.name === "Crane" && carta.active){
                    discount = 1;
            }
        })

        if(mypresence.mint >= 2){
            
            const cardOwner = {id: card.id,name: card.name, value: card.value, active: true, stars: card.stars, type: card.type}
            
            if(card.name === "Wholesaler"){
                wholesaler.set("img", "wholesaler.png");
                wholesaler.set("occupied", false);
            }

            if(card.name === "Lotto"){
                lotto.set("img", "lotto.png");
                lotto.set("occupied", false);
            }

            for (let i = 0; i< mypresence.cards.length; i++){
                const carta = mypresence.cards[i];
                for (const property in carta){
                     if (property === "id"){
                        if(carta[property] === card.id){
                            mypresence.cards.splice(i,1);
                        }
                    }
                }
            }  

            const totalCards = [...mypresence.cards,cardOwner];
            update({cards:totalCards});
            update({stars:mypresence.stars+card.stars});
            update({mint: mypresence.mint-2+discount});
            builder.set("img", players < 4 ? `builder1Used${builder.get("occupied")}.png` : `builderUsed${builder.get("occupied")}.png`);
            builder.set("occupied", Number(builder.get("occupied"))+1);
            setVisible(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);   

        }
    }

    return(

        <div>
            <img alt="builder" style = {{width:210}} src = {require(`../../images/${builder.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickBuilder() } />
            <Modal size="lg" show={visible} onHide={() => setVisible(false)} centered >
                <ModalHeader> 
                    Use Buldier card?
                    <Button onClick={() => setVisible(false)}> Close </Button>
                </ModalHeader>
                <ModalBody>
                    Choose one of yours cards to build it.
                    <div className="p-4">

                        <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                            {mypresence.cards.map((card)=> {
                                if(card == null){
                                    return null;
                                }
                                if(!card.active){

                                    return(

                                        <div key={card.id}>
                                            <ListGroup.Item variant="primary"
                                            onFocus={(e) => update({ focusedId: e.target.id })}
                                            onBlur={() => update({ focusedId: null })}>

                                                <img alt="cardBuilder" key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>

                                            </ListGroup.Item>

                                            <div style={{paddingLeft:'44px'}}>
                                                <Button   id={card.id} onClick={() => handleBuild(card)}> Build </Button>
                                            </div>
                                        </div>
                                    )
                        
                                }
                                else{
                                    return null;
                                }

                            })}
                        </ListGroup>
                    </div>
                </ModalBody>
            </Modal>
        </div>

    );
}

export default Builder;