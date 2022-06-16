import React, { useEffect, useState } from "react";
import Board from "./board";
import Player from "./player";
import Shop from "./shop";
import { useList, useMyPresence, useObject, useOthers, useSelf } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Col, Container, Modal, ModalBody, ModalFooter, Row } from "react-bootstrap";
import { changeTurn } from "../store";
import { Cursor } from "./cursor";




type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
    actions: number;
    first: boolean;
    cursor: {
        x: number,
        y: number
      } | null
  };


function Game(){
    
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
    const others = useOthers();
    const self = useSelf();
    const turnoId = useSelector((state:any)=>state.turnoId);
    const [visible,setVisible] = useState(false);
    const [mypresence,update] = useMyPresence<Presence>();
    const username = useSelector((state:any)=>state.username);
    const mints = useSelector((state:any)=>state.mints);
    
    useEffect(()=>{
        
        update({username:username,mint:mints, cards:[],actions:1,first:false});
        
        
      }, []);

    const {name} = useParams();
    const players = Number(String(name).split("-")[1]);
    const [countdown,setCountdown] = useState(true);
    const playersList = useList(`listPLayer-${name}`);
    const shuffleList = useList(`list-${name}`);
    const turno = useObject(`turno-${name}`,{turn:turnoId});
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
        
    if(shuffleList == null || playersList == null || turno == null || self == null || self.presence == null){
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
    
    const handleChangeTurn = () => {

        update({actions:0});
        shuffleList.delete(0);
        if(shuffleList.length == 0){
            console.log("ole");
            return null;
        }
        turno.set("turn",shuffleList.get(0));
        setTimeout(()=>{setVisible(true);},2000);

    }

    const WhoFirst = () => {
        const TotalIDs = [...IDs];
        const listShuffle = TotalIDs.sort(()=> Math.random() -0.5);
        listShuffle.map((e)=>{
                shuffleList.push(e);
                playersList.push(e);
                
            
            
        });
        turno.set("turn",shuffleList.get(0));
        
       
        setVisible(true);
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
                <Button className="justify-content-end" variant="secondary" hidden={turnoId == self.connectionId ? false : false} style={{width:'50%', height:'50px'}}
                onClick={()=> handleChangeTurn()}
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
          <Modal show={visible} onHide={() => setVisible(false)} centered >
                <ModalBody>
                 its {usernameTurn} turn
                </ModalBody>
                <ModalFooter>
                <Button variant="primary" onClick={() => setVisible(false)} >
                    Ok! 
                </Button>
                </ModalFooter>
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

