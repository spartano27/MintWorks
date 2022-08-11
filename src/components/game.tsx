import React, {useEffect, useState} from "react";
import Board from "./board";
import Shop from "./shop";
import {Json, useList, useMyPresence, useObject, useOthers, useSelf} from "@liveblocks/react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {Button, Col, Container, ListGroup, Modal, ModalBody, ModalFooter, Row} from "react-bootstrap";
import {Cursor} from "./cursor";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import {Card, CardTypes, Presence} from "../types";
import {useNavigate} from "react-router-dom";
import {removeRoom, RootState} from "../store";
import {actions} from "@liveblocks/redux";
import Neighborhood from "./neighborhood";

const user = (state:RootState) => state.username;
const rooms = (state:RootState) => state.roomList;
const cardsList = (state:RootState) => state.cards;
const colorP = (state:RootState) => state.color;
const diff = (state:RootState) => state.difficult;
/**
 * It takes an array of objects, and returns a new array of objects, with the same objects, but in a
 * different order.
 * @param {Json[]} array - Json[] - the array of objects you want to shuffle
 * @returns The array is being returned.
 */

function Shuffle(array: Json[]){

    const arrayForSort = [...array];

    for (let i = arrayForSort.length -1; i > 0; i--){
        const j = Math.floor(Math.random()* (i-1));
        const temp = arrayForSort[i];
        arrayForSort[i] = arrayForSort[j];
        arrayForSort[j] = temp;
    }

    return arrayForSort;
} 

/* A game. */

function Game(){
    
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
    const others = useOthers<Presence>();
    const self = useSelf<Presence>();
    const [mypresence,update] = useMyPresence<Presence>();
    const [eleccion,setElegir] = useState(false);
    const color = useSelector(colorP);
    const username = useSelector(user);
    const roomList = useSelector(rooms);
    const difficult = useSelector(diff);
    const cards = useSelector(cardsList);
    const {name} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(
          actions.enterRoom("rooms", {
            roomList: [],
          })
        );
    
        return () => {
          dispatch(actions.leaveRoom("rooms"));
        };
      }, [dispatch]);

    useEffect(()=>{
        
        update({username:username,mint:3, cards:[],stars:0,first: false,color:color});
        
      }, []);

    useEffect(() => {
    
    window.onbeforeunload = function(e) {
        return "Are you sure?";
    };
     
    });

    const [mintOnGalley,setMint] = useState(0);
    const players = Number(String(name).split("-")[1]);
    const roomName = (String(name).split("-")[0]).split("Gl")[1];
    const [countdown,setCountdown] = useState(true);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    const winner = useObject<{ username: string; visible: boolean}>("winner");
    const leader = useObject("leader");
    const producer = useObject("producer");
    const builder = useObject("builder");
    const supplier = useObject("supplier");
    const wholesaler = useObject("wholesaler");
    const listaSortDifficult = useList("advancedCards");
    const listaDifficult = ["crow","temp","recycler","swap"];
    const lotto = useObject("lotto");
    const swap = useObject("swap");
    const recycler = useObject("recycler");
    const temp = useObject("temp");
    const crow = useObject("crow");

    /* eslint-disable @typescript-eslint/no-unused-vars */

    const Assembler = () => {
        return [0,1];
    }

    const Bridge = () => {
        return [0,0];
    }

    const Coop = () => {
       setElegir(true);
       return [1,1];
    }

    /**
     * If the connectionId of the presence object is equal to the connectionId of the player who
     * clicked the button, then add 1 to the mint property of the presence object.
     * @param {number} EleccionconnectionId - number =&gt; The connectionId of the person who was
     * chosen.
     */

    const CoopElegido = (EleccionconnectionId: number) => {
        others.toArray().forEach(({connectionId,presence})=>{
            if(presence == null){
                return null;
            }
            if(connectionId === EleccionconnectionId){
                presence.mint = Number(presence.mint) +1;
            }
        })
        setElegir(false);  
    }
    
    /**
     * If the card is null, return [0,0], otherwise if the card is active, add 1 to retorno, and return
     * [retorno,0].
     * @returns An array with two elements.
     */

    const Corporate = () => {
        let retorno = 0;
        mypresence.cards.forEach((card)=>{
            if(card == null){
                return [0,0];
            }
            if(card.active){
                retorno = retorno + 1;
            }
            
        });
        return [retorno,0];
        
    }

    const Crane = () => {
        return [0,1];
    }

    const Factory = () => {
        return [1,3];
    }

    const Gallery = () => {
        setMint(mintOnGalley+1);
        return [0,mintOnGalley];
    }

    const Gardens = () => {
        return [0,3];
    }

    /**
     * "If the card is active and a culture card, then subtract one from the stars variable."
     * 
     * The function is called Landfill. It's a function that returns an array of two numbers. The first
     * number is always 0. The second number is the number of stars the player has. 
     * 
     * The function starts by setting the stars variable to 3. Then it loops through all the cards in
     * the player's hand. If the card is active and a culture card, then it subtracts one from the
     * stars variable. 
     * 
     * The function returns the array [0,stars].
     * @returns [0,stars]
     */

    const Landfill = () => {
        let stars = 3;
        mypresence.cards.forEach((card)=>{
            if(card == null){
                return [0,0];
            }
            if(card.active && card.type === CardTypes.culture){
                if(card.stars > 0){
                    stars = stars -1;
                }
            } 
        });
        return [0,stars];
    }

    const Lotto = () => {
        if (lotto == null){
            return [0,2];
        }
        if(lotto.get("occupied")){
            return [2,2];
        }else{
            return [0,2];
        }
    }

    const Mine = () => {
        return [1,1];
    }

    /**
     * "If the player has a card called "Bridge" in their hand, they get 2 stars, otherwise they get 1
     * star."
     * The function is called "Museum" because it's a function that calculates the number of stars a
     * player gets from the "Museum" card.
     * @returns an array of two numbers.
     */

    const Museum = () => {
        let stars = 0;
        mypresence.cards.forEach((card)=>{
            if(card == null){
                return [0,0];
            }
            if(card.active && card.type === CardTypes.culture){
                
                if(card.name === "Bridge"){
                    stars = stars + 2; 
                } 
                else{
                    stars = stars + 1;
                }
            }
            if(card.active && card.name === "Landfill"){
                if(stars > 0){
                    stars = stars -1;
                }
            } 
        });
        
        return [0,stars];
    }

    /**
     * If the card is active, add one to the stars variable, otherwise return 0,0.
     * @returns An array of two numbers.
     */

    const Obelisk = () => {
        let stars = 0;
        mypresence.cards.forEach((card)=>{
            if(card == null){
                return [0,0];
            }
            if(card.active){
                stars = stars + 1 ;
            } 
        });
        return [0,stars];
    }

    const Plant = () => {
        return [2,2];
    }

    const Statue = () => {
        return [0,2];
    }

    const Stripmine = () => {
        return [3,0];
    }

    const Truck = () => {
        return [0,1];
    }

    /**
     * "If the card is null, return [0,0]. If the card is not active, add 2 to the stars variable.
     * Otherwise, do nothing."
     * 
     * The function is supposed to return an array of two numbers. The first number is the number of
     * mints, and the second number is the number of stars.
     * @returns An array with two values.
     */
    const Vault = () => {
        let stars = 1;
        mypresence.cards.forEach((card)=>{
            if(card == null){
                return [0,0];
            }
            if(!card.active){
                stars = stars + 2 ;
            } 
        });
        return [0,stars];
    }

    const Wholesaler = () => {
        if (wholesaler == null){
            return [0,1];
        }
        if(wholesaler.get("occupied")){
            return [1,1];
        }else{
            return [0,1];
        }
      
    }

    const Windmill = () => {
        return [0,1];
    }

    const Workshop = () => {
        return [1,2];
    }

    /**
     * If shopCards and actualCards are not null, shuffle the cards array and push the first 21
     * elements into shopCards and the first 3 elements into actualCards.
     * @returns null.
     */

    const initialiceShop = () => {

        if(shopCards == null || actualCards == null){
            return null;
        }

        Shuffle(cards).forEach((e)=>{
            if(shopCards.length < 21){
                shopCards.push(e);
                if(actualCards.length < 3){
                    actualCards.push(e);
                }
            }
        });
    }
    const initialiceDiff = () => {

        Shuffle(listaDifficult).forEach((e)=>{
            
            if(listaSortDifficult == null){
                return null;
            }
            if(listaSortDifficult.length < 2){
                listaSortDifficult.push(e);
            }
        });
    }

    if(winner == null || lotto == null || wholesaler == null || actualCards == null || shopCards == null || shuffleList == null || playersList == null || turno == null || self == null || self.presence == null
        || leader ==null || builder == null || supplier == null || producer == null || swap == null || crow == null || temp == null || recycler == null || listaSortDifficult == null){
        initialiceShop();
        initialiceDiff();
        return null;
    }
    
    let usernameTurn = turno.get("turn") === self.connectionId ? mypresence.username : "";

    /**
     * The function handleOn takes an event of type React.PointerEvent<HTMLDivElement> and returns
     * nothing.
     * @param event - React.PointerEvent<HTMLDivElement>
     */

    const handleOn = (event: React.PointerEvent<HTMLDivElement>) => {
        update({
            cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY) 
            }
        })
    }
    
    /**
     * if turno.get("nuevaRonda") is true then a new round begins and the function MintsForAll do all
     * the stuff necesary when a new round begins.
     */
    const MintsForAll = () => {

        turno.set("firstTurn",false);
        if(turno.get("nuevaRonda")){
           
            if (mypresence.first){
                update({first:false});
                const firstItem = self.connectionId;
                const lista = shuffleList.toArray().sort((x,y)=>{ return x === firstItem ? -1 : y === firstItem ? 1 : 0; });
                shuffleList.clear();

                lista.forEach((e)=>{
                    shuffleList.push(e);
                });
                turno.set("turn",Number(shuffleList.get(0)));
            }

            leader.set("img","leader.png");
            leader.set("occupied",false);
            swap.set("img","swap.png");
            swap.set("occupied",false);
            recycler.set("img","recycler.png");
            recycler.set("occupied",false);
            temp.set("img","temp.png");
            temp.set("occupied",false);
            crow.set("img","crow.png");
            crow.set("occupied",false);
            producer.set("img",players === 4 || players === 1 ? "producer.png" : "producer1.png");
            producer.set("occupied",1);
            builder.set("img", players < 4 ? "builder1.png" : "builder.png");
            builder.set("occupied",1);
            supplier.set("img",players < 4 ? "supplier1.png" : "supplier.png");
            supplier.set("occupied",1);
            let contador = 0;
            let countStars = 0;
            mypresence.cards.forEach((card:Card | undefined) => {
                if(card == null){
                    return null;
                }
                if(card.active){
                    if(card.name === "Wholesaler"){
                        if(wholesaler.get("occupied")){
                            contador = contador + 1;
                        }
                        wholesaler.set("img", "wholesaler.png");
                        wholesaler.set("occupied", false);
                    }
                    if(card.name === "Lotto"){
                        if(lotto.get("occupied")){
                            contador = contador + 2;
                        }
                        lotto.set("img", "lotto.png");
                        lotto.set("occupied", false);
                    }
                    const f = eval(card.name);
                    contador = contador+f()[0];
                    countStars = countStars+f()[1];
                }
            });

            update({stars:countStars});
            update({mint: mypresence.mint+1+contador});

            if(mypresence.stars >= 7 || shopCards.length === 0){
                turno.set("visible",false);
                HandleWinner();
                
                roomList.forEach((room: { name: string | undefined; },index:  number)=>{
                    if(roomName === room.name){
                        dispatch(removeRoom(index));
                    }
                });
            }
        }       
    }

    /**
     * If the value of the variable valorAlto is less than the value of the variable presence, then the
     * value of the variable valorAlto is equal to the value of the variable presence.
     */
    const HandleWinner = () => {
        let valorAlto = [mypresence.stars,mypresence.username,mypresence.cards.length,mypresence.mint];
        others.toArray().forEach(({presence})=>{

            if(presence == null){
                return null;
            }

            if(valorAlto[0] < presence.stars){
                valorAlto = [presence.stars,presence.username,presence.cards.length,presence.mint];
            }
            else if(valorAlto[0] === presence.stars){
                if(valorAlto[2] < presence.cards.length){
                valorAlto = [presence.stars,presence.username,presence.cards.length,presence.mint];
                }
                else if(valorAlto[2] === presence.cards.length){
                    if(valorAlto[3] < presence.mint){
                        valorAlto = [presence.stars,presence.username,presence.cards.length,presence.mint];
                    }
                    else if(valorAlto[3] === presence.cards.length){
                        valorAlto = [presence.stars,"TIE",presence.cards.length,presence.mint];
                    }
                }
            }
        })
        winner.set("username",String(valorAlto[1]));
        winner.set("visible",true);
    }

    const ExitGame = () => {
        console.log("aqui se borra todo y se redirije a una ultima pagina de adios o al inicio");
    }

    /**
     * It takes a list of numbers, shuffles them, and then sets the first number in the list as the
     * first turn.
     */
    const WhoFirst = () => {

        const TotalIDs: number[] = [];

        TotalIDs.push(Number(self.connectionId))
        
        const listShuffle = TotalIDs.sort(()=> Math.random() -0.5);
        listShuffle.forEach((e)=>{
                shuffleList.push(e);
                playersList.push(e);
        });

        turno.set("firstTurn",true);
        turno.set("nuevaRonda",false);
        turno.set("turn",Number(shuffleList.get(0)));
        turno.set("visible",true);
        setTimeout(()=>{ turno.set("visible",false);},2000);
    
    }
    
   if(others.count +1 < players && winner.get("username") === ""){
       return (
           <h1> waiting </h1>
       )
   }

   if(countdown){
       return(
           <div>
               <h1>The game will start:</h1>
                <CountdownCircleTimer
                    key={"inicio"}
                    isPlaying={true}  
                    duration={1}
                    colors={'#43716c'}
                    size={50}
                    onComplete={() => {
                        WhoFirst();
                        setCountdown(false);
                    }}>

                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
           </div>
       )
   }
   
    return (
        <div onPointerMove={(event) => {
            handleOn(event);
          }}
          onPointerLeave={() => {
            update({cursor: null});
          }}>

            <Container style={{width: '100%'}}>
                <Row className="mb-8">
                    <Col className="p-2 d-flex justify-content-start">
                        <Shop players={players}/>
                        <Board diff = {difficult}/>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}} className="p-2 d-flex align-content-end" >
                    <Neighborhood id={self.connectionId} username={mypresence.username} mints={mypresence.mint} cards={mypresence.cards} stars={mypresence.stars} />
                    {others.map(({connectionId,presence}) => {

                        if(presence == null){
                            return null;
                        }
                        if(usernameTurn === ""){
                            usernameTurn = turno.get("turn") === connectionId ? presence.username : "";
                        }
                        return(
                            <div key={connectionId}>
                                <Neighborhood id={connectionId} username={presence.username} mints={presence.mint} cards={presence.cards} stars={presence.stars} />
                            </div>
                        )
                    })}
                </Row>
            </Container>

            <Modal className="Normal_modal" show={turno.get("visible")} onHide={() => turno.set("visible",false)} centered onExiting={() => MintsForAll()} >
                <ModalBody>
                    its {usernameTurn} turn
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={winner.get("visible")} onHide={() => turno.set("visible",false)} backdrop="static" centered onExiting={() => ExitGame()} >
                <ModalBody>
                    {winner.get("username")} Wins !!! 
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => {navigate('/')}}>OK</Button> 
                </ModalFooter>
            </Modal>

            {others.map(({connectionId, presence}) => {
                        if (presence == null || presence.cursor == null) {
                            return null;
                        }
                        return (
                            <Cursor
                            key={`cursor-${connectionId}`}
                            color={`rgb(${
                                COLORS_PRESENCE[presence.color]
                              }`}
                            x={presence.cursor.x}
                            y={presence.cursor.y}
                            name={presence.username}/>
                        )
            })}

            <Modal className="Normal_modal" backdrop="static" size="lg" show={eleccion} onHide={() => setElegir(false)} centered >
                <ModalHeader> 
                    Co-Op Card
                </ModalHeader>
                <ModalBody>
                    Choose a player for Co-op Card effect
                    <div className="p-4">
                        <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}}>

                            {others.map(({connectionId,presence})=> {
                                if (presence == null) {
                                    return null;
                                }
                                return(
                                    <div key={"OtherPlayers"}>
                                        <ListGroup.Item variant="primary"
                                        onFocus={(e) => update({ focusedId: e.target.id })}
                                        onBlur={() => update({ focusedId: null })}>
                                            {presence.username}
                                        </ListGroup.Item>
                                        <div style={{paddingLeft:'44px'}}>
                                            <Button onClick={() => CoopElegido(connectionId)}> Elegir </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </ListGroup>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Game;

