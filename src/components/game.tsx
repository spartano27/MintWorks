import React from "react";
import Board from "./board";
import IA from "./board_components/ia";
import Player from "../containers/player";
import Shop from "./shop";

interface IGameProps {
    players: number;
    currentPlayer: number;
    FirstPlayer: (curentPlayer: number) => any;
}

interface IGameState {

}


class Game extends React.Component<IGameProps,IGameState> {
    constructor(props: IGameProps){
        super(props);

    }

    /* A function that is called when the game starts. It is used to determine who goes first. */
    public WhoFirst = () => {
        var first = 0;
        if (this.props.players === 1){
            first = 0;
        }else{
            first = Math.round(Math.random()*(3));
            
        }
        
        this.props.FirstPlayer(first);
    }


    public render(){

        

        
        switch(this.props.players) {
            case 1:
                return(
                
                <div>
                    <div className="d-flex justify-content-center">                      
                    <Shop players={this.props.players}/>
                    
                    </div>
                    <div className="d-flex align-items-around ml-auto">
                        <Player playerId={0} />
                        <Board players={this.props.players}/> 
                        <IA players={this.props.players}/>  
                    </div>   
                </div>
                );
                break;               
            case 2:
                return(
                    <div className='bg-gradient-primary'>
                        <div className="d-flex justify-content-between">
                            <Player playerId={0}/>
                            <Shop players={this.props.players}/>
                            <div className="w-25">  </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <Player playerId={1}/>
                            <Board players={this.props.players}/> 
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
                            <Shop players={this.props.players}/>      
                            <Player playerId={1}/>    

                        </div>
                    
                    <div className="d-flex align-items-end">
                        <Player playerId={2}/>
                        <Board players={this.props.players}/>  
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
                        <Shop players={this.props.players}/>
                        <Player playerId={1}/>                        
                    </div>
                    <div className="d-flex align-items-end">
                        <Player playerId={2}/>
                        <Board players={this.props.players}/> 
                        <Player playerId={3}/>                        
                    </div>                   
                </div>
                );
                break;    
            default:
                return(
                
                    <div>
                        <div className="d-flex justify-content-center">                      
                        <Shop players={this.props.players}/>
                        
                        </div>
                        <div className="d-flex align-items-around ml-auto">
                            <Player playerId={0}/>
                            <Board players={this.props.players}/> 
                            <IA players={this.props.players}/>  
                        </div>   
                    </div>
                    );  
       }
    }    
}

export default Game;