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
import LottoCard from "../components/cards/lottoCard";
import Mine from "../components/cards/mineCard";
import Museum from "../components/cards/museumCard";
import Obelisk from "../components/cards/obeliskCard";
import Plant from "../components/cards/plantCard";
import Statue from "../components/cards/statueCard";
import Stripmine from "../components/cards/stripmineCard";
import Truck from "../components/cards/truckCard";
import Vault from "../components/cards/vaultCard";
import WholesalerCard from "../components/cards/wholesalerCard";
import Windmill from "../components/cards/windmillCard";
import Workshop from "../components/cards/workshopCard";
import Shop from "../components/shop";
import { ShopCardsTypes } from "../types";

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
    cards: [{id:"1", name: "Assembler", effect: Assembler(), value:5, owner: 0}
    ,{id:"2", name:"Bridge", effect: Bridge(), value:1, owner: 0}
    ,{id:"3", name: "Co-op", effect: Coop(), value:1, owner: 0}
    ,{id:"4", name:"Corporate", effect: Corporate(), value:3, owner: 0}
    ,{id:"5", name:"Crane", effect: Crane(), value:2, owner: 0}
    ,{id:"6", name:"Factory", effect: Factory(), value:4, owner: 0}
    ,{id:"7", name:"Gallery", effect: Gallery(), value:4, owner: 0}
    ,{id:"8", name:"Gardens", effect: Gardens(), value:3, owner: 0}
    ,{id:"9", name: "Landfill",effect: Landfill(), value:3, owner: 0}
    ,{id:"10", name:"Lotto", effect: LottoCard(), value:4, owner: 0}
    ,{id:"11", name:"Mine", effect: Mine(), value:2, owner: 0}
    ,{id:"12", name:"Museum", effect: Museum(), value:2, owner: 0}
    ,{id:"13", name:"Obelisk", effect: Obelisk(), value:4, owner: 0}
    ,{id:"14", name:"Plant", effect: Plant(), value:5, owner: 0}
    ,{id:"15", name:"Statue", effect: Statue(), value:2, owner: 0}
    ,{id:"16", name:"Stripmine", effect: Stripmine(), value:4, owner: 0}
    ,{id:"17", name:"Truck", effect: Truck(), value:2, owner: 0}
    ,{id:"18", name:"Vault", effect: Vault(), value:5, owner: 0}
    ,{id:"19", name:"Wholesaler", effect: WholesalerCard(), value:1, owner: 0}
    ,{id:"20", name:"Windmill", effect: Windmill(), value:1, owner: 0}
    ,{id:"21", name:"Workshop", effect: Workshop(), value:3, owner: 0}
],
    mazo_inicial: [],
    rand: (1 + Math.random() * (21-1)),
    turnoId: 0
    
    
   
}

