import { actions } from "@liveblocks/redux";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRooms } from "../../store";

interface ICreateRoomProps{
   roomList: string[],
   add_room: (roomList: string) => any,
   

}

interface IJCreateRoomState{

    
        


}



function CreateRoom() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
          actions.enterRoom("redux-demo-room", {
            todos: [],
          })
        );
    
        return () => {
          dispatch(actions.leaveRoom("redux-demo-room"));
        };
      }, [dispatch]);

        return(
           
            <Button onClick={(e=>{dispatch(addRooms())})}> Crear</Button>
        );
    

}

export default CreateRoom;

