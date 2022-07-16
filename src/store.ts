import {createClient} from "@liveblocks/client";
import { enhancer } from "@liveblocks/redux";
import {configureStore, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state/globalState";

//pk_live_qWBJrta6dfM5FdwAlCjK-ejY
export const client = createClient({
    publicApiKey: "pk_test_rGCwfxKjuMTNJOLSxeiLTtV3",

});

const slice = createSlice({
  
  name: "state",    
  initialState,
  reducers: {
    addRooms: (state,action) => {
      state.roomList = [...state.roomList,action.payload];
    },

    removeRoom: (state,action) => {
      const newa = state.roomList.slice();
      newa.splice(action.payload,1);
      state.roomList = newa;
    },

    changeUsername: (state,action) => {
      state.username = action.payload;
    },
  },
});

export const {addRooms,removeRoom,changeUsername} = slice.actions;

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
export type RootState = ReturnType<typeof slice.reducer>