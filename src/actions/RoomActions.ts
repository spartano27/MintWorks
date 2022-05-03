import { Action } from "redux";

export enum RoomActions {
    ADD_ROOM = "ADD_ROOM",
    JOIN_ROOM = "JOIN_ROOM",
    ROOMS_LIST = "ROOM_LIST",
    ADD_USER = "ADD_USER",
    ROOM_RECEIVED = "ROOM_RECEIVED",
}

export interface IRoomActions extends Action {
    payload: string;
}
