import { Action } from "redux";

/* Defining the type of the action. */
export enum ClockActions {
    Change_Player= "Change_Player",
}
export interface IChangePlayer extends Action {
    payload: number;
}