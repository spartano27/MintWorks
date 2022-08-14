import React from 'react';
import { useObject, useSelf, useMyPresence, useList, useOthers } from "@liveblocks/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroup } from "react-bootstrap";
import handleChangeTurn from "../../turn";
import { Card, Presence } from "../../types";
import { LiveObject, LsonObject } from '@liveblocks/client';

function Temp() {

    const keyClock = useObject<{key:number}>("keyClock");
    const temp = useObject("temp");
    const supplier = useObject("supplier");
    const builder = useObject("builder");
    const producer = useObject("producer");
    const wholesaler = useObject("wholesaler");
    const lotto = useObject("lotto");
    const leader = useObject("leader");
    const crow = useObject("crow");
    const swap = useObject("swap");
    const recycler = useObject("recycler");
    const listaSortDifficult = useList("advancedCards");
    const others = useOthers();
    const self = useSelf();
    const players = Number(String(name).split("-")[1]);
    const [mypresence,update] = useMyPresence<Presence>();
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const [visible3,setVisible3] = useState(false);
    const [leaderModal,setLeader] = useState(false);
    const [producerModal,setProducer] = useState(false);
    const [supplierModal,setSupplier] = useState(false);
    const [BuilderModal,setBuilder] = useState(false);
    const [WholesalerModal,setWholesaler] = useState(false);
    const [LottoModal,setLotto] = useState(false);
    const [CrowModal,setCrow] = useState(false);
    const [SwapModal,setSwap] = useState(false);
    const [RecyclerModal,setReycler] = useState(false);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList<Card>("ShopCards");
    const actualCards = useList<Card>("ActualCards");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    const [lista,setLista] = useState([supplier,builder,producer,wholesaler,lotto,leader]);
    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    if ( wholesaler == null || lotto == null || supplier == null || builder == null || producer == null || leader == null || recycler == null || swap == null || crow == null || listaSortDifficult == null || actualCards == null || shopCards == null || playersList == null || shuffleList == null || temp == null || turno == null || self == null) {
        return null;
    }
    
   

    const handleClickTemp = () => {
    
        const prelista = []
        if (players < 4){
            if(Number(supplier.get("occupied")) > 2){
                prelista.push(supplier);
            }
            if(Number(builder.get("occupied")) > 2){
                prelista.push(builder);
            }
        }
        else{

            if(Number(supplier.get("occupied")) > 3){
                prelista.push(supplier);
            }
            if(Number(builder.get("occupied")) > 3){
                prelista.push(builder);
            }
            
        }

        if (players === 2 || players === 3){

            if(Number(producer.get("occupied")) > 2){
                prelista.push(producer);
            }
        }else{
            if(Number(producer.get("occupied")) > 3){
                prelista.push(producer);
            }
        }

        if(leader.get("occupied")){
            prelista.push(leader);
        }

        if((wholesaler.get("occupied")) && wholesaler.get("img") === "wholesalerUsed.png"){
            prelista.push(wholesaler);
        }

        if((lotto.get("occupied")) && lotto.get("img") === "lottoUsed.png"){
            prelista.push(lotto);
        }

        if(listaSortDifficult.get(0) == "crow"){
            if(crow.get("occupied")){
                prelista.push(crow);
            }
            
        }
        if(listaSortDifficult.get(0) == "swap"){
            if(swap.get("occupied")){
                prelista.push(swap);
            }
        }
        if(listaSortDifficult.get(0) == "recycler"){
            if(recycler.get("occupied")){
                prelista.push(recycler);
            }
        }
        
        if(listaSortDifficult.get(1) == "crow"){
            if(crow.get("occupied")){
                prelista.push(crow);
            }
        }
        if(listaSortDifficult.get(1) == "swap"){
            if(swap.get("occupied")){
                prelista.push(swap);
            }
        }
        if(listaSortDifficult.get(1) == "recycler"){
            if(recycler.get("occupied")){
                prelista.push(recycler);
            }
            
        }
        setLista(prelista);
        
        if(turno.get("turn") === self.connectionId ){

            if(temp.get("occupied")){
                return;
            }
            else{
                setVisible(true)
            }
        } 
    }

    const handleClick = (item: LiveObject<LsonObject>) => {
        
        setVisible(false);
        if(item.get("img") === "leaderUsed.png"){
            setLeader(true);
        }
        if(item.get("img") === "producerUsed3.png" || item.get("img") === "producer1Used2.png" ){
            setProducer(true);
        }
        if(item.get("img") === "supplierUsed3.png" || item.get("img") === "supplier1Used2.png" ){
            setProducer(true);
        }
        if(item.get("img") === "builderUsed3.png" || item.get("img") === "builder1Used2.png" ){
            setBuilder(true);
        }
        if(item.get("img") === "wholesalerUsed.png"){
            setWholesaler(true);
        }
        if(item.get("img") === "lottoUsed.png"){
            setLotto(true);
        }
        if(item.get("img") === "crowUsed.png"){
            setCrow(true);
        }
        if(item.get("img") === "swapUsed.png"){
            setSwap(true);
        }
        if(item.get("img") === "recyclerUsed.png"){
            setReycler(true);
        }
    }

    const handleClickLeader = () => {
        temp.set("img", "tempUsed.png");
        temp.set("occupied", true);
        update({first:true});
        update({mint:mypresence.mint-1});
        setLeader(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

    const handleClickProducer = () => {
        
        temp.set("img", "tempUsed.png");
        temp.set("occupied", true);
        update({mint:Number(mypresence.mint)+1});
        setProducer(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

    const handleClickSupplier = (card: Card) => {
        
       
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

            temp.set("img", "tempUsed.png");
            temp.set("occupied", true);
            setSupplier(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);   
    
        }else{
            setVisible1(true);
        }
    }

    const handlerClickBuilder = (card:Card) =>{
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
            temp.set("img", "tempUsed.png");
            temp.set("occupied", true);
            setBuilder(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);   
            
        }else{
            setVisible1(true);
        }
    }

    const handleClickWholesaler = () => {
        
        temp.set("img", "tempUsed.png");
        temp.set("occupied", true);
        update({mint:Number(mypresence.mint)+1});
        setVisible(false);
        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

    const handleClickLotto = () => {
        
       
        if(shopCards == null || mypresence == null){
            return null;
        }

        if(mypresence.mint >= 3){
            
                if(actualCards.length === 3){
                    
                    if (shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && shopCards.get(2) !== undefined && shopCards.get(3) !== undefined){
                        temp.set("img", "tempUsed.png");
                        temp.set("occupied", true);
                        const cartaLista = shopCards.get(3);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(3);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
                       
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                        
                        setLotto(false);
                        setVisible3(true);
                        
                    }
                    
                    else{
                        setLotto(false);
                        setVisible2(true);
                    }
                }
               
                if(shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && actualCards.length === 2){
                    
                    if (shopCards.get(2) !== undefined){
                        temp.set("img", "tempUsed.png");
                        temp.set("occupied", true);
                        const cartaLista = shopCards.get(2);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(2);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                        setLotto(false);
                        setVisible3(true);
                        
                    }
                    
                    else{
                        setLotto(false);
                        setVisible2(true);
                    }
                }
                if(shopCards.get(0) !== undefined && actualCards.length === 1){
                    
                    if (shopCards.get(1) !== undefined){

                        temp.set("img", "tempUsed.png");
                        temp.set("occupied", true);
                        const cartaLista = shopCards.get(1);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(1);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                        setLotto(false);
                        setVisible3(true);
                        
                    }
                    
                    else{
                        setLotto(false);
                        setVisible2(true);
                    }
                }

                if(actualCards.length === 0){
                    
                    if (shopCards.get(0) !== undefined){
                        temp.set("img", "tempUsed.png");
                        temp.set("occupied", true);
                        const cartaLista = shopCards.get(0);
                        const totalCards = [...mypresence.cards,cartaLista];
                        shopCards.delete(0);
                        update({cards:totalCards});
                        update({mint:Number(mypresence.mint)-3});
                        handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                        setLotto(false);
                        setVisible3(true);
                        
                    }else{
                        setLotto(false);
                        setVisible2(true);
                    }
                }
        }else{
            setVisible1(true);
        }
    }

    const handleClickCrow = () => {
        
        temp.set("img", "tempUsed.png");
        temp.set("occupied", true);
        update({mint:Number(mypresence.mint)+2});
            others.map(({presence})=>{
                if(presence == null){
                    return null;
                }
                presence.mint = Number(presence.mint) + 1
            })
            setCrow(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

    const handleClickSwap = (index: number) => {
        
      
        if(shopCards == null || mypresence == null){
            return null;
        }

        if(mypresence.mint >= 2){

            if(actualCards.length === 3){
                    
                if (shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && shopCards.get(2) !== undefined && shopCards.get(3) !== undefined){
                    temp.set("img", "tempUsed.png");
                    temp.set("occupied", true);
                    const cartaLista = shopCards.get(3);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(3);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                   
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    
                    setSwap(false);
                    setVisible3(true);
                    
                }
                
                else{
                    setSwap(false);
                    setVisible2(true);
                }
            }
           
            if(shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && actualCards.length === 2){
                
                if (shopCards.get(2) !== undefined){
                    temp.set("img", "tempUsed.png");
                    temp.set("occupied", true);
                    const cartaLista = shopCards.get(2);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(2);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    setSwap(false);
                    setVisible3(true);
                    
                }
                
                else{
                    setSwap(false);
                    setVisible2(true);
                }
            }
            if(shopCards.get(0) !== undefined && actualCards.length === 1){
                
                if (shopCards.get(1) !== undefined){

                    temp.set("img", "tempUsed.png");
                    temp.set("occupied", true);
                    const cartaLista = shopCards.get(1);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(1);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    setSwap(false);
                    setVisible3(true);
                    
                }
                
                else{
                    setSwap(false);
                    setVisible2(true);
                }
            }

            if(actualCards.length === 0){
                
                if (shopCards.get(0) !== undefined){
                    temp.set("img", "tempUsed.png");
                    temp.set("occupied", true);
                    const cartaLista = shopCards.get(0);
                    const nuevaCards = mypresence.cards.slice();
                    nuevaCards.splice(index,1);
                    const totalCards = [...nuevaCards,cartaLista];
                    shopCards.delete(0);
                    update({cards:totalCards});
                    update({mint:Number(mypresence.mint)-2});
                    handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
                    setVisible(false);
                    setVisible3(true);
                    
                }else{
                    setSwap(false);
                    setVisible2(true);
                }
            }

            
            setSwap(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
        }else{
            setVisible1(true);
        }
    }

    const handleClickRecycler = (card: Card | undefined,index: number) => {
        
        if (card == null){
            return null;
        }
            const cost = card.value + card.stars;
            const nuevaCards = mypresence.cards.slice();
            nuevaCards.splice(index,1);
            update({cards:nuevaCards});
            update({mint:Number(mypresence.mint)+cost});
            temp.set("img", "tempUsed.png");
            temp.set("occupied", true);
    
            setVisible(false);
            handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno,keyClock);
    }

        return(

            <div >
                <img alt="Temp" style = {temp.get("occupied") ? {width:210} : {width:210,borderColor:'#eaa856',borderWidth:'5px',borderStyle:'solid'}} src = {require(`../../images/${temp.get("img")}`)} onDragStart={(e) => DragHandler(e)} onClick={()=> handleClickTemp() } />
                <Modal className="Normal_modal" size="lg" show={visible} onHide={() => setVisible(false)} centered >
                    <ModalHeader> 
                        Use Temp Agency card?
                    </ModalHeader>
                    <ModalBody>
                        choose an occupied location space to use.
                        <ListGroup key={"swap"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                        {lista.length === 0 ? "there arent occupied location space" : ""}
                        {lista.map((item,index)=> {
                            if(item == null){
                                return null;
                            }
                            return(
                                <div key={index}>
                                    <ListGroup.Item variant="primary">
                                        <img alt="Cardswap" key={`temp-${item.get("img")}`} src = {require(`../../images/${item.get("img")}`)} style={{padding:'0px'}}/>
                                    </ListGroup.Item>
                                    <div style={{paddingLeft:'44px'}}>
                                        <Button className='d-block mx-auto'   id={`tempButton-${item.get("img")}`} onClick={() => handleClick(item)}> Use </Button>
                                    </div>
                                </div>
                            )
                    })}
                        </ListGroup>
                    </ModalBody>
                </Modal>

                <Modal className="Normal_modal"  show={leaderModal} onHide={() => setLeader(false)} centered >
                    <ModalHeader> 
                        Use leaderShip card?
                    </ModalHeader>
                    <ModalBody>
                        You will gain 1 mint and the starting player token, which will make you be the first player on the next round.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleClickLeader()}> Yes</Button>
                        <Button onClick={() => setLeader(false)}> No </Button>
                    </ModalFooter>
                </Modal>

                <Modal className="Normal_modal" show={producerModal} onHide={() => setProducer(false)} centered >
                <ModalHeader> 
                    Use Producer card?
                </ModalHeader>
                <ModalBody>
                    You will get 2 mints.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>handleClickProducer()}> Yes</Button>
                    <Button onClick={() => setProducer(false)}> No </Button>
                </ModalFooter>
            </Modal>

            <Modal className="Normal_modal" size="lg" show={supplierModal} onHide={() => setSupplier(false)} centered >
                <ModalHeader> 
                    Use Supplier card?
                    <Button onClick={() => setSupplier(false)}> Close </Button>
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
                                onBlur={() => update({ focusedId: null })}>
                                    
                                    <img alt="SupplierCard" key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>

                                </ListGroup.Item>

                                <div style={{paddingLeft:'44px'}}>
                                    <Button   id={card.id} onClick={() => handleClickSupplier(card)}> Comprar </Button>
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

            <Modal className="Normal_modal" size="lg" show={BuilderModal} onHide={() => setBuilder(false)} centered >
                <ModalHeader> 
                    Use Buldier card?
                    <Button onClick={() => setBuilder(false)}> Close </Button>
                </ModalHeader>
                <ModalBody>
                    Choose one of yours cards to build it.
                    <div className="p-4">

                        <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
                            {mypresence.cards.length === 0 ? "You dont have any card on your neighborhood" : ""}
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
                                                <Button   id={card.id} onClick={() => handlerClickBuilder(card)}> Build </Button>
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

            <Modal className="Normal_modal"  show={WholesalerModal} onHide={() => setWholesaler(false)} centered >
                <ModalHeader> 
                    Use Wholesoler card?
                </ModalHeader>
                <ModalBody>
                    You will gain 2 mint.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>handleClickWholesaler()}> Yes</Button>
                    <Button onClick={() => setWholesaler(false)}> No </Button>
                </ModalFooter>
            </Modal>

            <Modal className="Normal_modal"  show={LottoModal} onHide={() => setLotto(false)} centered >
                <ModalHeader> 
                    Use lotto card?
                </ModalHeader>
                <ModalBody>
                You will gain the top Plan from the Plan Deck.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>handleClickLotto()}> Yes</Button>
                    <Button onClick={() => setLotto(false)}> No </Button>
                </ModalFooter>
            </Modal>

            <Modal className="Normal_modal"   show={visible2} onHide={() => setVisible2(false)} centered >
                <ModalHeader> 
                    There isnt enough Plan on the Plan Deck.
                    <Button onClick={() => setVisible1(false)}> Ok </Button>
                </ModalHeader>
            </Modal>

            <Modal className="Normal_modal"  show={visible3} onHide={() => setVisible3(false)} centered >
                <ModalHeader> 
                    You get:
                    <Button onClick={() => setVisible3(false)}> Ok </Button>
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

            <Modal className="Normal_modal" show={CrowModal} onHide={() => setCrow(false)} centered >
                    <ModalHeader> 
                        Use Crowdfunder card?
                    </ModalHeader>
                    <ModalBody>
                        You will get 3 mints and each players will get 1 mint.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleClickCrow()}> Yes</Button>
                        <Button onClick={() => setCrow(false)}> No </Button>
                    </ModalFooter>
                </Modal>

                <Modal className="Normal_modal" show={SwapModal} onHide={() => setSwap(false)} centered >
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

                                if(mypresence.cards.length === 0){
                                    return (
                                        <a> You dont have any card </a>
                                    )
                                }
                                    return(

                                        <div key={card.id}>
                                            <ListGroup.Item variant="primary"
                                            onFocus={(e) => update({ focusedId: e.target.id })}
                                            onBlur={() => update({ focusedId: null })}>

                                                <img alt="CardSwap" key={`shop-${card.id}`} src = {require(`../../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>

                                            </ListGroup.Item>

                                            <div style={{paddingLeft:'44px'}}>
                                                <Button   id={card.id} onClick={() => handleClickSwap(index)}> Choose </Button>
                                            </div>
                                        </div>
                                    )
                            })}
                        </ListGroup>
                    </div>
                    </ModalBody>
                   
                </Modal>

                <Modal className="Normal_modal" show={RecyclerModal} onHide={() => setReycler(false)} centered >
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
                                                <Button   id={card.id} onClick={() => handleClickRecycler(card,index)}> Choose </Button>
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

export default Temp;