import React from "react";

/**
 * The function Mint takes an object with a property called mints and returns a div with an image and
 * the value of mints.
 * @param valor - {mints:number}
 * @returns A React component.
 */

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