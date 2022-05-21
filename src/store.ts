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
      console.log(state.roomList);

    },
    changeUsername: (state,action) => {
      state.username = action.payload;
    },
    setPlayers: (state,action) => {
      state.players = action.payload;
    },
    addPlayer: (state,action) => {
      state.playerList = [...state.playerList,action.payload];
      console.log(state.playerList);
    },
    deleteCard: (state,action) => {
      state.cards = []
    },
    initialStateCard: (state,action) => {
      state.mazo_inicial = [...state.mazo_inicial,action.payload];
    }
    
     
     
      
    /* logic will be added here */
  },
  
    

});
export const {addRooms,changeUsername,setPlayers,addPlayer,initialStateCard} = slice.actions;
export function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      enhancer({
        client,
        storageMapping: {roomList: true,rand: true}, 
        
      }),
    ],
  });
}

const store = makeStore();

export default store;