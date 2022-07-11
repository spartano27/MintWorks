import React, { useEffect, useState } from "react";
import Board from "./board";
import Player from "./player";
import Shop from "./shop";
import { useList, useMyPresence, useObject, useOthers, useSelf } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Col, Container, ListGroup, Modal, ModalBody, ModalFooter, Row } from "react-bootstrap";
import { Cursor } from "./cursor";
import handleChangeTurn from "../turn";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { CardTypes } from "../types";

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
    const [eleccion,setElegir] = useState(false);
    const username = useSelector((state:any)=>state.username);
    const mints = useSelector((state:any)=>state.mints);
    const cards = useSelector((state:any)=>state.cards);
    const {name} = useParams();
    
    
    useEffect(()=>{
        
        update({username:username,mint:mints, cards:[],stars:0,first: false});
        
      }, []);

    const [mintOnGalley,setMint] = useState(0);
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
        return [0,1];
    }

    const Bridge = () => {
        return [0,0];
    }

    const Coop = () => {
       setElegir(true);
       return [1,1];
    }
    const CoopElegido = (EleccionconnectionId: any) => {
        others.map(({connectionId,presence})=>{
            if(presence == null){
                return null;
            }
            if(connectionId == EleccionconnectionId){
                presence.mint = Number(presence.mint) +1;
                console.log(presence.mint);
            }
        })
        setElegir(false);
        
    }

    const Corporate = () => {
        let retorno = 0;
        mypresence.cards.map((card)=>{
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

    const Landfill = () => {
        let stars = 3;
        mypresence.cards.map((card)=>{
            if(card.active && card.type == CardTypes.culture){
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
        if(lotto.get("occupied") == "true"){
            return [2,2];
        }else{
            return [0,2];
        }
    }

    const Mine = () => {
        return [1,1];
    }

    const Museum = () => {
        let stars = 0;
        mypresence.cards.map((card)=>{
            if(card.active && card.type == CardTypes.culture){

                if(card.name == "Bridge"){
                    stars = stars + 2; 
                } else{
                    stars = stars + 1;
                }
            } 
        });
        
        return [0,stars];
    }

    const Obelisk = () => {
        let stars = 0;
        mypresence.cards.map((card)=>{
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

    const Vault = () => {
        let stars = 1;
        mypresence.cards.map((card)=>{
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
        if(wholesaler.get("occupied") == "true"){
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
            let countStars = 0;
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
                    contador = contador+f()[0];
                    countStars = countStars+f()[1];
                }
                
            });
            update({stars:countStars});
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
                <Player id={self.connectionId} username={mypresence.username} mints={mypresence.mint} cards={mypresence.cards} stars={mypresence.stars} />
                {others.map(({connectionId,presence}: any) => {

                    
                   
                    if(usernameTurn == ""){
                        usernameTurn = turno.get("turn") == connectionId ? presence.username : "";
                    }
                    return(
                        <div>
                            
                            <Player id={connectionId} username={presence.username} mints={presence.mint} cards={presence.cards} stars={presence.stars} />
                            
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
        <Modal size="lg" show={eleccion} onHide={() => setElegir(false)} centered >
                    <ModalHeader> 
                        Co-Op Card
                    </ModalHeader>
                    <ModalBody>
                    Choose a player for Co-op Card effect
                    <div className="p-4">
            
          
            <ListGroup key={"shop"} horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {others.map(({connectionId,presence}:any)=> {
                if (presence == null) {
                    return null;
                }
               
                return(
                    <div>
                     
                    
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

