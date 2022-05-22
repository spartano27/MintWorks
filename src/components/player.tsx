import React from "react";
import Neighborhood from "./neighborhood";



function Player(id: any){
    
        return (
            <div>
            <Neighborhood id={id.id} username={id.username} />
           
            </div>
        
        );
    
}

export default Player;