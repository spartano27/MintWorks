import React, { useEffect, useState } from "react";
import Board from "./board";
import Player from "./player";
import Shop from "./shop";
import { useList, useMyPresence, useObject, useOthers, useSelf } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Col, Container, Modal, ModalBody, ModalFooter, Row } from "react-bootstrap";
import { Cursor } from "./cursor";
import handleChangeTurn from "../turn";

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

  function Shuffle(array: any[]){
    const arrayForSort = [...array];
    for (var i = arrayForSort.length -1; i > 0; i--){
        var j = Math.floor(Math.random()* (i-1));
        var temp = arrayForSort[i];
        arrayForSort[i] = arrayForSort[j];
        arrayForSort[j] = temp;
    }
    return arrayForSort;
} 

function Game(){
    
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
    const others = useOthers();
    const self = useSelf();
    const turnoId = useSelector((state:any)=>state.turnoId);
    const [mypresence,update] = useMyPresence<Presence>();
    const [carga,setCarga] = useState(true);
    const username = useSelector((state:any)=>state.username);
    const mints = useSelector((state:any)=>state.mints);
    const cards = useSelector((state:any)=>state.cards);
    const {name} = useParams();
    
    
    useEffect(()=>{
        
        update({username:username,mint:mints, cards:[],stars:0,first: false});
        
      }, []);

    
    const players = Number(String(name).split("-")[1]);
    const [countdown,setCountdown] = useState(true);
    const playersList = useList(`listPLayer-${name}`);
    const shuffleList = useList(`list-${name}`);
    const shopCards = useList(`InitialShop-${name}`);
    const actualCards = useList(`ActualCards-${name}`);
    const turno = useObject(`turno-${name}`,{firstTurn:turnoId, turn:turnoId, visible:turnoId, nuevaRonda: turnoId});
    const leader = useObject(`leader-${name}`,{img: "leader.png",occupied: turnoId});
    const producer = useObject(`producer-${name}`,{img: players == 4 || players == 1 ? "producer.png" : "producer1.png",occupied: 1});
    const builder = useObject(`builder-${name}`,{img: players < 4 ? "builder1.png" : "builder.png",occupied: 1});
    const supplier = useObject(`supplier-${name}`,{img: players < 4 ? "supplier1.png" : "supplier.png",occupied: 1});
    const wholesaler = useObject(`wholesaler-${name}`,{img: "wholesaler1.png",occupied: "true"});
    const lotto = useObject(`lotto-${name}`,{img: "lotto1.png",occupied: "true"});
    let Mentas: number[] = []
    let Users: string[] = []
    let IDs: number[] = []
    const [map,setMap] = useState(
        others.map(({connectionId,presence}) => {
            if(presence == null){
                return null;
            }
            
             Mentas.push(Number(presence.mint));
             Users.push(String(presence.username));
             IDs.push(Number(connectionId))
            
        }));
    
    const Assembler = () => {

    }

    const Bridge = () => {
        
    }

    const Coop = () => {
       
    }

    const Corporate = () => {
        
    }

    const Crane = () => {
        
    }

    const Factory = () => {
        return 1;
    }

    const Gallery = () => {
   
    }

    const Landfill = () => {
     
    
    }

    const Lotto = () => {
        if (lotto == null){
            return 0;
        }
        if(lotto.get("occupied") == "true"){
            return 2;
        }else{
            return 0;
        }
    }

    const Mine = () => {
        return 1;
    }

    const Museum = () => {
        
    }

    const Obelisk = () => {
        
    }

    const Plant = () => {
        return 2;
    }

    const Stripmine = () => {
        return 3;
    }

    const Truck = () => {
        
    }

    const Vault = () => {
        
    }

    const Wholesaler = () => {
        if (wholesaler == null){
            return 0;
        }
        if(wholesaler.get("occupied") == "true"){
            return 1;
        }else{
            return 0;
        }
      
    }

    const Workshop = () => {
        return 1;
    }




    const initialiceShop = () => {
        if(shopCards == null || actualCards == null){
            return null;
        }
        Shuffle(cards).map((e)=>{
            if(shopCards.length < 21){
                shopCards.push(e);
                if(actualCards.length < 3){
                    actualCards.push(e);
                }
            }
            
            
            
        });

    }

    if(lotto == null || wholesaler == null || actualCards == null || shopCards == null || shuffleList == null || playersList == null || turno == null || self == null || self.presence == null
        || leader ==null || builder == null || supplier == null || producer == null){
        initialiceShop();
        return null;
    }
    let usernameTurn = turno.get("turn") == self.connectionId ? mypresence.username : "";

    const handleOn = (event: React.PointerEvent<HTMLDivElement>) => {
        update({
            cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY) 
            }
        })
    }
    
  
    const MintsForAll = () => {
        turno.set("firstTurn",false);
        if(turno.get("nuevaRonda")){
            if (mypresence.first){
                update({first:false});
                const firstItem = self.connectionId;
                const lista = shuffleList.toArray().sort((x,y)=>{ return x === firstItem ? -1 : y === firstItem ? 1 : 0; });
                shuffleList.clear();
                lista.map((e)=>{
                    shuffleList.push(e);
                });

                turno.set("turn",shuffleList.get(0));
            }

            

            leader.set("img","leader.png");
            leader.set("occupied",false);
            producer.set("img",players == 4 || players == 1 ? "producer.png" : "producer1.png");
            producer.set("occupied",1);
            builder.set("img", players < 4 ? "builder1.png" : "builder.png");
            builder.set("occupied",1);
            supplier.set("img",players < 4 ? "supplier1.png" : "supplier.png");
            supplier.set("occupied",1);
            let contador = 0;
            mypresence.cards.map((card:any) => {
                
                if(card.active){
                    if(card.name == "Wholesaler"){
                        if(wholesaler.get("occupied") == "true"){
                            contador = contador + 1;
                        }
                        wholesaler.set("img", "wholesaler.png");
                        wholesaler.set("occupied", "false");
                    }
                    if(card.name == "Lotto"){
                        if(lotto.get("occupied") == "true"){
                            contador = contador + 2;
                        }
                        lotto.set("img", "lotto.png");
                        lotto.set("occupied", "false");
                    }
                    var f = eval(card.name);
                    contador = contador+f();
                }
                
            });

            update({mint: mypresence.mint+30+contador});
        }

    }

    const WhoFirst = () => {
        const TotalIDs = [...IDs];
        const listShuffle = TotalIDs.sort(()=> Math.random() -0.5);
        listShuffle.map((e)=>{
                shuffleList.push(e);
                playersList.push(e);
                
            
            
        });
        turno.set("firstTurn",true);
        turno.set("nuevaRonda",false);
        turno.set("turn",shuffleList.get(0));
        turno.set("visible",true);
        setTimeout(()=>{ turno.set("visible",false);},2000);
        
    }
    
   if(others.count +1 < players){
       return (
           <h1> waiting </h1>
       )
   }

   if(countdown){
       return(
           <div>
               <h1>The game will start:</h1>
                <CountdownCircleTimer
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
          onPointerLeave={(event) => {
            update({cursor: null});
          }}>

       
        <Container style={{width: '100%'}}>
            <Row className="mb-8">
            
                <Col className="p-2 d-flex justify-content-start">
                    
                    <Shop players={players}/>
                    
                    
                    <Board players={players}/>

                
                </Col>
                <Button className="justify-content-end" variant="secondary" hidden={turno.get("turn") == self.connectionId ? false : false} style={{width:'50%', height:'50px'}}
                onClick={()=> handleChangeTurn(actualCards,shopCards,playersList,shuffleList,turno)}
                > Pass </Button> 
            </Row>
            <Row style={{marginTop:'50px'}} className="p-2 d-flex align-content-end" >
                <Player id={self.connectionId} username={mypresence.username} mints={mypresence.mint} cards={mypresence.cards} />
                {others.map(({connectionId,presence}: any) => {

                    
                   
                    if(usernameTurn == ""){
                        usernameTurn = turno.get("turn") == connectionId ? presence.username : "";
                    }
                    return(
                        <div>
                            
                            <Player id={connectionId} username={presence.username} mints={presence.mint} cards={presence.cards} />
                            
                        </div>
                      
                    )
                })
                }
                
            </Row>
        
            
        </Container>
          <Modal  show={turno.get("visible")} onHide={() => turno.set("visible",false)} centered onExiting={() => MintsForAll()} >
                <ModalBody>
                 its {usernameTurn} turn
                </ModalBody>
            </Modal>
            {
                        /*Iterate over other users and display a cursor on their presence */
                        others.map(({connectionId, presence}:any) => {
                        if (presence == null || presence.cursor == null) {
                            return null;
                        }
                        return (
                            <Cursor
                            key={`cursor-${connectionId}`}
                            color={`rgb(${
                                COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]
                            }`}
                            x={presence.cursor.x}
                            y={presence.cursor.y}
                            name={presence.username}
                            />
                        )
                        })
                      }
        </div>
        
    )
}

export default Game;

