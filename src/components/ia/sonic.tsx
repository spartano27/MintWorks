import { useList, useObject } from "@liveblocks/react";
import React from "react";


function Sonic(){
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
  
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    if(turno == null || actualCards == null || shopCards == null || playersList == null || shuffleList == null){
        return null;
    }

   
    

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../../images/ias_images/SONIC.PNG")} style={{width:'125px'}} 
            onDragStart={(e) => DragHandler(e)}/>
        </div>

    );
    
}
export default Sonic;