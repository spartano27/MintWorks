import React from "react";

function Sonic(){
    
    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../../images/ias_images/SONIC.PNG")} style={{width:'250px'}} 
            onDragStart={(e) => DragHandler(e)}/>
        </div>

    );
    
}
export default Sonic;