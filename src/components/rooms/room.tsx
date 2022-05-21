import React, { useEffect, useState } from "react";
import {Button, Form, Modal, Row, ModalFooter,ModalBody, Alert } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useNavigate, useParams } from "react-router-dom";
import {useUpdateMyPresence,useOthers, useMap, useObject, useSelf, useMyPresence} from "@liveblocks/react";
import { Cursor } from "../cursor";
import { useDispatch, useSelector } from "react-redux";
import { LiveObject } from "@liveblocks/client";


type Presence = {
    focusedId: string | null;
    username: string;
    check: boolean;
    cursor: {
      x: number,
      y: number
    } | null
  };

  type Logo = {
    check: boolean;
  };

function Room(){
  
    const {name} = useParams();
    const players = Number(String(name).split("-")[1]);
  
    const navigate = useNavigate();
    const username = useSelector((state:any)=>state.username);
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
    const others = useOthers();
   
    const [visible,setVisible] = useState(false);
    const [mypresence,update] = useMyPresence<Presence>();

    useEffect(()=>{
      update({username:username});
      update({check:false});
    }, []);

    const data = useObject<Logo>("logo", {
      check: false,
    });

    if (!data) {
      
      return (
        <div>
          <div>
            <img src="https://liveblocks.io/loading.svg" alt="Loading" />
          </div>
        </div>
      );
    }
    const handleOnChange = (check: boolean | undefined) => {
      update({check: !check});
      

    }
    const handleOn = (event: React.PointerEvent<HTMLDivElement>) => {
      update({
        cursor: {
          x: Math.round(event.clientX),
          y: Math.round(event.clientY) 
        }
      })

      const lista = (others.toArray().every(({presence})=>{
        if(presence == null){
          return null;
        }else{
          return presence.check;
        }
        
        

      }));
      if(others.count+1 == players){
        if (mypresence.check && lista){
          setVisible(true);
        }
      }
      
    }
    

        return(

              <div
              
              onPointerMove={(event) => {
                  handleOn(event);
                }}
                onPointerLeave={(event) => {
                  update({cursor: null});
                }}>
                    <h1 className="text-center p-4"> Lobby Room</h1>
                    <h2 className="text-center p-4"> Number of players in the room: {others.count+1}/{players}  </h2>
              
                    <Row className="d-flex justify-content-center p-4">

                      <div>
                        {mypresence.username}
                        <Form>
                          <Form.Check
                                  className="p-4"
                                  key={"first"}
                                  onFocus={(e) => update({ focusedId: e.target.id })}
                                  onBlur={() => update({ focusedId: null })}
                                  onChange={() => handleOnChange(mypresence.check)}
                                  
                                  
                                  id = "Ready?"
                                  label = "Are you ready?"
                          
                                  />
                        </Form>
                      </div>
                      </Row>
                      
                      <Row className="d-flex justify-content-center">

                      
                      {
                      /*Iterate over other users and display a cursor on their presence */
                        others.map(({connectionId, presence}:any) => {
                          if (presence == null) {
                            return null;
                        }
    
                      return(
                        <div className="p-4">
                        {presence.username}
                        <Form>
                          <Form.Check
                              className="p-4"
                              type = {'checkbox'}
                              key={`switch-${connectionId}`}
                              onFocus={(e) => update({ focusedId: e.target.id })}
                              onBlur={() => update({ focusedId: null })}
                              onChange = {() => handleOnChange(presence.check)}
                              disabled
                              style={{outline:'1px solid black',backgroundColor: `rgb(${
                                COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]
                            }`}}
                              checked = {presence.check}
                              color = {`rgb(${
                                COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]
                                }`}
                              id = {`switch-${connectionId}`}
                              label = "Are you ready?"                        
                              />
                        </Form>
                      </div>
                        )
                      })
                      }
                    </Row>
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

                    <Modal show={visible} onHide={() => setVisible(false)} centered >
                      <ModalBody>
                      
                      <Alert className="mx-auto" variant="primary">Go to the Game! </Alert>
                      </ModalBody>
                      <ModalFooter>
                      <Button variant="primary" onClick={() => navigate(`/Game/${name}`)} >
                          Play! 
                      </Button>
                      </ModalFooter>
                    </Modal>
                  
                </div>
                    
        );          
          
    
}

export default Room;

