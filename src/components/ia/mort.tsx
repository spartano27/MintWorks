import React from "react";


function Mort(){


    const DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    
    return(

        <div>
            <img alt="mort" src = {require("../../images/ias_images/MORT.PNG")} style={{width:'125px'}}
            onDragStart={(e) => DragHandler(e)} />   
           
        </div>

    );  
}

export default Mort;