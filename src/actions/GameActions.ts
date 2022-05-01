import { Action } from "redux";

export enum GameActions {
    FirstPlayer= "FirstPlayer",
}
export interface IFirstPlayer extends Action {
    payload: number;
}