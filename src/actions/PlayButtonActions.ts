import { Action } from "redux";

export enum PlayButtonActions {
    Change_Username = "Change_Username",
}
export interface IChangeUsername extends Action {
    payload: string;
}