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

    public render(){
        let whatLotto;
        if (this.state.build){

            whatLotto = require("../images/lotto.png");

        }else{
            whatLotto = require("../images/lotto1.png");
        }

        return(
            
            <img className='w-25 p-2' src = {whatLotto}/>
           
        );
    }
}
export default Lotto;