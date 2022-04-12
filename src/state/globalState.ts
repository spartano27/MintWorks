interface IGlobalState {
    players: number;
    username: string;
}

export default IGlobalState;
export const initialState: IGlobalState = {
    players: 1,
    username: "username"
}