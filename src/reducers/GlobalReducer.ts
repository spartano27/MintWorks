import { Action } from "redux";
import { IChangeUsername } from "../actions/PlayButtonActions";
import IGlobalState, { initialState } from "../state/globalState";

const reducer = (state: IGlobalState = initialState, action: Action) => {
    switch(action.type){
      case 'USERNAME':
        const usernameAction = action as IChangeUsername;
        return {...state, username: usernameAction.payload}
    }
}

export default reducer;