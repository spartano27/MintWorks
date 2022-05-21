import React, { useEffect } from "react";
import Board from "./board";
import IA from "./board_components/ia";
import Player from "../containers/player";
import Shop from "./shop";
import { useList, useOthers } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "@liveblocks/redux";

interface IGameProps {
    players: number;
    currentPlayer: number;
    FirstPlayer: (curentPlayer: number) => any;
}

interface IGameState {

}


function Game(){
   

    /* A function that is called when the game starts. It is used to determine who goes first. */
   /* WhoFirst = () => {
        var first = 0;
        if (players === 1){
            first = 0;
        }else{
            first = Math.round(Math.random()*(3));
            
        }
        
        this.props.FirstPlayer(first);
    }
*/
    const {name} = useParams();
    const others = useOthers();
    const players = Number(String(name).split("-")[1]);
    const dispatch = useDispatch();

 

   

   if(others.count +1 < players){
       return (
           <h1> waiting </h1>
       )
   }
   else{

        

        
        switch(players) {
            case 1:
                return(
                
                <div>
                    
                    <div className="d-flex justify-content-center">                      
                    <Shop players={players}/>
                    
                    </div>
                    <div className="d-flex align-items-around ml-auto">
                        <Player playerId={0} />
                        <Board players={players}/> 
                        <IA players={players}/>  
                    </div>   
                </div>
                );
                break;               
            case 2:
                return(
                    
                    <div className='bg-gradient-primary'>
                        <div className="d-flex justify-content-between">
                            <Player playerId={0}/>
                            <Shop players={players}/>
                            <div className="w-25">  </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <Player playerId={1}/>
                            <Board players={players}/> 
                            <div className="w-25">  </div>
                        </div>               
                    </div>
                );
                break;    
            case 3:
                return(

                    <div>
                        <div className="d-flex justify-content-between">

                            <Player playerId={0}/>    
                            <Shop players={players}/>      
                            <Player playerId={1}/>    

                        </div>
                    
                    <div className="d-flex align-items-end">
                        <Player playerId={2}/>
                        <Board players={players}/>  
                        <div className="w-25">  </div>                    
                    </div>                   
                </div>
                );
                break;   
            case 4:
                return(
                <div className='bg-gradient-primary'>
                    <div className="d-flex justify-content-between">
                        <Player playerId={0}/>
                        <Shop players={players}/>
                        <Player playerId={1}/>                        
                    </div>
                    <div className="d-flex align-items-end">
                        <Player playerId={2}/>
                        <Board players={players}/> 
                        <Player playerId={3}/>                        
                    </div>                   
                </div>
                );
                break;    
            default:
                return(
                
                    <div>
                        <div className="d-flex justify-content-center">                      
                        <Shop players={players}/>
                        
                        </div>
                        <div className="d-flex align-items-around ml-auto">
                            <Player playerId={0}/>
                            <Board players={players}/> 
                            <IA players={players}/>  
                        </div>   
                    </div>
                    );  
       }
    }    
}

export default Game;