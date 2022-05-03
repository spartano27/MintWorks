import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ClockActions } from "../actions/ClockActions";
import Clock from "../components/clock";
import IGlobalState from "../state/globalState";





/**
 * MapStateToProps is a function that takes the state of the store and returns an object with the
 * properties that we want to pass to the component as props.
 * @param {IGlobalState} state - IGlobalState - this is the state of the entire application.
 * @returns An object with two properties: currentPlayer and players.
 */
const mapStateToProps = (state: IGlobalState) => {
    return ({currentPlayer: state.currentPlayer,
             players: state.players
    })
}

/**
 * MapDispatchToProps is a function that returns an object with functions that dispatch actions to the
 * store.
 * @param {Dispatch} dispatch - Dispatch - This is the dispatch function that is passed to the
 * component by the connect function.
 */
const mapDispatchToProps = (dispatch: Dispatch) => ({
    ChangePlayer: (currentPlayer: number) => {
        dispatch({type:ClockActions.Change_Player, payload: currentPlayer});
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Clock);