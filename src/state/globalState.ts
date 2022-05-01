interface IGlobalState {
    players: number;
    username: string;
    currentPlayer: number;
}

export default IGlobalState;
export const initialState: IGlobalState = {
    players: 4,
    username: "username",
    currentPlayer:0,
}