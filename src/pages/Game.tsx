import React from 'react';  
import Board from '../components/board';
import Clock from '../components/clock';
import Shop from '../components/shop';
import Neighborhood from '../components/neighborhood';


class Game extends React.Component {

    public render() {
        return (
            <body className='bg-gradient-primary'>
                          
                            <Neighborhood players={4} />
                        
                        
                    
                
            
            
            
            
            
            </body>
        );
    }
}

export default Game;