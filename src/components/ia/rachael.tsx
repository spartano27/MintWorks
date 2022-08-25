import React from "react";

function Rachael(){    
    
    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img alt="rachael"  src = {require("../../images/ias_images/RACHAEL.PNG")} style={{width:'125px'}} 
            onDragStart={(e) => DragHandler(e)} />
        </div>

    );
}

export default Rachael;