import React, {useEffect, useState} from "react";
import Board from "./board";
import Shop from "./shop";
import {Json, useList, useMyPresence, useObject, useSelf} from "@liveblocks/react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {Button, Col, Container, ListGroup, Modal, ModalBody, ModalFooter, Row} from "react-bootstrap";
import {Card, CardTypes, Presence} from "../types";
import {useNavigate} from "react-router-dom";
import {removeRoom, RootState} from "../store";
import {actions} from "@liveblocks/redux";
import Neighborhood from "./neighborhood";
import IA from "./board_components/ia";

const user = (state:RootState) => state.username;
const rooms = (state:RootState) => state.roomList;
const cardsList = (state:RootState) => state.cards;
const colorP = (state:RootState) => state.color;

/**
 * It takes an array of objects, and returns a new array of objects, with the same objects, but in a
 * different order.
 * @param {Json[]} array - Json[] - the array of objects you want to shuffle
 * @returns The array is being returned.
 */

function Shuffle(array: Json[]){

    const arrayForSort = [...array];

    for (let i = arrayForSort.length -1; i > 0; i--){
        const j = Math.floor(Math.random()* (i-1));
        const temp = arrayForSort[i];
        arrayForSort[i] = arrayForSort[j];
        arrayForSort[j] = temp;
    }

    return arrayForSort;
} 

/* A game. */

function SoloGame(){

    const self = useSelf<Presence>();
    const [mypresence,update] = useMyPresence<Presence>();
    const [visibleProducer,setVisibleProducer] = useState(false);
    const [visibleBuilder,setVisibleBuilder] = useState(false);
    const [visibleSupplier,setVisibleSupplier] = useState(false);
    const [visibleLeader,setVisibleLeader] = useState(false);
    const [visibleWholesaler,setVisibleWholesaler] = useState(false);
    const [visibleLotto,setVisibleLotto] = useState(false);
    const [visibleSwap,setVisibleSwap] = useState(false);
    const [visibleCrow,setVisibleCrow] = useState(false);
    const [visibleRecycler,setVisibleRecycler] = useState(false);
    const color = useSelector(colorP);
    const username = useSelector(user);
    const roomList = useSelector(rooms);
    const cards = useSelector(cardsList);
    const {name} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(
          actions.enterRoom("rooms", {
            roomList: [],
          })
        );
    
        return () => {
          dispatch(actions.leaveRoom("rooms"));
        };
      }, [dispatch]);

    useEffect(()=>{
        
        update({username:username,mint:3, cards:[],stars:0,first: false,color:color});
        
      }, []);

    const [mintOnGalley,setMint] = useState(0);
    const [minTokens,setMintTokens] = useState(30);
    const players = Number(String(name).split("-")[1]);
    const difficult = Number(String(name).split("-")[2]) === 1 ? true : false;
    const roomName = (String(name).split("-")[0]).split("Gl")[1];
    const [countdown,setCountdown] = useState(true);
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList<Card>("ShopCards");
    const actualCards = useList<Card>("ActualCards");
    const IAValors = useObject<{name:string,mint:number,stars:number,cards:Card[],lastAction:string,first:boolean}>("IA");
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    const winner = useObject<{ username: string; visible: boolean}>("winner");
    const leader = useObject("leader");
    const producer = useObject("producer");
    const builder = useObject("builder");
    const supplier = useObject("supplier");
    const wholesaler = useObject("wholesaler");
    const listaSortDifficult = useList("advancedCards");
    const listaDifficult = ["crow","temp","recycler","swap"];
    const listaSortIas = useList("Ias");
    const listaIas = ["sonic","rachael","mort","justin"];
    const lotto = useObject("lotto");
    const swap = useObject("swap");
    const recycler = useObject("recycler");
    const temp = useObject("temp");
    const crow = useObject("crow");

    /* eslint-disable @typescript-eslint/no-unused-vars */
    
    const Assembler = (IA: boolean) => {
        return [0,1];
    }

    const Bridge = (IA: boolean) => {
        return [0,0];
    }

    const Coop = (IA: boolean) => {
        if(IA){
            update({mint:Number(mypresence.mint)+1});
        }else{
            if(IAValors == null){
                return [0,0];
            }
            IAValors.set("mint",IAValors.get("mint")+1);
        }
       
       return [1,1];
    }

    
    /**
     * If the card is null, return [0,0], otherwise if the card is active, add 1 to retorno, and return
     * [retorno,0].
     * @returns An array with two elements.
     */

    const Corporate = (IA: boolean) => {

        let retorno = 0;
        if(IA){
            if(IAValors == null){
                return [0,0];
            }

            IAValors.get("cards").forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active){
                    retorno = retorno + 1;
                }
                
            });
        }else{

            mypresence.cards.forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active){
                    retorno = retorno + 1;
                }
                
            });

        }
        
        return [retorno,0];
        
    }

    const Crane = (IA: boolean) => {
        return [0,1];
    }

    const Factory = (IA: boolean) => {
        return [1,3];
    }

    const Gallery = (IA: boolean) => {
        setMint(mintOnGalley+1);
        return [0,mintOnGalley];
    }

    const Gardens = (IA: boolean) => {
        return [0,3];
    }

    /**
     * "If the card is active and a culture card, then subtract one from the stars variable."
     * 
     * The function is called Landfill. It's a function that returns an array of two numbers. The first
     * number is always 0. The second number is the number of stars the player has. 
     * 
     * The function starts by setting the stars variable to 3. Then it loops through all the cards in
     * the player's hand. If the card is active and a culture card, then it subtracts one from the
     * stars variable. 
     * 
     * The function returns the array [0,stars].
     * @returns [0,stars]
     */

    const Landfill = (IA: boolean) => {
        let stars = 3;
        if(IA){
            if(IAValors == null){
                return [0,0];
            }
            IAValors.get("cards").forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active && card.type === CardTypes.culture){
                    if(card.stars > 0){
                        stars = stars -1;
                    }
                } 
            });
        }else{
            mypresence.cards.forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active && card.type === CardTypes.culture){
                    if(card.stars > 0){
                        stars = stars -1;
                    }
                } 
            });
        }
       
        return [0,stars];
    }

    const Lotto = (IA: boolean) => {
        if (lotto == null){
            return [0,2];
        }
        if(lotto.get("occupied")){
            return [2,2];
        }else{
            return [0,2];
        }
    }

    const Mine = (IA: boolean) => {
        return [1,1];
    }

    /**
     * "If the player has a card called "Bridge" in their hand, they get 2 stars, otherwise they get 1
     * star."
     * The function is called "Museum" because it's a function that calculates the number of stars a
     * player gets from the "Museum" card.
     * @returns an array of two numbers.
     */

    const Museum = (IA: boolean) => {
        let stars = 0;
        if(IA){
            if(IAValors == null){
                return [0,0];
            }
            IAValors.get("cards").forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active && card.type === CardTypes.culture){
                    
                    if(card.name === "Bridge"){
                        stars = stars + 2; 
                    } 
                    else{
                        stars = stars + 1;
                    }
                }
                if(card.active && card.name === "Landfill"){
                    if(stars > 0){
                        stars = stars -1;
                    }
                } 
            });
        }else{

            mypresence.cards.forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active && card.type === CardTypes.culture){
                    
                    if(card.name === "Bridge"){
                        stars = stars + 2; 
                    } 
                    else{
                        stars = stars + 1;
                    }
                }
                if(card.active && card.name === "Landfill"){
                    if(stars > 0){
                        stars = stars -1;
                    }
                } 
            });
        }
        
        
        return [0,stars];
    }

    /**
     * If the card is active, add one to the stars variable, otherwise return 0,0.
     * @returns An array of two numbers.
     */

    const Obelisk = (IA: boolean) => {
        let stars = 0;
        if(IA){
            if(IAValors == null){
                return [0,0];
            }
            IAValors.get("cards").forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active){
                    stars = stars + 1 ;
                } 
            });
        }else{

            mypresence.cards.forEach((card)=>{
                if(card == null){
                    return [0,0];
                }
                if(card.active){
                    stars = stars + 1 ;
                } 
            });
        }
        
        return [0,stars];
    }

    const Plant = (IA: boolean) => {
        return [2,2];
    }

    const Statue = (IA: boolean) => {
        return [0,2];
    }

    const Stripmine = (IA: boolean) => {
        return [3,0];
    }

    const Truck = (IA: boolean) => {
        return [0,1];
    }

    /**
     * "If the card is null, return [0,0]. If the card is not active, add 2 to the stars variable.
     * Otherwise, do nothing."
     * 
     * The function is supposed to return an array of two numbers. The first number is the number of
     * mints, and the second number is the number of stars.
     * @returns An array with two values.
     */
    const Vault = (IA: boolean) => {
        let stars = 1;
        mypresence.cards.forEach((card)=>{
            if(card == null){
                return [0,0];
            }
            if(!card.active){
                stars = stars + 2 ;
            } 
        });
        return [0,stars];
    }

    const Wholesaler = (IA: boolean) => {
        if (wholesaler == null){
            return [0,1];
        }
        if(wholesaler.get("occupied")){
            return [1,1];
        }else{
            return [0,1];
        }
      
    }

    const Windmill = (IA: boolean) => {
        return [0,1];
    }

    const Workshop = (IA: boolean) => {
        return [1,2];
    }

    /**
     * If shopCards and actualCards are not null, shuffle the cards array and push the first 21
     * elements into shopCards and the first 3 elements into actualCards.
     * @returns null.
     */

    const initialiceShop = () => {

        if(shopCards == null || actualCards == null){
            return null;
        }

        Shuffle(cards).forEach((e:any)=>{
            if(shopCards.length < 21){
                shopCards.push(e);
                if(actualCards.length < 2){
                    actualCards.push(e);
                }
            }
        });
    }
    const initialiceDiff = () => {

        Shuffle(listaDifficult).forEach((e)=>{
            
            if(listaSortDifficult == null){
                return null;
            }
            if(listaSortDifficult.length < 1){
                listaSortDifficult.push(e);
            }
        });
    }


    if(winner == null || lotto == null || wholesaler == null || actualCards == null || shopCards == null || shuffleList == null || playersList == null || turno == null || self == null || self.presence == null
        || leader ==null || builder == null || supplier == null || producer == null || swap == null || crow == null || temp == null || recycler == null || listaSortDifficult == null || IAValors == null){
        initialiceShop();
        initialiceDiff();
        
        return null;
    }
    
    const initialiceIas = () => {

        Shuffle(listaIas).forEach((e)=>{
            
            if(listaSortIas == null){
                return null;
            }
            console.log(e);
            if(listaSortIas.length < 1){
                IAValors.set("name",String(e));
                listaSortIas.push(e);

                if(e == "sonic"){
                    IAValors.set("mint",5)
                }

                if(e == "justin"){
                    IAValors.set("mint",3)
                }

                if(e == "rachael"){
                    IAValors.set("mint",5)
                }

                if(e == "mort"){
                    IAValors.set("mint",999)
                }
            }
        });
    }
   

    /**
     * The function handleOn takes an event of type React.PointerEvent<HTMLDivElement> and returns
     * nothing.
     * @param event - React.PointerEvent<HTMLDivElement>
     */

    const handleOn = (event: React.PointerEvent<HTMLDivElement>) => {
        update({
            cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY) 
            }
        })
    }
    
    /**
     * if turno.get("nuevaRonda") is true then a new round begins and the function MintsForAll do all
     * the stuff necesary when a new round begins.
     */
    const handleCompraIA = (card: Card) => {
        
            let discount = 0;
            let builderEffect = false;
    
            IAValors.get("cards").forEach((carta)=>{
                if(carta == null){
                    return null
                }
                
                if(carta.name === "Truck"){
                    if(card.value === 1 && carta.active){
                        discount = 0;
                    }
                    else{
                        discount = 1;
                    }
                }
    
                if(carta.name === "Assembler" && carta.active){
                    builderEffect = true;
                    if(card.name === "Wholesaler"){
                        wholesaler.set("img", "wholesaler.png");
                        wholesaler.set("occupied", false);
                    }
                    if(card.name === "Lotto"){
                        lotto.set("img", "lotto.png");
                        lotto.set("occupied", false);
                    }
                }
            })
                
                const cardOwner = {id: card.id,name: card.name, value: card.value, active: builderEffect ? true : false, stars: card.stars, type: card.type}
                const totalCards = [...IAValors.get("cards"),cardOwner];
                
                for (let i = 0; i< shopCards.length; i++){
                    const carta = shopCards.get(i);
                    for (const property in carta){
                         if (property === "id"){
                            if(carta[property] === card.id){
                                shopCards.delete(i);
                            }
                         }
                    }
    
                    const actualCarta = actualCards.get(i);
    
                    for (const property in actualCarta){
                        if (property === "id"){
                           if(actualCarta[property] === card.id){
                            actualCards.delete(i);
                           }
                        }
                   }
        
                    
                    
    
                }  
                IAValors.set("cards",totalCards);
                IAValors.set("mint",IAValors.get("mint")-cardOwner.value+discount);
                supplier.set("img", players < 4 ? `supplier1Used${supplier.get("occupied")}.png` : `supplierUsed${supplier.get("occupied")}.png`);
                supplier.set("occupied", Number(supplier.get("occupied"))+1);
                setVisibleSupplier(true);
                
                
            
        
    }

    const handleBuildIA = (card: { id: string; value: number; name: string; active:boolean; stars: number; type:CardTypes}) => {
        
            let discount = 0;
    
            if(mypresence == null){
                return null;
            }
    
            IAValors.get("cards").forEach((carta)=>{
                if(carta == null){
                    return null;
                }
                if(carta.name === "Crane" && carta.active){
                        discount = 1;
                }
            })
    
                
                const cardOwner = {id: card.id,name: card.name, value: card.value, active: true, stars: card.stars, type: card.type}
                
                if(card.name === "Wholesaler"){
                    wholesaler.set("img", "wholesaler.png");
                    wholesaler.set("occupied", false);
                }
    
                if(card.name === "Lotto"){
                    lotto.set("img", "lotto.png");
                    lotto.set("occupied", false);
                }
    
                for (let i = 0; i< IAValors.get("cards").length; i++){
                    const carta = IAValors.get("cards")[i];
                    for (const property in carta){
                         if (property === "id"){
                            if(carta[property] === card.id){
                                IAValors.get("cards").splice(i,1);
                            }
                        }
                    }
                }  
    
                const totalCards = [...IAValors.get("cards"),cardOwner];
                IAValors.set("cards",totalCards);
                IAValors.set("mint",IAValors.get("mint")-2+discount);
                
                IAValors.set("stars",IAValors.get("stars")+card.stars);
                
                builder.set("img", players < 4 ? `builder1Used${builder.get("occupied")}.png` : `builderUsed${builder.get("occupied")}.png`);
                builder.set("occupied", Number(builder.get("occupied"))+1);
                setVisibleBuilder(true);
                   
                
            
        
    }
   const handleLottoIA = () => {

            if(shopCards == null || mypresence == null){
                return null;
            }
                
                   
                    if(shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && actualCards.length === 2){
                        
                        if (shopCards.get(2) !== undefined){
                            lotto.set("img", "lottoUsed.png");
                            lotto.set("occupied", "true");
                            const cartaLista = shopCards.get(2);
                            if(cartaLista == undefined){
                                return null;
                            }
                            const totalCards = [...IAValors.get("cards"),cartaLista];
                            shopCards.delete(2);
                            IAValors.set("cards",totalCards);
                            IAValors.set("mint",IAValors.get("mint")-3);
                            setVisibleLotto(true);
                        
                            
                        }
                     
                    }
                    if(shopCards.get(0) !== undefined && actualCards.length === 1){
                        
                        if (shopCards.get(1) !== undefined){
    
                            lotto.set("img", "lottoUsed.png");
                            lotto.set("occupied", "true");
                            const cartaLista = shopCards.get(1);
                            if(cartaLista == undefined){
                                return null;
                            }
                            const totalCards = [...IAValors.get("cards"),cartaLista];
                            shopCards.delete(1);
                            IAValors.set("cards",totalCards);
                            IAValors.set("mint",IAValors.get("mint")-3);
                            setVisibleLotto(true);
                            
                        }
                        
                      
                    }
    
                    if(actualCards.length === 0){
                        
                        if (shopCards.get(0) !== undefined){
                            lotto.set("img", "lottoUsed.png");
                            lotto.set("occupied", "true");
                            const cartaLista = shopCards.get(0);
                            if(cartaLista == undefined){
                                return null;
                            }
                            const totalCards = [...IAValors.get("cards"),cartaLista];
                            shopCards.delete(0);
                            IAValors.set("cards",totalCards);
                            IAValors.set("mint",IAValors.get("mint")-3);
                            setVisibleLotto(true);
                            
                            
                        }
                    }
            
        
    }

    const handleDifficultIA = (card: { value: number; stars: number; },index: number) => {
        if(difficult){
         
            if(listaSortDifficult.get(0) == "crow"){
                if(IAValors.get("mint") >= 1){
                    crow.set("img", "crowUsed.png");
                    crow.set("occupied", true);
                    IAValors.set("mint",IAValors.get("mint")+2);
                    update({mint:Number(mypresence.mint)+1});
                    setVisibleCrow(true);
                }else{
                    IAValors.set("lastAction","pass");
                }
                
            }else if(listaSortDifficult.get(0) == "recycler"){
                if(IAValors.get("mint") >= 1){
                    if (card == null){
                        return null;
                    }
                        const cost = card.value + card.stars;
                        const nuevaCards = IAValors.get("cards").slice();
                        nuevaCards.splice(index,1);
                        IAValors.set("cards",nuevaCards);
                        IAValors.set("mint",IAValors.get("mint")+cost);
                        recycler.set("img", "recyclerUsed.png");
                        recycler.set("occupied", true);
                        setVisibleRecycler(true);
                }else{
                    IAValors.set("lastAction","pass");
                }
    
            }else if(listaSortDifficult.get(0) == "swap"){
                if(IAValors.get("mint") >= 2){
    
                    if(shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && actualCards.length === 2){
                    
                        if (shopCards.get(2) !== undefined){
                            swap.set("img", "swapUsed.png");
                            swap.set("occupied", true);
                            const cartaLista = shopCards.get(2);
                            if(cartaLista == undefined){
                                return null;
                            }
                            const nuevaCards = IAValors.get("cards").slice();
                            nuevaCards.splice(index,1);
                            const totalCards = [...nuevaCards,cartaLista];
                            shopCards.delete(2);
                            IAValors.set("cards",totalCards);
                            IAValors.set("mint",IAValors.get("mint")-2);
                            setVisibleSwap(true);
                        }
                        
                    }
                    if(shopCards.get(0) !== undefined && actualCards.length === 1){
                        
                        if (shopCards.get(1) !== undefined){
        
                            swap.set("img", "swapUsed.png");
                            swap.set("occupied", true);
                            const cartaLista = shopCards.get(1);
                            if(cartaLista == undefined){
                                return null;
                            }
                            const nuevaCards = IAValors.get("cards").slice();
                            nuevaCards.splice(index,1);
                            const totalCards = [...nuevaCards,cartaLista];
                            shopCards.delete(1);
                            IAValors.set("cards",totalCards);
                            IAValors.set("mint",IAValors.get("mint")-2);
                            setVisibleSwap(true);
                        }
                    }
        
                    if(actualCards.length === 0){
                        
                        if (shopCards.get(0) !== undefined){
                            swap.set("img", "swapUsed.png");
                            swap.set("occupied", true);
                            const cartaLista = shopCards.get(0);
                            if(cartaLista == undefined){
                                return null;
                            }
                            const nuevaCards = IAValors.get("cards").slice();
                            nuevaCards.splice(index,1);
                            const totalCards = [...nuevaCards,cartaLista];
                            shopCards.delete(0);
                            IAValors.set("cards",totalCards);
                            IAValors.set("mint",IAValors.get("mint")-2);
                            setVisibleSwap(true);
                        }
                    }
                    
                }else{
                    IAValors.set("lastAction","pass");
                }
    
            }else if(listaSortDifficult.get(0) == "temp"){
        
                    IAValors.set("lastAction","pass");        
            }else{
                IAValors.set("lastAction","pass"); 
            }
        }else{
            IAValors.set("lastAction","pass"); 
        }
        
    }

    
    const SonicActions = () => {

        const activo : Card[] = [];
        IAValors.get("cards").forEach((card) => {
                    
            if(!card.active){
                activo.push(card);
            }
        });

        switch(IAValors.get("lastAction")){
            
            case "":

                if(Number(producer.get("occupied")) > 3 || IAValors.get("mint") == 0){
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                                
                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && (!crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied"))){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                            
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("first",true);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                }
                else{
                    producer.set("img", `producerUsed${producer.get("occupied")}.png`);
                    producer.set("occupied", Number(producer.get("occupied"))+1);
                    IAValors.set("lastAction","producer");
                    setVisibleProducer(true);
                    IAValors.set("mint",IAValors.get("mint")+1);
                }
                break;

            case "producer":
              
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                   
                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("first",true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                
               
                break;
            case "wholesaler":
                
                    if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                        handleBuildIA(activo[0]);
                        IAValors.set("lastAction","builder");
                    }else{
                        if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
               
                            let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
        
                        }else{
                            if(leader.get("occupied") || IAValors.get("mint") == 0){
                                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                    handleLottoIA()
                                    IAValors.set("lastAction","lotto");
                                }else{
                                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                        handleDifficultIA(IAValors.get("cards")[0],0);
                                        IAValors.set("lastAction","diff");
                                    }else{
                                        IAValors.set("lastAction","pass");
                                    }
                                }
                            }else{
                                leader.set("img", "leaderUsed.png");
                                leader.set("occupied", true);
                                IAValors.set("first",true);
                                IAValors.set("mint",IAValors.get("mint")-1);
                                IAValors.set("lastAction","leader");
                                setVisibleLeader(true);
                            }
                        }
                    }

                
                break;
            case "builder":
                
                if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                   
                    let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                    }else{
                        if(leader.get("occupied") || IAValors.get("mint") == 0){
                            if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                handleLottoIA()
                                IAValors.set("lastAction","lotto");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }else{
                            leader.set("img", "leaderUsed.png");
                            leader.set("occupied", true);
                            IAValors.set("first",true);
                            IAValors.set("mint",IAValors.get("mint")-1);
                            IAValors.set("lastAction","leader");
                            setVisibleLeader(true);
                        }
                    }

                }else{
                
                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                            handleLottoIA()
                            IAValors.set("lastAction","lotto");
                        }else{
                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                handleDifficultIA(IAValors.get("cards")[0],0);
                                IAValors.set("lastAction","diff");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }
                    }else{
                        leader.set("img", "leaderUsed.png");
                        leader.set("occupied", true);
                        IAValors.set("first",true);
                        IAValors.set("mint",IAValors.get("mint")-1);
                        IAValors.set("lastAction","leader");
                        setVisibleLeader(true);
                    }
                }
                break;

            case "supplier":

                if(leader.get("occupied") || IAValors.get("mint") == 0){
                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                        handleLottoIA()
                        IAValors.set("lastAction","lotto");
                    }else{
                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                            handleDifficultIA(IAValors.get("cards")[0],0);
                            IAValors.set("lastAction","diff");
                        }else{
                            IAValors.set("lastAction","pass");
                        }
                    }
                }else{
                    leader.set("img", "leaderUsed.png");
                    leader.set("occupied", true);
                    IAValors.set("first",true);
                    IAValors.set("mint",IAValors.get("mint")-1);
                    IAValors.set("lastAction","leader");
                    setVisibleLeader(true);
                }
                break;

            case "leader":
                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                    handleLottoIA()
                    IAValors.set("lastAction","lotto");
                }else{
                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                        handleDifficultIA(IAValors.get("cards")[0],0);
                        IAValors.set("lastAction","diff");
                    }else{
                        IAValors.set("lastAction","pass");
                    }
                }
                break;
            case "lotto": 
                if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                    handleDifficultIA(IAValors.get("cards")[0],0);
                    IAValors.set("lastAction","diff");
                }else{
                    IAValors.set("lastAction","pass");
                }
                break;
            case "diff":
                IAValors.set("lastAction","pass");
                break;
            
        }
    }


    const MortActions = () => {

        const activo : Card[] = [];
        IAValors.get("cards").forEach((card) => {
                    
            if(!card.active){
                activo.push(card);
            }
        });

        switch(IAValors.get("lastAction")){
            
            case "":

                if(Number(producer.get("occupied")) > 3 || IAValors.get("mint") == 0){
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2){
                                

                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value || valorMasAlto.type == CardTypes.production){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value && card.type != CardTypes.production){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.deed && valorMasAlto.type == CardTypes.culture){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                            
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("first",true);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                }
                else{
                    producer.set("img",`producerUsed${producer.get("occupied")}.png`);
                    producer.set("occupied", Number(producer.get("occupied"))+1);
                    IAValors.set("lastAction","producer");
                    IAValors.set("mint",IAValors.get("mint")+1);
                    setVisibleProducer(true);
                }
                break;

            case "producer":
              
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2){
                   
                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value || valorMasAlto.type == CardTypes.production){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value && card.type != CardTypes.production){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.deed && valorMasAlto.type == CardTypes.culture){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("first",true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                
               
                break;
            case "wholesaler":
                
                    if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                        handleBuildIA(activo[0]);
                        IAValors.set("lastAction","builder");
                    }else{
                        if(Number(supplier.get("occupied")) <= 2){
               
                            let valorMasAlto = actualCards.get(0);
                            if(valorMasAlto == undefined){
                                return null;
                            }
                            if(IAValors.get("mint") < valorMasAlto.value || valorMasAlto.type == CardTypes.production){
                                valorMasAlto = actualCards.get(1);
                            }
                            actualCards.forEach((card)=>{
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") >= card.value && card.type != CardTypes.production){
                                    if(card.value > valorMasAlto.value){
                                        valorMasAlto = card;
                                    }else if(card.value == valorMasAlto.value){
                                        if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture)){
                                            valorMasAlto = card;
                                        }
                                        if(card.type == CardTypes.deed && valorMasAlto.type == CardTypes.culture){
                                            valorMasAlto = card;
                                        }
                                    }
                                }
                                

                            })
                            if(valorMasAlto == undefined){
                                return null;
                            }
                            
                            if(IAValors.get("mint") >= valorMasAlto.value){
                                handleCompraIA(valorMasAlto);
                                IAValors.set("lastAction","supplier");
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
        
                        }else{
                            if(leader.get("occupied") || IAValors.get("mint") == 0){
                                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                    handleLottoIA()
                                    IAValors.set("lastAction","lotto");
                                }else{
                                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                        handleDifficultIA(IAValors.get("cards")[0],0);
                                        IAValors.set("lastAction","diff");
                                    }else{
                                        IAValors.set("lastAction","pass");
                                    }
                                }
                            }else{
                                leader.set("img", "leaderUsed.png");
                                leader.set("occupied", true);
                                IAValors.set("first",true);
                                IAValors.set("mint",IAValors.get("mint")-1);
                                IAValors.set("lastAction","leader");
                                setVisibleLeader(true);
                            }
                        }
                    }

                
                break;
            case "builder":
                
                if(Number(supplier.get("occupied")) <= 2){
                   
                    let valorMasAlto = actualCards.get(0);
                    if(valorMasAlto == undefined){
                        return null;
                    }
                    if(IAValors.get("mint") < valorMasAlto.value || valorMasAlto.type == CardTypes.production){
                        valorMasAlto = actualCards.get(1);
                    }
                    actualCards.forEach((card)=>{
                        if(valorMasAlto == undefined){
                            return null;
                        }
                        if(IAValors.get("mint") >= card.value && card.type != CardTypes.production){
                            if(card.value > valorMasAlto.value){
                                valorMasAlto = card;
                            }else if(card.value == valorMasAlto.value){
                                if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture)){
                                    valorMasAlto = card;
                                }
                                if(card.type == CardTypes.deed && valorMasAlto.type == CardTypes.culture){
                                    valorMasAlto = card;
                                }
                            }
                        }
                        

                    })
                    if(valorMasAlto == undefined){
                        return null;
                    }
                    
                    if(IAValors.get("mint") >= valorMasAlto.value){
                        handleCompraIA(valorMasAlto);
                        IAValors.set("lastAction","supplier");
                    }else{
                        if(leader.get("occupied") || IAValors.get("mint") == 0){
                            if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                handleLottoIA()
                                IAValors.set("lastAction","lotto");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }else{
                            leader.set("img", "leaderUsed.png");
                            leader.set("occupied", true);
                            IAValors.set("first",true);
                            IAValors.set("mint",IAValors.get("mint")-1);
                            IAValors.set("lastAction","leader");
                            setVisibleLeader(true);
                        }
                    }

                }else{
                
                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                            handleLottoIA()
                            IAValors.set("lastAction","lotto");
                        }else{
                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                handleDifficultIA(IAValors.get("cards")[0],0);
                                IAValors.set("lastAction","diff");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }
                    }else{
                        leader.set("img", "leaderUsed.png");
                        leader.set("occupied", true);
                        IAValors.set("first",true);
                        IAValors.set("mint",IAValors.get("mint")-1);
                        IAValors.set("lastAction","leader");
                        setVisibleLeader(true);
                    }
                }
                break;

            case "supplier":

                if(leader.get("occupied") || IAValors.get("mint") == 0){
                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                        handleLottoIA()
                        IAValors.set("lastAction","lotto");
                    }else{
                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                            handleDifficultIA(IAValors.get("cards")[0],0);
                            IAValors.set("lastAction","diff");
                        }else{
                            IAValors.set("lastAction","pass");
                        }
                    }
                }else{
                    leader.set("img", "leaderUsed.png");
                    leader.set("occupied", true);
                    IAValors.set("first",true);
                    IAValors.set("mint",IAValors.get("mint")-1);
                    IAValors.set("lastAction","leader");
                    setVisibleLeader(true);
                }
                break;

            case "leader":
                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                    handleLottoIA()
                    IAValors.set("lastAction","lotto");
                }else{
                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                        handleDifficultIA(IAValors.get("cards")[0],0);
                        IAValors.set("lastAction","diff");
                    }else{
                        IAValors.set("lastAction","pass");
                    }
                }
                break;
            case "lotto": 
                if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                    handleDifficultIA(IAValors.get("cards")[0],0);
                    IAValors.set("lastAction","diff");
                }else{
                    IAValors.set("lastAction","pass");
                }
                break;
            case "diff":
                IAValors.set("lastAction","pass");
                break;
            
        }
    }


    const RachaelActions = () => {

        const activo : Card[] = [];
        IAValors.get("cards").forEach((card) => {
                    
            if(!card.active){
                activo.push(card);
            }
        });

        switch(IAValors.get("lastAction")){
            
            case "":

                if(Number(producer.get("occupied")) > 3 || IAValors.get("mint") == 0){
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                                
                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    setMintTokens(minTokens-valorMasAlto.value);
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                            
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("first",true);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                }
                else{
                    producer.set("img", `producerUsed${producer.get("occupied")}.png`);
                    producer.set("occupied", Number(producer.get("occupied"))+1);
                    IAValors.set("lastAction","producer");
                    IAValors.set("mint",IAValors.get("mint")+1);
                    setVisibleProducer(true);
                }
                break;

            case "producer":
              
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                   
                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value > valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    setMintTokens(minTokens-valorMasAlto.value);
                                    handleCompraIA(valorMasAlto);
                                    IAValors.set("lastAction","supplier");
                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("first",true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                
               
                break;
            case "wholesaler":
                
                    if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                        handleBuildIA(activo[0]);
                        IAValors.set("lastAction","builder");
                    }else{
                        if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
               
                            let valorMasAlto = actualCards.get(0);
                            if(valorMasAlto == undefined){
                                return null;
                            }
                            if(IAValors.get("mint") < valorMasAlto.value){
                                valorMasAlto = actualCards.get(1);
                            }
                            actualCards.forEach((card)=>{
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") >= card.value){
                                    if(card.value > valorMasAlto.value){
                                        valorMasAlto = card;
                                    }else if(card.value == valorMasAlto.value){
                                        if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.culture)){
                                            valorMasAlto = card;
                                        }
                                        if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                            valorMasAlto = card;
                                        }
                                        if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                            valorMasAlto = card;
                                        }
                                    }
                                }
                                

                            })
                            if(valorMasAlto == undefined){
                                return null;
                            }
                            
                            if(IAValors.get("mint") >= valorMasAlto.value){
                                setMintTokens(minTokens-valorMasAlto.value);
                                handleCompraIA(valorMasAlto);
                                IAValors.set("lastAction","supplier");
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
        
                        }else{
                            if(leader.get("occupied") || IAValors.get("mint") == 0){
                                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                    handleLottoIA()
                                    IAValors.set("lastAction","lotto");
                                }else{
                                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                        handleDifficultIA(IAValors.get("cards")[0],0);
                                        IAValors.set("lastAction","diff");
                                    }else{
                                        IAValors.set("lastAction","pass");
                                    }
                                }
                            }else{
                                leader.set("img", "leaderUsed.png");
                                leader.set("occupied", true);
                                IAValors.set("first",true);
                                IAValors.set("mint",IAValors.get("mint")-1);
                                IAValors.set("lastAction","leader");
                                setVisibleLeader(true);
                            }
                        }
                    }

                
                break;
            case "builder":
                
                if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                   
                    let valorMasAlto = actualCards.get(0);
                    if(valorMasAlto == undefined){
                        return null;
                    }
                    if(IAValors.get("mint") < valorMasAlto.value){
                        valorMasAlto = actualCards.get(1);
                    }
                    actualCards.forEach((card)=>{
                        if(valorMasAlto == undefined){
                            return null;
                        }
                        if(IAValors.get("mint") >= card.value){
                            if(card.value > valorMasAlto.value){
                                valorMasAlto = card;
                            }else if(card.value == valorMasAlto.value){
                                if(card.type == CardTypes.production && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility || valorMasAlto.type == CardTypes.culture)){
                                    valorMasAlto = card;
                                }
                                if(card.type == CardTypes.culture && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.utility)){
                                    valorMasAlto = card;
                                }
                                if(card.type == CardTypes.utility && valorMasAlto.type == CardTypes.deed){
                                    valorMasAlto = card;
                                }
                            }
                        }
                        

                    })
                    if(valorMasAlto == undefined){
                        return null;
                    }
                    
                    if(IAValors.get("mint") >= valorMasAlto.value){
                        setMintTokens(minTokens-valorMasAlto.value);
                        handleCompraIA(valorMasAlto);
                        IAValors.set("lastAction","supplier");
                    }else{
                        if(leader.get("occupied") || IAValors.get("mint") == 0){
                            if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                handleLottoIA()
                                IAValors.set("lastAction","lotto");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }else{
                            leader.set("img", "leaderUsed.png");
                            leader.set("occupied", true);
                            IAValors.set("first",true);
                            IAValors.set("mint",IAValors.get("mint")-1);
                            IAValors.set("lastAction","leader");
                            setVisibleLeader(true);
                        }
                    }

                }else{
                
                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                            handleLottoIA()
                            IAValors.set("lastAction","lotto");
                        }else{
                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                handleDifficultIA(IAValors.get("cards")[0],0);
                                IAValors.set("lastAction","diff");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }
                    }else{
                        leader.set("img", "leaderUsed.png");
                        leader.set("occupied", true);
                        IAValors.set("first",true);
                        IAValors.set("mint",IAValors.get("mint")-1);
                        IAValors.set("lastAction","leader");
                        setVisibleLeader(true);
                    }
                }
                break;

            case "supplier":

                if(leader.get("occupied") || IAValors.get("mint") == 0){
                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                        handleLottoIA()
                        IAValors.set("lastAction","lotto");
                    }else{
                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                            handleDifficultIA(IAValors.get("cards")[0],0);
                            IAValors.set("lastAction","diff");
                        }else{
                            IAValors.set("lastAction","pass");
                        }
                    }
                }else{
                    leader.set("img", "leaderUsed.png");
                    leader.set("occupied", true);
                    IAValors.set("first",true);
                    IAValors.set("mint",IAValors.get("mint")-1);
                    IAValors.set("lastAction","leader");
                    setVisibleLeader(true);
                }
                break;

            case "leader":
                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                    handleLottoIA()
                    IAValors.set("lastAction","lotto");
                }else{
                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                        handleDifficultIA(IAValors.get("cards")[0],0);
                        IAValors.set("lastAction","diff");
                    }else{
                        IAValors.set("lastAction","pass");
                    }
                }
                break;
            case "lotto": 
                if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                    handleDifficultIA(IAValors.get("cards")[0],0);
                    IAValors.set("lastAction","diff");
                }else{
                    IAValors.set("lastAction","pass");
                }
                break;
            case "diff":
                IAValors.set("lastAction","pass");
                break;
            
        }
    }


    const JustinActions = () => {

        const activo : Card[] = [];
        IAValors.get("cards").forEach((card) => {
                    
            if(!card.active){
                activo.push(card);
            }
        });

        switch(IAValors.get("lastAction")){
            
            case "":

                if(Number(producer.get("occupied")) > 3 || IAValors.get("mint") == 0){
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            builder.set("img", players < 4 ? `builder1Used${builder.get("occupied")}.png` : `builderUsed${builder.get("occupied")}.png`);
                            builder.set("occupied", 2);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                                
                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value < valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.deed && (valorMasAlto.type == CardTypes.production || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && valorMasAlto.type == CardTypes.culture){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    supplier.set("img", players < 4 ? `supplier1Used${supplier.get("occupied")}.png` : `supplierUsed${supplier.get("occupied")}.png`);
                                    supplier.set("occupied", 2);
                                    IAValors.set("lastAction","supplier");

                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                            
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("first",true);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                }
                else{
                    producer.set("img",`producerUsed${producer.get("occupied")}.png`);
                    producer.set("occupied", Number(producer.get("occupied"))+3);
                    IAValors.set("lastAction","producer");
                    IAValors.set("mint",IAValors.get("mint")+1);
                    setVisibleProducer(true);
                }
                break;

            case "producer":
              
                    if((wholesaler.get("occupied")) || IAValors.get("mint") == 0){
                        if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                            handleBuildIA(activo[0]);
                            builder.set("img", players < 4 ? `builder1Used${builder.get("occupied")}.png` : `builderUsed${builder.get("occupied")}.png`);
                            builder.set("occupied", 2);
                            IAValors.set("lastAction","builder");
                        }else{
                            if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                   
                                let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value < valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.deed && (valorMasAlto.type == CardTypes.production || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && valorMasAlto.type == CardTypes.culture){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    supplier.set("img", players < 4 ? `supplier1Used${supplier.get("occupied")}.png` : `supplierUsed${supplier.get("occupied")}.png`);
                                    supplier.set("occupied", 2);
                                    IAValors.set("lastAction","supplier");
                                }else{
                                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                            handleLottoIA()
                                            IAValors.set("lastAction","lotto");
                                        }else{
                                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                                handleDifficultIA(IAValors.get("cards")[0],0);
                                                IAValors.set("lastAction","diff");
                                            }else{
                                                IAValors.set("lastAction","pass");
                                            }
                                        }
                                    }else{
                                        leader.set("img", "leaderUsed.png");
                                        leader.set("occupied", true);
                                        IAValors.set("first",true);
                                        IAValors.set("mint",IAValors.get("mint")-1);
                                        IAValors.set("lastAction","leader");
                                        setVisibleLeader(true);
                                    }
                                }
            
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
                        }

                    }else{
                        wholesaler.set("img", "wholesalerUsed.png");
                        wholesaler.set("occupied", true);
                        IAValors.set("lastAction","wholesaler");
                        IAValors.set("mint",IAValors.get("mint")+1);
                        setVisibleWholesaler(true);
                    }
                
               
                break;
            case "wholesaler":
                
                    if(IAValors.get("mint") >= 2 && Number(builder.get("occupied")) <= 2 && activo.length != 0){
                        handleBuildIA(activo[0]);
                        builder.set("img", players < 4 ? `builder1Used${builder.get("occupied")}.png` : `builderUsed${builder.get("occupied")}.png`);
                        builder.set("occupied", 2);
                        IAValors.set("lastAction","builder");
                    }else{
                        if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
               
                            let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value < valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.deed && (valorMasAlto.type == CardTypes.production || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && valorMasAlto.type == CardTypes.culture){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    supplier.set("img", players < 4 ? `supplier1Used${supplier.get("occupied")}.png` : `supplierUsed${supplier.get("occupied")}.png`);
                                    supplier.set("occupied", 2);
                                    IAValors.set("lastAction","supplier");
                            }else{
                                if(leader.get("occupied") || IAValors.get("mint") == 0){
                                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                        handleLottoIA()
                                        IAValors.set("lastAction","lotto");
                                    }else{
                                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                            handleDifficultIA(IAValors.get("cards")[0],0);
                                            IAValors.set("lastAction","diff");
                                        }else{
                                            IAValors.set("lastAction","pass");
                                        }
                                    }
                                }else{
                                    leader.set("img", "leaderUsed.png");
                                    leader.set("occupied", true);
                                    IAValors.set("first",true);
                                    IAValors.set("mint",IAValors.get("mint")-1);
                                    IAValors.set("lastAction","leader");
                                    setVisibleLeader(true);
                                }
                            }
        
                        }else{
                            if(leader.get("occupied") || IAValors.get("mint") == 0){
                                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                    handleLottoIA()
                                    IAValors.set("lastAction","lotto");
                                }else{
                                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                        handleDifficultIA(IAValors.get("cards")[0],0);
                                        IAValors.set("lastAction","diff");
                                    }else{
                                        IAValors.set("lastAction","pass");
                                    }
                                }
                            }else{
                                leader.set("img", "leaderUsed.png");
                                leader.set("occupied", true);
                                IAValors.set("first",true);
                                IAValors.set("mint",IAValors.get("mint")-1);
                                IAValors.set("lastAction","leader");
                                setVisibleLeader(true);
                            }
                        }
                    }

                
                break;
            case "builder":
                
                if(Number(supplier.get("occupied")) <= 2 && activo.length === 0){
                   
                    let valorMasAlto = actualCards.get(0);
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                if(IAValors.get("mint") < valorMasAlto.value){
                                    valorMasAlto = actualCards.get(1);
                                }
                                actualCards.forEach((card)=>{
                                    if(valorMasAlto == undefined){
                                        return null;
                                    }
                                    if(IAValors.get("mint") >= card.value){
                                        if(card.value < valorMasAlto.value){
                                            valorMasAlto = card;
                                        }else if(card.value == valorMasAlto.value){
                                            if(card.type == CardTypes.utility && (valorMasAlto.type == CardTypes.deed || valorMasAlto.type == CardTypes.culture || valorMasAlto.type == CardTypes.production)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.deed && (valorMasAlto.type == CardTypes.production || valorMasAlto.type == CardTypes.culture)){
                                                valorMasAlto = card;
                                            }
                                            if(card.type == CardTypes.production && valorMasAlto.type == CardTypes.culture){
                                                valorMasAlto = card;
                                            }
                                        }
                                    }
                                    

                                })
                                if(valorMasAlto == undefined){
                                    return null;
                                }
                                
                                if(IAValors.get("mint") >= valorMasAlto.value){
                                    handleCompraIA(valorMasAlto);
                                    supplier.set("img", players < 4 ? `supplier1Used${supplier.get("occupied")}.png` : `supplierUsed${supplier.get("occupied")}.png`);
                                    supplier.set("occupied", 2);
                                    IAValors.set("lastAction","supplier");
                    }else{
                        if(leader.get("occupied") || IAValors.get("mint") == 0){
                            if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                                handleLottoIA()
                                IAValors.set("lastAction","lotto");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }else{
                            leader.set("img", "leaderUsed.png");
                            leader.set("occupied", true);
                            IAValors.set("first",true);
                            IAValors.set("mint",IAValors.get("mint")-1);
                            IAValors.set("lastAction","leader");
                            setVisibleLeader(true);
                        }
                    }

                }else{
                
                    if(leader.get("occupied") || IAValors.get("mint") == 0){
                        if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                            handleLottoIA()
                            IAValors.set("lastAction","lotto");
                        }else{
                            if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                                handleDifficultIA(IAValors.get("cards")[0],0);
                                IAValors.set("lastAction","diff");
                            }else{
                                IAValors.set("lastAction","pass");
                            }
                        }
                    }else{
                        leader.set("img", "leaderUsed.png");
                        leader.set("occupied", true);
                        IAValors.set("first",true);
                        IAValors.set("mint",IAValors.get("mint")-1);
                        IAValors.set("lastAction","leader");
                        setVisibleLeader(true);
                    }
                }
                break;

            case "supplier":

                if(leader.get("occupied") || IAValors.get("mint") == 0){
                    if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                        handleLottoIA()
                        IAValors.set("lastAction","lotto");
                    }else{
                        if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                            handleDifficultIA(IAValors.get("cards")[0],0);
                            IAValors.set("lastAction","diff");
                        }else{
                            IAValors.set("lastAction","pass");
                        }
                    }
                }else{
                    leader.set("img", "leaderUsed.png");
                    leader.set("occupied", true);
                    IAValors.set("first",true);
                    IAValors.set("mint",IAValors.get("mint")-1);
                    IAValors.set("lastAction","leader");
                    setVisibleLeader(true);
                }
                break;

            case "leader":
                if(!lotto.get("occupied") &&  IAValors.get("mint") >= 3){
                    handleLottoIA()
                    IAValors.set("lastAction","lotto");
                }else{
                    if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                        handleDifficultIA(IAValors.get("cards")[0],0);
                        IAValors.set("lastAction","diff");
                    }else{
                        IAValors.set("lastAction","pass");
                    }
                }
                break;
            case "lotto": 
                if(listaSortDifficult.length != 0 && !crow.get("occupied") || !swap.get("occupied") || !recycler.get("occupied") || !temp.get("occupied")){
                    handleDifficultIA(IAValors.get("cards")[0],0);
                    IAValors.set("lastAction","diff");
                }else{
                    IAValors.set("lastAction","pass");
                }
                break;
            case "diff":
                IAValors.set("lastAction","pass");
                break;
            
        }
    }



    const TurnIa = () => {
        if(IAValors.get("name") == "sonic"){
            SonicActions();
            SonicActions();
        }

        if(IAValors.get("name") == "mort"){
            MortActions();
        }
        if(IAValors.get("name") == "rachael"){
            RachaelActions();
        }
        if(IAValors.get("name") == "justin"){
            JustinActions();
        }
       
    }
    const MintsForAll = () => {
        console.log(minTokens);
        if(minTokens === 0){
            winner.set("username",String(IAValors.get("name")));
            winner.set("visible",true);
        }
        turno.set("firstTurn",false);

        TurnIa();   

        
        if(IAValors.get("lastAction") == "pass"){
          
            if (mypresence.first){
                update({first:false});
                const firstItem = self.connectionId;
                const lista = shuffleList.toArray().sort((x,y)=>{ return x === firstItem ? -1 : y === firstItem ? 1 : 0; });
                shuffleList.clear();
                
                lista.forEach((e)=>{
                    shuffleList.push(e);
                });
                turno.set("turn",Number(shuffleList.get(0)));
            }
     
            leader.set("img","leader.png");
            leader.set("occupied",false);
            swap.set("img","swap.png");
            swap.set("occupied",false);
            recycler.set("img","recycler.png");
            recycler.set("occupied",false);
            temp.set("img","temp.png");
            temp.set("occupied",false);
            crow.set("img","crow.png");
            crow.set("occupied",false);
            producer.set("img","producer.png");
            producer.set("occupied",1);
            builder.set("img", "builder1.png");
            builder.set("occupied",1);
            supplier.set("img","supplier1.png");
            supplier.set("occupied",1);
            let contador = 0;
            let countStars = 0;
            mypresence.cards.forEach((card:Card | undefined) => {
                if(card == null){
                    return null;
                }
                if(card.active){
                    if(card.name === "Wholesaler"){
                        if(wholesaler.get("occupied")){
                            contador = contador + 1;
                        }
                        wholesaler.set("img", "wholesaler.png");
                        wholesaler.set("occupied", false);
                    }
                    if(card.name === "Lotto"){
                        if(lotto.get("occupied")){
                            contador = contador + 2;
                        }
                        lotto.set("img", "lotto.png");
                        lotto.set("occupied", false);
                    }
                    const f = eval(card.name);
                    contador = contador+f(false)[0];
                    countStars = countStars+f(false)[1];
                }
            });

            update({stars:countStars});
            update({mint: mypresence.mint+1+contador});
            let contadorIA = 0;
            let countStarsIA = 0;

            IAValors.get("cards").forEach((card:Card | undefined) => {
                if(card == null){
                    return null;
                }
                if(card.active){
                    if(card.name === "Wholesaler"){
                        if(wholesaler.get("occupied")){
                            contadorIA = contadorIA + 1;
                        }
                        wholesaler.set("img", "wholesaler.png");
                        wholesaler.set("occupied", false);
                    }
                    if(card.name === "Lotto"){
                        if(lotto.get("occupied")){
                            contadorIA = contadorIA + 2;
                        }
                        lotto.set("img", "lotto.png");
                        lotto.set("occupied", false);
                    }
                    const f = eval(card.name);
                    contadorIA = contadorIA+f(true)[0];
                    countStarsIA = countStarsIA+f(true)[1];
                }
            });

           
            
            IAValors.set("mint",IAValors.get("mint")+1+contadorIA);
            IAValors.set("stars",countStarsIA);
            IAValors.set("lastAction","");

            if(IAValors.get("stars") >= 7 || mypresence.stars >= 7 || shopCards.length === 0){
                turno.set("visible",false);
                HandleWinner();
                
                roomList.forEach((room: { name: string | undefined; },index:  number)=>{
                    if(roomName === room.name){
                        dispatch(removeRoom(index));
                    }
                });
            }


            if(IAValors.get("first")){
                IAValors.set("first",false);
                TurnIa();
            }       
        }       
    }

    /**
     * If the value of the variable valorAlto is less than the value of the variable presence, then the
     * value of the variable valorAlto is equal to the value of the variable presence.
     */
    const HandleWinner = () => {
        const valorAlto = [mypresence.stars,mypresence.username,mypresence.cards.length,mypresence.mint];
        const IAValor = [IAValors.get("stars"),IAValors.get("name"),IAValors.get("cards").length,IAValors.get("mint")];
        if (valorAlto[0] > IAValor[0]){
        
            winner.set("username",String(valorAlto[1]));
            winner.set("visible",true);

        }else if(valorAlto[0] < IAValor[0]){
            winner.set("username",String(IAValor[1]));
            winner.set("visible",true);
        }else if(valorAlto[0] === IAValor[0]){
            if (valorAlto[3] > IAValor[3]){
        
                winner.set("username",String(valorAlto[1]));
                winner.set("visible",true);
    
            }else if(valorAlto[3] < IAValor[3]){
                winner.set("username",String(IAValor[1]));
                winner.set("visible",true);
            }else if(valorAlto[3] === IAValor[23]){
                if (valorAlto[2] > IAValor[2]){
        
                    winner.set("username",String(valorAlto[1]));
                    winner.set("visible",true);
        
                }else if(valorAlto[2] < IAValor[2]){
                    winner.set("username",String(IAValor[1]));
                    winner.set("visible",true);
                }else if(valorAlto[2] === IAValor[2]){
                    winner.set("username","TIE");
                    winner.set("visible",true);
                }
            }
        }
       
    }

    const ExitGame = () => {
        console.log("aqui se borra todo y se redirije a una ultima pagina de adios o al inicio");
    }

    /**
     * It takes a list of numbers, shuffles them, and then sets the first number in the list as the
     * first turn.
     */

    const WhoFirst = () => {

        shuffleList.push(self.connectionId);
        playersList.push(self.connectionId);
        

        initialiceIas();

        turno.set("firstTurn",true);
        turno.set("nuevaRonda",false);
        turno.set("turn",Number(shuffleList.get(0)));
        if(IAValors.get("name") == "Justin"){
            turno.set("visible",true);
        }
        setTimeout(()=>{ turno.set("visible",false);},2000);
    
    }

   if(countdown){
       return(
           <div>
               <h1>The game will start:</h1>
                <CountdownCircleTimer
                    key={"inicio"}
                    isPlaying={true}  
                    duration={1}
                    colors={'#43716c'}
                    size={50}
                    onComplete={() => {
                        WhoFirst();
                        setCountdown(false);
                    }}>

                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
           </div>
       )
   }
   
    return (
        <div onPointerMove={(event) => {
            handleOn(event);
          }}
          onPointerLeave={() => {
            update({cursor: null});
          }}>

            <Container style={{width: '100%'}}>
                <Row className="mb-8">
                    <Col className="p-2 d-flex justify-content-start">
                        <Shop />
                        <Board diff = {difficult}/>
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}} className="p-2 d-flex align-content-end" >
                    <Neighborhood id={self.connectionId} username={mypresence.username} mints={mypresence.mint} cards={mypresence.cards} stars={mypresence.stars} />
                    <div className="mx-auto">
                        <IA/>
                    </div>
                    
                </Row>
            </Container>

            <Modal className="Normal_modal" show={turno.get("visible")} onHide={() => turno.set("visible",false)} centered onExiting={() => MintsForAll()} >
                <ModalBody>
                    its {IAValors.get("name")} turn
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleProducer} onHide={() => setVisibleProducer(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the producer card to get 2 mints.
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleLeader} onHide={() => setVisibleLeader(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the leadership card to get the starting player token.
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleSupplier} onHide={() => setVisibleSupplier(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the Supplier card to get:
                    {IAValors.get("cards").reverse().map((card,index)=> {
                        if(index === IAValors.get("cards").length-1){
                            if(card == null){
                                return null;
                            }
                            return(
                                <div key={index}>
                                
                                    <ListGroup.Item variant="primary">
                                        <img alt="CardLotto" key={`shop-${card.id}`} src = {require(`../images/cards_images/${card.name.toUpperCase()}.PNG`)} style={{padding:'0px'}}/>
                                    </ListGroup.Item>
                            
                                </div>
                            
                            )
                        }
                        else{
                            return null;
                        }
                        
                    })}
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleBuilder} onHide={() => setVisibleBuilder(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the builder card to build ome of them cards.
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleWholesaler} onHide={() => setVisibleWholesaler(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the producer card to get 2 mints.
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleLotto} onHide={() => setVisibleLotto(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the lotto card to get a random card.
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleCrow} onHide={() => setVisibleCrow(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the crow card to get three mints.
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleRecycler} onHide={() => setVisibleRecycler(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the recycler to get mints equals to the cost and stars of a card.
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={visibleSwap} onHide={() => setVisibleSwap(false)} centered  >
                <ModalBody>
                    {IAValors.get("name")} have used the swap to change one of them card to another from the deck
                </ModalBody>
            </Modal>

            <Modal className="Normal_modal" show={winner.get("visible")} onHide={() => turno.set("visible",false)} backdrop="static" centered onExiting={() => ExitGame()} >
                <ModalBody>
                    {winner.get("username")} Wins !!! 
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => {navigate('/')}}>OK</Button> 
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default SoloGame;

