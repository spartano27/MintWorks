import React from "react";

function Stars( valor: any) {

   const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../images/STAR.png")} style={{width:'50px',padding:'0px'}}
            onDragStart={(e) => DragHandler(e)} />
            x{valor.stars}
        </div>

    )
}

export default Stars;