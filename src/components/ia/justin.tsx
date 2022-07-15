import React from "react";

function Justin(){

    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img  src = {require("../../images/ias_images/JUSTIN.PNG")} style={{width:'250px'}} 
            onDragStart={(e) => DragHandler(e)}/>
        </div>

    );    
}

export default Justin;