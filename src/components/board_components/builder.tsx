import { useList, useMyPresence, useObject, useSelf } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button, ListGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import handleChangeTurn from "../../turn";

type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
    stars: number;
    first: boolean;
    cursor: {
        x: number,
        y: number
      } | null
  };

function Builder() {
    const {name} = useParams();
    const builder = useObject(`builder-${name}`);
    const self = useSelf();
    const shopCards = useList(`InitialShop-${name}`);
    const actualCards = useList(`ActualCards-${name}`);
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList(`listPLayer-${name}`);
    const wholesaler = useObject(`wholesaler-${name}`);
    const lotto = useObject(`lotto-${name}`);
    const shuffleList = useList(`list-${name}`);
    const turno = useObject(`turno-${name}`,{firstTurn: true,turn:0, visible: false, nuevaRonda: false});

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    if (lotto == null || wholesaler == null || actualCards == null || shopCards == null || playersList == null || shuffleList == null || builder == null || turno == null || self == null) {
        return null;
    }

    const handleClickBuilder = () => {
        if(turno.get("turn") == self.connectionId ){
            if (players < 4){
                if(Number(builder.get("occupied")) > 2){
                    return;
                }else{
                    setVisible(true)
                }
            }else{
                if(Number(builder.get("occupied")) > 3){
                    return;
                }else{
                    setVisible(true)
                }
            }
            
        }
        
        
    }
    const handleBuild = (card: { id: string; effect:any; value: number; name: string; active:boolean; stars: number}) => {
        
        if(mypresence == null){
            return null;
        }
        if(mypresence.mint >= 2){
            const cardOwner = {id: card.id,name: card.name, effect: card.effect, value: card.value, owner: mypresence.username, active: true, stars: card.stars}
            if(card.name === "Wholesaler"){
                wholesaler.set("img", "wholesaler.png");
                wholesaler.set("occupied", "false");
            }
            if(card.name === "Lotto"){
                lotto.set("img", "lotto.png");
                lotto.set("occupied", "false");
            }
            for (var i = 0; i< mypresence.cards.length; i++){
                const carta: any = mypresence.cards[i];
                for (const property in carta){
                     if (property == "id"){
                        if(carta[property] == card.id){
                            mypresence.cards.splice(i,1);
                        }
                     }
                }

        }  
            const totalCards = [...mypresence.cards,cardOwner];
            update({cards:totalCards});
            update({stars:mypresence.stars+card.stars});
            update({mint: mypresence.mint-2});
            builder.set("img", players < 4 ? `builder1Used${builder.get("occupied")}.png` : `builderUsed${builder.get("occupied")}.png`);
            builder.set("occupied", Number(builder.get("occupied"))+1);
            setVisible(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);   
    }

    
}

        return(
            <div>
                <img style = {{width:210}} src = {require(`../../images/${builder.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickBuilder() } />
                <Modal size="lg" show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Buldier card?
                        <Button onClick={() => setVisible(false)}> Close </Button>
                    </ModalHeader>
                    <ModalBody>
                    Choose one of yours cards to build it.
                    <div className="p-4">
            
          
            <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {mypresence.cards.map((card:any)=> {
                
               if(!card.active){
                    return(
                        <div>
                        
                        
                    <ListGroup.Item variant="primary"
                    onFocus={(e) => update({ focusedId: e.target.id })}
                    onBlur={() => update({ focusedId: null })}>
                        <img key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>
                    </ListGroup.Item>
                    <div style={{paddingLeft:'44px'}}>
                    <Button   id={card.id} onClick={() => handleBuild(card)}> Build </Button>
                    </div>
                    </div>
                    )
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