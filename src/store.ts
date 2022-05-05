import {createClient} from "@liveblocks/client";
import { enhancer } from "@liveblocks/redux";
import {configureStore, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state/globalState";

//pk_live_qWBJrta6dfM5FdwAlCjK-ejY
const client = createClient({
    publicApiKey: "xd",

});


const slice = createSlice({
  
  name: "state",    
  initialState,
  reducers: {
    addRooms: (state,action) => {
      state.roomList = [...state.roomList,action.payload];
      console.log(state.roomList);

    },
    changeUsername: (state,action) => {
      state.username = action.payload;
    },
    setPlayers: (state,action) => {
      state.players = action.payload;
    }
     
     
      
    /* logic will be added here */
  },
  
    

});
export const {addRooms,changeUsername,setPlayers} = slice.actions;
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