import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PlayButtonActions } from "../actions/PlayButtonActions";
import PlayButton from "../components/playButton";
import IGlobalState from "../state/globalState";





const mapStateToProps = (state: IGlobalState) => {
    return ({username: state.username
    })
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    usernameChange: (username: string) => {
        dispatch({type:PlayButtonActions.Change_Username, payload: username});
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);