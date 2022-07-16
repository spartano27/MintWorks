import { LiveList, Lson, LiveObject } from "@liveblocks/client";
  
const handleChangeTurn = (actualCards: LiveList<Lson>, shopCards: LiveList<Lson>,playersList: LiveList<Lson>,shuffleList: LiveList<Lson> | null,turno: LiveObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }> | null) => {

    if(shopCards == null || actualCards == null || shuffleList == null || playersList == null || turno == null
        ){
        return null;
    }

    shuffleList.delete(0);

    if(shuffleList.length === 0){
        turno.set("nuevaRonda",true); 
        for (let i = 0; i< shopCards.length; i++){
            if(actualCards.length < 3){
            actualCards.clear();
                if (shopCards.get(0) !== undefined && shopCards.get(1) !== undefined && shopCards.get(2) !== undefined){
                    actualCards.push(shopCards.get(0) || []);
                    actualCards.push(shopCards.get(1) || []);
                    actualCards.push(shopCards.get(2) || []);
                }
                else if(shopCards.get(0) !== undefined && shopCards.get(1) !== undefined){
                    actualCards.push(shopCards.get(0) || []);
                    actualCards.push(shopCards.get(1) || []);
                }
                else if(shopCards.get(0) !== undefined){
                    actualCards.push(shopCards.get(0) || []);
                }
            }
        }

        playersList.toArray().forEach((e) => {
            shuffleList.push(e);
        });
       
    }
    else{
        turno.set("nuevaRonda",false);
    }
    
    turno.set("turn",Number(shuffleList.get(0)));
    turno.set("visible",true);
    setTimeout(()=>{ turno.set("visible",false);},2000);
}

export default handleChangeTurn;