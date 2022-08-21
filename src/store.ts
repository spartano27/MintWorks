import {createClient} from "@liveblocks/client";
import { enhancer } from "@liveblocks/redux";
import {configureStore, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state/globalState";


export const client = createClient({
    publicApiKey: "pk_test_6lrj7sCqINeSrTkImX2Vc_9y",
    
});

/* Creating a slice of the state. */

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

    modifyRoom: (state,action) => {
      const newa = state.roomList.slice();
      newa.splice(action.payload[0],1);
      state.roomList = [...newa,action.payload[1]];
    },

    changeUsername: (state,action) => {
      state.username = action.payload;
    },

    changeRoom: (state,action) => {
      state.room = action.payload;
    },
    changeDifficult: (state,action) => {
      state.difficult = action.payload;
    },
    changeColor: (state,action) => {
      state.color = action.payload;
    },
  },
});

export const {addRooms,removeRoom,modifyRoom,changeUsername,changeRoom,changeDifficult,changeColor} = slice.actions;

export function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      enhancer({
        client,
        storageMapping: {roomList: true,room: true}, 
        
      }),
    ],
  });
}

const store = makeStore();

export default store;
export type RootState = ReturnType<typeof slice.reducer>