import { Action } from "redux";
import { ClockActions, IChangePlayer } from "../actions/ClockActions";
import { GameActions, IFirstPlayer } from "../actions/GameActions";
import { IChangeUsername, PlayButtonActions } from "../actions/PlayButtonActions";
import { IRoomActions, RoomActions } from "../actions/RoomActions";
import IGlobalState, { initialState } from "../state/globalState";

/**
 * The reducer function takes in a state and an action, and returns a new state
 * @param {IGlobalState} state - IGlobalState = initialState
 * @param {Action} action - Action - this is the action that is being dispatched.
 * @returns The state is being returned with the username property being updated.
 */

const reducer = (state: IGlobalState = initialState, action: Action) => {
  switch(action.type){
    case PlayButtonActions.Change_Username:
      const usernameAction = action as IChangeUsername;
      return {...state, username: usernameAction.payload}
    case ClockActions.Change_Player:
      const clockAction = action as IChangePlayer;
      return {...state, currentPlayer: clockAction.payload}
    case GameActions.FirstPlayer:
      const gameAction = action as IFirstPlayer;
      return {...state, currentPlayer: gameAction.payload}
    case RoomActions.ADD_ROOM:
      const roomAction = action as IRoomActions;
      return {...state, roomList: state.roomList.concat(roomAction.payload)};
  }
  
  return state;
}


export default reducer;