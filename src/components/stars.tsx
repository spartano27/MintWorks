import React from "react";

/**
 * The function Stars takes a parameter valor of type {stars:number} and returns a div containing an
 * image and the value of valor.stars
 * @param valor - {stars:number}
 */

function Stars(valor:{stars:number}) {

   const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img alt="Stars"  src = {require("../images/STAR.png")} style={{width:'40px',padding:'0px', marginRight:'5px'}}
            onDragStart={(e) => DragHandler(e)} />
            x{valor.stars}
        </div>
    )
}

export default Stars;