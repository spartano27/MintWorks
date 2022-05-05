/* Defining the initial state of the game. */
interface IGlobalState {
    players: number;
    username: string;
    currentPlayer: number;
    roomList: {}[];
    newRoom: {
        author: string,
        name: string,
        password?: string,
        players: number,
        difficult: boolean,
        publico: boolean,

    };
}

export default IGlobalState;
export const initialState: IGlobalState = {
    players: 4,
    username: "",
    currentPlayer:0,
    roomList:[],
    newRoom: {
        author: "",
        name: "",
        password: "",
        players: 2,
        difficult: false,
        publico: true,

    },
}