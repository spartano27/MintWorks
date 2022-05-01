import { connect } from "react-redux";
import Player from "../components/player";
import IGlobalState from "../state/globalState";

const mapStateToProps = (state: IGlobalState) => {
    return ({players: state.players,
            username: state.username
    })
}

export default connect(mapStateToProps)(Player);