import { useObject } from "@liveblocks/react";
import React from "react";

function Justin(){
    const turno = useObject<{ firstTurn: boolean; turn: number; visible: boolean; nuevaRonda: boolean; }>("turno");
    if(turno == null){
        return null;
    }
    
    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../../images/ias_images/JUSTIN.PNG")} style={{width:'125px'}} 
            onDragStart={(e) => DragHandler(e)}/>
        </div>

    );    
}

export default Justin;