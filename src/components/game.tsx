import React from "react";
import {ListGroup} from "react-bootstrap";
import Board from "./board";
import IA from "./ia";
import Neighborhood from "./neighborhood";
import Shop from "./shop";

interface IGameProps {
    players: number;

}

interface IGameState {

}


class Game extends React.Component<IGameProps,IGameState> {
    constructor(props: IGameProps){
        super(props);

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
                        <Neighborhood/>
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
                            <Neighborhood/>
                            <Shop players={this.props.players}/>
                            <div className="w-25">  </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <Neighborhood/>
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

                            <Neighborhood/>    
                            <Shop players={this.props.players}/>      
                            <Neighborhood/>    

                        </div>
                    
                    <div className="d-flex align-items-end">
                        <Neighborhood/>
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
                        <Neighborhood/>
                        <Shop players={this.props.players}/>
                        <Neighborhood/>                        
                    </div>
                    <div className="d-flex align-items-end">
                        <Neighborhood/>
                        <Board players={this.props.players}/> 
                        <Neighborhood/>                        
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
                            <Neighborhood/>
                            <Board players={this.props.players}/> 
                            <IA players={this.props.players}/>  
                        </div>   
                    </div>
                    );  
       }
    }    
}

export default Game;