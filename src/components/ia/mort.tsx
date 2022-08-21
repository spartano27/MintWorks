import { useList, useObject } from "@liveblocks/react";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import handleChangeTurn from "../../turn";

function Mort(){
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    const playersList = useList("listPLayer");
    const shuffleList = useList("listShuffle");
    const shopCards = useList("ShopCards");
    const actualCards = useList("ActualCards");
    const keyClock = useObject<{key:number}>("keyClock");

    const [visible,setVisible] = useState(false);

   
    if(turno == null || actualCards == null || shopCards == null || playersList == null || shuffleList == null ){
        return null;
    }

  
   
    
    
    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../../images/ias_images/MORT.PNG")} style={{width:'125px'}}
            onDragStart={(e) => DragHandler(e)} />   
           
        </div>

    );  
}

export default Mort;