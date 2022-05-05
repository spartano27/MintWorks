import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RoomActions } from "../actions/RoomActions";
import {JoinRoom} from "../components/rooms/joinRoom";

let roomId = 0;
let nextUserId = 0;


export const addRoom = (room: any, author: any) => ({
    type: RoomActions.ADD_ROOM,
    id: roomId++,
    room,
    author
  })

export const addUser = (name: any) => ({
    type: RoomActions.ADD_USER,
    id: nextUserId++,
    name
  })
  
  export const RoomReceived = (room: any, author: any) => ({
    type: RoomActions.ROOM_RECEIVED,
    id: roomId++,
    room,
    author
  })
  
  export const populateUsersList = (users: any) => ({
    type: RoomActions.ROOMS_LIST,
    users
  })
