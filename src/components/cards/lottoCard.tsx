import React from "react";

interface ILottoCardProps {

}
interface ILottoCardState {
    build : boolean;
    owned : boolean;

}

class LottoCard extends React.Component<ILottoCardProps,ILottoCardState> {
    constructor(props : ILottoCardProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/LOTTO.PNG")}/>
           
        );
    }
}
export default LottoCard;