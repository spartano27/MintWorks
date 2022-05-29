
import React from "react";

function Mint( valor: any) {
   const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    console.log(valor);
    return(
        <div>
            
            <img  src = {require("../images/MENTA-BOTÓN.PNG")} style={{width:'50px',padding:'0px'}}
            onDragStart={(e) => DragHandler(e)} />
            x{valor.mints}
        </div>
    )
    

}

export default Mint;