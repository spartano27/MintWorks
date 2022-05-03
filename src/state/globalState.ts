/* Defining the initial state of the game. */
interface IGlobalState {
    players: number;
    username: string;
    currentPlayer: number;
    roomList: string[];
    newRoom: string;
}

export default IGlobalState;
export const initialState: IGlobalState = {
    players: 4,
    username: "username",
    currentPlayer:0,
    roomList:["a"],
    newRoom: "room",
}