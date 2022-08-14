import React from "react";

function Mort(){

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../../images/ias_images/MORT.PNG")} style={{width:'75px'}}
            onDragStart={(e) => DragHandler(e)} />   
        </div>

    );  
}

export default Mort;