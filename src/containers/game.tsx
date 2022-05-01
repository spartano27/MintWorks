import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GameActions } from "../actions/GameActions";
import Game from "../components/game";
import IGlobalState from "../state/globalState";

const mapStateToProps = (state: IGlobalState) => {
    return ({players: state.players,
            username: state.username,
            currentPlayer: state.currentPlayer,
    })
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    FirstPlayer: (currentPlayer: number) => {
        dispatch({type:GameActions.FirstPlayer, payload: currentPlayer});
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Game);