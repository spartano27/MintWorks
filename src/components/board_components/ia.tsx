import React from "react";
import Justin from '../ia/justin';
import Mort from '../ia/mort';
import Rachael from '../ia/rachael';
import Sonic from '../ia/sonic';

interface IIaProps{
players: number;
}

class IA extends React.Component<IIaProps>{
    constructor(props: IIaProps){
        super(props);
    }

    ias = [{id:'1',name:'justin',component: <Justin/>},{id:'2',name:'mort',component: <Mort/>}
            ,{id:'3',name:'rachael',component: <Rachael/>},{id:'4',name:'sonic',component: <Sonic/>}]

    public individual() {
        const rand = (1 + Math.random() * (4-1));
        if(this.props.players === 1){
            for(var i in this.ias){
                if(parseInt(this.ias[i].id) === Math.round(rand)){
                    return(
                        this.ias[i].component
                    );
                }
            }
            
        }
    }


    public render(){
        const ia = this.individual();
        console.log(ia)

        return(
            <div className="w-25">
                 {ia}
            </div>

        );

    }

}

export default IA;