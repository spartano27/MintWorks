import React, { useState } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { ListGroup, Row } from "react-bootstrap";
import Assembler from "./cards/assemblerCard";
import Bridge from "./cards/bridgeCard";
import '../assets/css/cards.css';
import Coop from "./cards/coopCard";
import Corporate from "./cards/corporateCard";
import Crane from "./cards/craneCard";
import Factory from "./cards/factoryCard";
import Gallery from "./cards/galleryCard";
import Gardens from "./cards/gardensCard";
import Landfill from "./cards/landfillCard";
import LottoCard from "./cards/lottoCard";
import Mine from "./cards/mineCard";
import Museum from "./cards/museumCard";
import Obelisk from "./cards/obeliskCard";
import Plant from "./cards/plantCard";
import Statue from "./cards/statueCard";
import Stripmine from "./cards/stripmineCard";
import Truck from "./cards/truckCard";
import Vault from "./cards/vaultCard";
import WholesalerCard from "./cards/wholesalerCard";
import Windmill from "./cards/windmillCard";
import Workshop from "./cards/workshopCard";

interface IShopProps {

}

interface IShopState {

}

const cards = [{id:"1", name: "Assembler", component: <Assembler/>},{id:"2", name: "Bridge",component: <Bridge/>}
            ,{id:"3", name: "Coop", component: <Coop/>},{id:"4", name: "Corporate", component: <Corporate/>}
            ,{id:"5", name: "Crane", component: <Crane/>},{id:"6", name: "Factory", component: <Factory/>}
            ,{id:"7", name: "Gallery", component: <Gallery/>},{id:"8", name: "Gardens", component: <Gardens/>}
            ,{id:"9", name: "Landfill", component: <Landfill/>},{id:"10", name: "Lotto", component: <LottoCard/>}
            ,{id:"11", name: "Mine", component: <Mine/>},{id:"12", name: "Museum", component: <Museum/>}
            ,{id:"13", name: "Obelisk", component: <Obelisk/>},{id:"14", name: "Plant", component: <Plant/>}
            ,{id:"15", name: "Statue", component: <Statue/>},{id:"16", name: "Stripmine", component: <Stripmine/>}
            ,{id:"17", name: "Truck", component: <Truck/>},{id:"18", name: "Vault", component: <Vault/>}
            ,{id:"19", name: "Wholesaler", component: <WholesalerCard/>},{id:"20", name: "Windmill", component: <Windmill/>}
            ,{id:"21", name: "Workshop", component: <Workshop/>},
];

const reorder = (list: { id: string; name: string; component: JSX.Element; }[],startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex,1);
    result.splice(endIndex,0,removed);
    return result;
}



function Inicio(card: { id: string; name: string; component: JSX.Element; }[]) {
    const mazo_inicial = []
    var i = 0;
    while(i<3){
        const rand = (1 + Math.random() * (21-1));
        for (var c in card) {
            if(parseInt(card[c].id) === Math.round(rand)){
                mazo_inicial.push(card[c])
                card.splice(parseInt(c),1);
                i++;
            }
                    
        }
       
    }
    return mazo_inicial;
}
function Zona() {
    const [card,setCard] = useState(cards); 
     
    return( 
        <ListGroup horizontal className="h-25 justify-content-center" style={{paddingTop:'24px'}} >
            {Inicio(card).map(mazo=> (
                
                <ListGroup.Item variant="primary">
                    {mazo.component}
                </ListGroup.Item>
        ))}
        </ListGroup>
        
    );
    

}
class Shop extends React.Component<IShopProps,IShopState> {

constructor(props: IShopProps){
    super(props);
    this.state = {}
}

public render() {
    return (
        <Zona/>    );
}

}

export default Shop;
