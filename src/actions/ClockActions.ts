import { Action } from "redux";

export enum ClockActions {
    Change_Player= "Change_Player",
}
export interface IChangePlayer extends Action {
    payload: number;
}