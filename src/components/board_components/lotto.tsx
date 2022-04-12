import React from "react";

interface ILottoProps {

}
interface ILottoState {
    build : boolean;

}

class Lotto extends React.Component<ILottoProps,ILottoState> {
    constructor(props : ILottoProps){
        super(props);
        this.state = {build: false};

    }

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    public render(){
        let whatLotto;
        if (this.state.build){

            whatLotto = require("../../images/lotto.png");

        }else{
            whatLotto = require("../../images/lotto1.png");
        }

        return(
            
            <img style = {{width:210}} src = {whatLotto} onDragStart={this.DragHandler}/>
           
        );
    }
}
export default Lotto;