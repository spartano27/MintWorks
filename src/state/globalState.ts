import { Card, CardTypes, Room } from "../types";

interface IGlobalState {
    difficult: boolean
    username: string;
    room: Room;
    roomList: Room[];
    cards: Card[];
}

export default IGlobalState;

/* Defining the initial state of the game. */

export const initialState: IGlobalState = {
    difficult: false,
    username: "",
    room:{
        author: "",
        name: "",
        password: "",
        players: 2,
        difficult: false,
        publico: true,
        users: [""]
    },
    roomList:[],
    cards: [{id:"1", name: "Assembler", value:5, active:false, stars: 1, type: CardTypes.utility}
    ,{id:"2", name:"Bridge", value:1, active:false, stars: 0, type: CardTypes.culture}
    ,{id:"3", name: "Coop", value:1, active:false, stars: 1, type: CardTypes.production}
    ,{id:"4", name:"Corporate", value:3, active:false, stars: 0, type: CardTypes.production}
    ,{id:"5", name:"Crane", value:2, active:false, stars: 1, type: CardTypes.utility}
    ,{id:"6", name:"Factory", value:4, active:false, stars: 3, type: CardTypes.production}
    ,{id:"7", name:"Gallery", value:4, active:false, stars: 0, type: CardTypes.culture}
    ,{id:"8", name:"Gardens", value:3, active:false, stars: 3, type: CardTypes.culture}
    ,{id:"9", name: "Landfill", value:3, active:false, stars: 3, type: CardTypes.utility}
    ,{id:"10", name:"Lotto", value:4, active:false, stars: 2, type: CardTypes.deed}
    ,{id:"11", name:"Mine", value:2, active:false, stars: 1, type: CardTypes.production}
    ,{id:"12", name:"Museum", value:2, active:false, stars: 0, type: CardTypes.culture}
    ,{id:"13", name:"Obelisk", value:4, active:false, stars: 0, type: CardTypes.utility}
    ,{id:"14", name:"Plant", value:5, active:false, stars: 2, type: CardTypes.production}
    ,{id:"15", name:"Statue", value:2, active:false, stars: 2, type: CardTypes.culture}
    ,{id:"16", name:"Stripmine", value:4, active:false, stars: 0, type: CardTypes.production}
    ,{id:"17", name:"Truck", value:2, active:false, stars: 1, type: CardTypes.utility}
    ,{id:"18", name:"Vault", value:5, active:false, stars: 1, type: CardTypes.utility}
    ,{id:"19", name:"Wholesaler", value:1, active:false, stars: 1, type: CardTypes.deed}
    ,{id:"20", name:"Windmill", value:1, active:false, stars: 1, type: CardTypes.culture}
    ,{id:"21", name:"Workshop", value:3, active:false, stars: 2, type: CardTypes.production}
    ],

}

