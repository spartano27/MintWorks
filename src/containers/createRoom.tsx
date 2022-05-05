import { actions } from "@liveblocks/redux";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RoomActions } from "../actions/RoomActions";
import {CreateRoom} from "../components/rooms/createRoom";

import IGlobalState from "../state/globalState";





const mapStateToProps = (state: IGlobalState) => {
    return ({username: state.username,
            roomList: state.roomList

    })
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    add_room: (roomList: string) => {
        dispatch({type:RoomActions.ADD_ROOM, payload: roomList});
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);