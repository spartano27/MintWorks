import {createClient} from "@liveblocks/client";
import { enhancer } from "@liveblocks/redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import GlobalReducer from "./reducers/GlobalReducer";
import { initialState } from "./state/globalState";


const client = createClient({
    publicApiKey: "pk_live_qWBJrta6dfM5FdwAlCjK-ejY",

});


const slice = createSlice({
  name: "state",    
  initialState,
  reducers: {
      GlobalReducer,
      addRooms: (state) => {
        state.roomList = [...state.roomList,state.newRoom];
        state.newRoom = "";
        console.log(state.roomList);

      },
    /* logic will be added here */
  },
});
export const {addRooms} = slice.actions;
export function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      enhancer({
        client,
        storageMapping: {roomList: true},
      }),
    ],
  });
}

const store = makeStore();

export default store;