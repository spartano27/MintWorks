import React, { useEffect, useState } from "react";
import {Button, Form, Modal, Row, ModalFooter,ModalBody, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {useOthers, useObject, useMyPresence} from "@liveblocks/react";
import {Cursor} from "../cursor";
import {useDispatch, useSelector} from "react-redux";
import {Logo, PresenceRoom} from "../../types";
import { changeRoom, modifyRoom, RootState } from "../../store";
import { actions } from "@liveblocks/redux";

const user = (state:RootState) => state.username;
const thisRoom = (state:RootState) => state.room;
const rooms = (state:RootState) => state.roomList;
/* A function that is used to create a room. */
function Room(){

    const {name} = useParams();
    const dispatch = useDispatch();
    const players = Number(String(name).split("-")[1]);
    const navigate = useNavigate();
    const username = useSelector(user);
    const roomList = useSelector(rooms);
    const room = useSelector(thisRoom);
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
    const others = useOthers<PresenceRoom>();
    const [visible,setVisible] = useState(false);
    const [mypresence,update] = useMyPresence<PresenceRoom>();
    useEffect(()=>{
      update({username:username});
      update({check:false});
      dispatch(
        actions.enterRoom("rooms", {
          roomList: [],
          room: {}
        })
      );
      console
      return () => {
      
        roomList.forEach((r,index) => {
          if(r.name == room.name){
              r.users.forEach((user,i)=>{
                if(username == user){
                  const newRoomUsers = room.users.slice();
                  newRoomUsers.splice(i,1);
                  const newRoom = {author: room.author,publico: room.publico, password: room.password,difficult: room.difficult,name: room.name,users:newRoomUsers,players:room.players}
                  dispatch(modifyRoom([index,newRoom]));
                  dispatch(changeRoom(newRoom));
                }
              });
          }
        });

        dispatch(actions.leaveRoom("rooms"));
      };
    }, [dispatch]);
    
    const data = useObject<Logo>("logo");
  
    if (!data) {
      return (
        <div>
          <div>
            <img src="https://liveblocks.io/loading.svg" alt="Loading" />
          </div>
        </div>
      );
    }

    /**
     * The function takes a boolean or undefined and returns a function that takes an object and
     * returns a function that takes an object and returns undefined.
     * @param {boolean | undefined} check - boolean | undefined
     */

    const handleOnChange = (check: boolean | undefined,e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      update({check: !check});
    }

   /**
    * I'm trying to check if all the players are present in the room, if they are, then I want to set
    * the visibility of a div to true
    * @param event - React.PointerEvent<HTMLDivElement>
    */
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
        }
        else{
          return presence.check;
        }
      }));

      if(others.count + 1 === players){
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
            onPointerLeave={() => {
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
                    onChange={(e) => handleOnChange(mypresence.check,e)}
                            id = "Ready?"
                            label = "Are you ready?"/>
                  </Form>
                </div>
              </Row>
              <Row className="d-flex justify-content-center">
                {others.map(({connectionId, presence}) => {
                    if (presence == null) {
                      return null;
                    }

                    return(

                      <div key={connectionId} className="p-4">
                        {presence.username}
                        <Form>
                          <Form.Check
                            className="p-4"
                            type = {'checkbox'}
                            key={`switch-${connectionId}`}
                            onFocus={(e) => update({ focusedId: e.target.id })}
                            onBlur={() => update({ focusedId: null })}
                            onChange = {(e) => handleOnChange(presence.check,e)}
                            disabled
                            style={{outline:'1px solid black',backgroundColor: `rgb(${
                              COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]
                            }`}}
                            checked = {presence.check}
                            color = {`rgb(${
                              COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]
                            }`}
                            id = {`switch-${connectionId}`}
                            label = "Are you ready?"/>
                        </Form>
                      </div>
                    )
                })}
              </Row>
                {others.map(({connectionId, presence}) => {

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
                    name={presence.username}/>
                  )
                })}

              <Modal show={visible} onHide={() => setVisible(false)} backdrop="static" centered >
                <ModalBody>
                  <Alert className="mx-auto" variant="primary">Go to the Game! </Alert>
                </ModalBody>
                <ModalFooter>
                  <Button variant="primary" onClick={() => navigate(`/Game/Gl${name}`)} >
                    Play! 
                  </Button>
                </ModalFooter>
              </Modal>
          </div>         
    );            
}

export default Room;

