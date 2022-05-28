import React from "react";
import Neighborhood from "./neighborhood";



function Player(valor: any){
        console.log(valor);
        return (
            <div>
            <Neighborhood id={valor.id} username={valor.username} mints={valor.mints} />
           
            </div>
        
        );
    
}

export default Player;