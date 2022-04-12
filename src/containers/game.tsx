import { connect } from "react-redux";
import Game from "../components/game";
import IGlobalState from "../state/globalState";

const mapStateToProps = (state: IGlobalState) => {
    return ({players: state.players,
            username: state.username
    })
}

export default connect(mapStateToProps)(Game);