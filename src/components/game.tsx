import React, { useEffect, useState } from "react";
import Board from "./board";
import Player from "./player";
import Shop from "./shop";
import { useList, useMyPresence, useOthers, useSelf } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Col, Container, Modal, ModalBody, ModalFooter, Row } from "react-bootstrap";
import { changeTurn } from "../store";



type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
  };


function Game(){
    const others = useOthers();
    const self = useSelf();
    const turnoId = useSelector((state:any)=>state.turnoId);
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const [mypresence,update] = useMyPresence<Presence>();
    const username = useSelector((state:any)=>state.username);
    const mints = useSelector((state:any)=>state.mints);
    useEffect(()=>{
        
        update({username:username,mint:mints, cards:[]});
        
        
      }, []);

    const {name} = useParams();
    const players = Number(String(name).split("-")[1]);
    const [countdown,setCountdown] = useState(true);
    const shuffleList = useList(`list-${name}`);
    
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
        
    
    /* A function that is called when the game starts. It is used to determine who goes first. */
   

    
    if(self == null){
        return null;
    }

    const WhoFirst = () => {
        const TotalIDs = [self.connectionId,...IDs];
        
        if(shuffleList == null){
            return null;
        }
        const listShuffle = TotalIDs.sort(()=> Math.random() -0.5);
        listShuffle.map((e)=>{
            shuffleList.push(e);
        });
        dispatch(changeTurn(shuffleList.get(0)));
        console.log(shuffleList.get(0));
        setVisible(true);
    }
    let usernameTurn = turnoId == self.connectionId ? mypresence.username : "";
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
                        WhoFirst()
                        setCountdown(false);

                    }}
                    

                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
           </div>
      
       )
   }
   
    return (
        <div>

       
        <Container style={{width: '100%'}}>
            <Row className="mb-8">
                <Col className="p-2 d-flex justify-content-start">
                    
                    <Shop players={players}/>
                    
                    
                    <Board players={players}/>

                
                </Col>
            </Row>
            <Row style={{marginTop:'100px'}} className="p-2 d-flex align-content-end" >
                <Player id={self.connectionId} username={mypresence.username} mints={mypresence.mint} />
                {others.map(({connectionId,presence}: any) => {
                    if(presence == null){
                        return null;
                    }
                    if(usernameTurn == ""){
                        usernameTurn = turnoId == connectionId ? presence.username : "";
                    }
                    return(
                        <div>
                            <Player id={connectionId} username={presence.username} mints={presence.mint} />
                            
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
        </div>
        
    )
}

export default Game;

