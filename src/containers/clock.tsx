import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ClockActions } from "../actions/ClockActions";
import Clock from "../components/clock";
import IGlobalState from "../state/globalState";





const mapStateToProps = (state: IGlobalState) => {
    return ({currentPlayer: state.currentPlayer,
             players: state.players
    })
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ChangePlayer: (currentPlayer: number) => {
        dispatch({type:ClockActions.Change_Player, payload: currentPlayer});
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Clock);