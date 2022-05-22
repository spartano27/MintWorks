import React, { useEffect, useState } from "react";
import Board from "./board";
import IA from "./board_components/ia";
import Player from "./player";
import Shop from "./shop";
import { useList, useMyPresence, useOthers, useSelf } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";


type Presence = {
    focusedId: string | null;
    username: string;
  };


function Game(){
    const [mypresence,update] = useMyPresence<Presence>();
    const current = useSelf();
    const username = useSelector((state:any)=>state.username);
    useEffect(()=>{
        update({username:username});
        
      }, []);

    const {name} = useParams();
    const players = Number(String(name).split("-")[1]);
    const dispatch = useDispatch();
    const others = useOthers();
    const [listOthers,setListOthers] = useState(
        others.map(({presence}) => {
            if(presence == null){
                return null;
            }
            return(presence.username);
            
        }));
        
    
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
                        <Player id={0} username={mypresence.username}/>
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
                            <Player id={0} username={mypresence.username}/>
                            <Shop players={players}/>
                            <div className="w-25">  </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <Player id={1} username={listOthers[0]}/>
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

                            <Player id={0} username={mypresence.username}/>    
                            <Shop players={players}/>      
                            <Player id={1} username={listOthers[0]}/>  

                        </div>
                    
                    <div className="d-flex align-items-end">
                        <Player id={2} username={listOthers[1]}/>
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
                        <Player id={0} username={mypresence.username}/>
                        <Shop players={players}/>
                        <Player id={1} username={listOthers[0]}/>                        
                    </div>
                    <div className="d-flex align-items-end">
                        <Player id={2} username={listOthers[1]}/>
                        <Board players={players}/> 
                        <Player id={3} username={listOthers[2]}/>                        
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
                            <Player id={0} username={mypresence.username}/>
                            <Board players={players}/> 
                            <IA players={players}/>  
                        </div>   
                    </div>
                    );  
       }
    }    
}

export default Game;