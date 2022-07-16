import React from "react";
import Justin from '../ia/justin';
import Mort from '../ia/mort';
import Rachael from '../ia/rachael';
import Sonic from '../ia/sonic';


function IA() {

    const ias = [{id:'1',name:'justin',component: <Justin/>},{id:'2',name:'mort',component: <Mort/>}
            ,{id:'3',name:'rachael',component: <Rachael/>},{id:'4',name:'sonic',component: <Sonic/>}]

    /**
     * The function returns a random component from the array of components.
     * @returns A component.
     */
    
    const ia = () =>  {
  
        const rand = (1 + Math.random() * (4-1));
            for(const i in ias){
                if(parseInt(ias[i].id) === Math.round(rand)){
                    return(
                        ias[i].component
                    );
            }
        }    
    }

        return(

            <div className="w-25">
                 {ia()}
            </div>

        );
}

export default IA;