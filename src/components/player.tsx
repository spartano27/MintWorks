import React from "react";
import Neighborhood from "./neighborhood";



function Player(valor: any){
        return (
            <div>
            <Neighborhood id={valor.id} username={valor.username} mints={valor.mints} cards={valor.cards} />
           
            </div>
        
        );
    
}

export default Player;