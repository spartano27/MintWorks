import { Action } from "redux";
import { IRoomActions, RoomActions } from "../actions/RoomActions";
import IGlobalState, { initialState } from "../state/globalState";

const Roomreducer = (state: IGlobalState = initialState, action: Action) => {
    switch(action.type){
        case RoomActions.ADD_ROOM:
            const roomAction = action as IRoomActions;
            return {...state, roomList: [...state.roomList,roomAction.payload]};
        
    }   

    return state;
}
export default Roomreducer;