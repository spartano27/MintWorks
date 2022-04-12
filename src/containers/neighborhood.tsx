import { connect } from "react-redux";
import { Dispatch } from "redux";

import Neighborhood from "../components/neighborhood";
import IGlobalState from "../state/globalState";





const mapStateToProps = (state: IGlobalState) => {
    return ({username: state.username
    })
}


export default connect(mapStateToProps)(Neighborhood);