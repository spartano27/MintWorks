import { useObject, useSelf, useMyPresence, useList } from "@liveblocks/react";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button, ListGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
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

function Supplier(){
    
    const {name} = useParams();
    const [valorId,setValorId] = useState("0");
    const supplier = useObject(`supplier-${name}`);
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const playersList = useList(`listPLayer-${name}`);
    const actualCards = useList(`ActualCards-${name}`);
    const shuffleList = useList(`list-${name}`);
    const turno = useObject(`turno-${name}`,{firstTurn: true,turn:0, visible: false, nuevaRonda: false});
    const shopCards = useList(`InitialShop-${name}`);

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    if (actualCards == null || shopCards == null || playersList == null || shuffleList == null || supplier == null || turno == null || self == null) {
        return null;
    }

    const handleClickBuilder = () => {
        if(turno.get("turn") == self.connectionId ){
            if (players < 4){
                if(Number(supplier.get("occupied")) > 2){
                    return;
                }else{
                    setVisible(true)
                }
            }else{
                if(Number(supplier.get("occupied")) > 3){
                    return;
                }else{
                    setVisible(true)
                }
            }
            
        }
        
        
    }
 

    const handleCompra = (card: { id: string; effect:any; value: number; name: Function;}) => {
        
        if(mypresence == null){
            return null;
        }
        if(mypresence.mint >= card.value){
           
            const cardOwner = {id: card.id,name: card.name, effect: card.effect, value: card.value, owner: mypresence.username}
            const totalCards = [...mypresence.cards,cardOwner];
            
            for (var i = 0; i< shopCards.length; i++){
                const carta: any = shopCards.get(i);
                for (const property in carta){
                     if (property == "id"){
                        if(carta[property] == card.id){
                            shopCards.delete(i);
                        }
                     }
                }
                const actualCarta: any = actualCards.get(i);
                for (const property in actualCarta){
                    if (property == "id"){
                       if(actualCarta[property] == card.id){
                        actualCards.delete(i);
                       }
                    }
               }
              
            
            update({cards:totalCards});
            update({mint: mypresence.mint-cardOwner.value});
        }  

        supplier.set("img", players < 4 ? `supplier1Used${supplier.get("occupied")}.png` : `supplierUsed${supplier.get("occupied")}.png`);
        supplier.set("occupied", Number(supplier.get("occupied"))+1);
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno);   
    }

    
}


        return(
            
            <div>
                <img style = {{width:210}} src = {require(`../../images/${supplier.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickBuilder() } />
                <Modal size="lg" show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Supplier card?
                        <Button onClick={() => setVisible(false)}> Close </Button>
                    </ModalHeader>
                    <ModalBody>
                    Choose one card to buy it.
                    <div className="p-4">
            
          
            <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {actualCards.map((card:any)=> {
                
               
                return(
                    <div>
                     
                    
                  <ListGroup.Item variant="primary"
                  onFocus={(e) => update({ focusedId: e.target.id })}
                  onClick={(e) => setValorId(card.id)}
                  onBlur={() => update({ focusedId: null })}>
                      <img key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>
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
            </div>
            
        );
    
}
export default Supplier;