import { Action } from "redux";
import { ClockActions, IChangePlayer } from "../actions/ClockActions";
import { GameActions, IFirstPlayer } from "../actions/GameActions";
import { IChangeUsername, PlayButtonActions } from "../actions/PlayButtonActions";
import IGlobalState, { initialState } from "../state/globalState";

/**
 * The reducer function takes in a state and an action, and returns a new state
 * @param {IGlobalState} state - IGlobalState = initialState
 * @param {Action} action - Action - this is the action that is being dispatched.
 * @returns The state is being returned with the username property being updated.
 */

const Reducer = (state: IGlobalState = initialState, action: Action) => {
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
  }
  
  return state;
}


export default Reducer;