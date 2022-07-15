import React from "react";

function Mint( valor:{mints:number}) {

   const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img alt="Mints" src = {require("../images/MENTA-BOTÓN.PNG")} style={{width:'50px',padding:'0px'}}
            onDragStart={(e) => DragHandler(e)} />
            x{valor.mints}
        </div>
    );
}

export default Mint;