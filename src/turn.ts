import { LiveList, Lson, LiveObject } from "@liveblocks/client";
import { useList, useMyPresence, useObject } from "@liveblocks/react";
import { useParams } from "react-router-dom";

type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
    actions: number;
    first: boolean;
    cursor: {
        x: number,
        y: number
      } | null
  };
  
const handleChangeTurn = (playersList: LiveList<Lson>,shuffleList: LiveList<Lson> | null,turno: LiveObject<{ firstTurn: any; turn: any; visible: any; nuevaRonda: any; }> | null) => {
 

    if(shuffleList == null || playersList == null || turno == null
        ){
        return null;
    }

    shuffleList.delete(0);
    if(shuffleList.length == 0){
        turno.set("nuevaRonda",true);   
        playersList.toArray().map((e) => {
            shuffleList.push(e);
        });
       
    }else{
        turno.set("nuevaRonda",false);
    }
    
    turno.set("turn",shuffleList.get(0));
    turno.set("visible",true);
    setTimeout(()=>{ turno.set("visible",false);},2000);
    

}

export default handleChangeTurn;