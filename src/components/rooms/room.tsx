import React from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";




function Room(){
    const {name} = useParams();
        return(
            <a> mi nombre de sala es: {name}</a>
        );
          
    
}

export default Room;