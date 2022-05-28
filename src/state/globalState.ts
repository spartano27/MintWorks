import Lotto from "../components/board_components/lotto";
import Wholesaler from "../components/board_components/wholesaler";
import Assembler from "../components/cards/assemblerCard";
import Bridge from "../components/cards/bridgeCard";
import Coop from "../components/cards/coopCard";
import Corporate from "../components/cards/corporateCard";
import Crane from "../components/cards/craneCard";
import Factory from "../components/cards/factoryCard";
import Gallery from "../components/cards/galleryCard";
import Gardens from "../components/cards/gardensCard";
import Landfill from "../components/cards/landfillCard";
import Mine from "../components/cards/mineCard";
import Museum from "../components/cards/museumCard";
import Obelisk from "../components/cards/obeliskCard";
import Plant from "../components/cards/plantCard";
import Statue from "../components/cards/statueCard";
import Stripmine from "../components/cards/stripmineCard";
import Truck from "../components/cards/truckCard";
import Vault from "../components/cards/vaultCard";
import Windmill from "../components/cards/windmillCard";
import Workshop from "../components/cards/workshopCard";
import Shop from "../components/shop";

/* Defining the initial state of the game. */
interface IGlobalState {
    players: number;
    username: string;
    mints: number;
    currentPlayer: number;
    roomList: {}[];
    playerList: {}[];
    cards: {}[];
    mazo_inicial: {}[];
    rand: number;
    turnoId: number;
}

export default IGlobalState;
export const initialState: IGlobalState = {
    players: 4,
    username: "",
    mints: 3,
    playerList: [],
    currentPlayer:0,
    roomList:[],
    cards : [{id:"1", name: Assembler,},{id:"2", name: Bridge}
            ,{id:"3", name: Coop},{id:"4", name: Corporate}
            ,{id:"5", name: Crane},{id:"6", name: Factory}
            ,{id:"7", name: Gallery},{id:"8", name: Gardens}
            ,{id:"9", name: Landfill},{id:"10", name: Lotto}
            ,{id:"11", name: Mine},{id:"12", name: Museum}
            ,{id:"13", name: Obelisk},{id:"14", name: Plant}
            ,{id:"15", name: Statue},{id:"16", name: Stripmine}
            ,{id:"17", name: Truck},{id:"18", name: Vault}
            ,{id:"19", name: Wholesaler},{id:"20", name: Windmill}
            ,{id:"21", name: Workshop},
   
],
    mazo_inicial: [],
    rand: (1 + Math.random() * (21-1)),
    turnoId: 0
    
    
   
}