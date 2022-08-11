import React, { useEffect, useState } from "react";
import {Button, Form, Modal, Row, ModalFooter,ModalBody, Alert, ModalHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {useOthers, useObject, useMyPresence, useList} from "@liveblocks/react";
import {Cursor} from "../cursor";
import {useDispatch, useSelector} from "react-redux";
import {Logo, PresenceRoom, Room as RoomType} from "../../types";
import { changeColor, changeRoom, modifyRoom, RootState } from "../../store";
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
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3","25, 164, 7","155, 166, 3","255, 266, 3","125, 266, 32"];
    const others = useOthers<PresenceRoom>();
    const visible = useObject("visible");
    const [mypresence,update] = useMyPresence<PresenceRoom>();
    const [lista,setLista] = useState(roomList);
    const [disable,setDisable] = useState(false);

    useEffect(()=>{
      setLista(roomList);
    },[roomList]);

    useEffect(()=>{
      update({username:username});
      update({check:false});
      update({color: Math.floor(Math.random()* (COLORS_PRESENCE.length-1))})
    
      dispatch(
        actions.enterRoom("rooms", {
          roomList: [],
          room: {}
        })
      );
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

    useEffect(() => {
    
    window.onbeforeunload = function(e) {
        return "Are you sure?";
    };
     
    });
    const data = useObject<Logo>("logo");
    const checkList = useList("check");
    if (!data || checkList == null || visible == null) {
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

    const handleOnChange = (check: boolean) => {
      setDisable(true);
      checkList.push(!check);
      update({check: !check});
      
      if(others.count+1 === players){
        if(others.count +1 === checkList.length){
          if(checkList.every((e)=> e)){
             visible.set("visible",true);
          }
        }
      }
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
    }
  
    const handleOnClick = () => {
      dispatch(changeColor(mypresence.color));
      navigate(`/Game/Gl${name}`);
    }
    
      
    return(

          <div
            onPointerMove={(event) => {
                handleOn(event);
            }}
            onPointerLeave={() => {
              update({cursor: null});
            }} style={{borderWidth:'thin',borderColor:'#bcd0cf',border:"double",borderRadius: '125px',margin: '55px', padding:'70px', textAlign: 'center'}}>

              <h1 className="text-center p-4"> Lobby Room</h1>
              <h2 className="text-center p-4"> Number of players in the room: {others.count+1}/{players}  </h2>
              <Row  className="d-flex justify-content-center p-4">
                <div >
                  {mypresence.username}
                  
                  <Form>
                    <Form.Check
                    disabled={disable}
                    className="p-4"
                    key={"first"}
                    onFocus={(e) => update({ focusedId: e.target.id })}
                    onBlur={() => update({ focusedId: null })}
                    
                            id = "Ready?"
                            label = "Are you ready?"
                    onClick={(e) => handleOnChange(mypresence.check)}
                    style={{outline:'1px solid black',backgroundColor: `rgb(${
                      COLORS_PRESENCE[mypresence.color]
                    }`}}
                    color = {`rgb(${
                      COLORS_PRESENCE[mypresence.color]
                    }`}/>
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
                            onChange = {(e) => handleOnChange(presence.check)}
                            disabled
                            style={{outline:'1px solid black',backgroundColor: `rgb(${
                              COLORS_PRESENCE[presence.color]
                            }`}}
                            checked = {presence.check}
                            color = {`rgb(${
                              COLORS_PRESENCE[presence.color]
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
                        COLORS_PRESENCE[presence.color]
                    }`}
                    x={presence.cursor.x}
                    y={presence.cursor.y}
                    name={presence.username}/>
                  )
                })}

              <Modal className="Normal_modal" show={(visible.get("visible")) == true ? true : false} onHide={() =>  visible.set("visible",false)} backdrop="static" centered >
                <ModalHeader>
                </ModalHeader>
                <ModalBody>
                  <h4 className="mx-auto"> Go to the Game! </h4>
                </ModalBody>
                <ModalFooter>
                  <Button variant="primary" onClick={() => handleOnClick()} >
                    Play! 
                  </Button>
                </ModalFooter>
              </Modal>
          </div>         
    );            
}

export default Room;

