import React from "react";

function Rachael(){
    
    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../../images/ias_images/RACHAEL.PNG")} style={{width:'250px'}} 
            onDragStart={(e) => DragHandler(e)} />
        </div>

    );
}

export default Rachael;