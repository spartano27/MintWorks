import React from "react";

interface ISupplierProps {
    players : number;
}
interface ISupplierState {

}

class Supplier extends React.Component<ISupplierProps,ISupplierState> {
    constructor(props : ISupplierProps){
        super(props);
    }

    public render(){

        let whatSupplier;
        if(this.props.players < 4){
            whatSupplier = require("../images/supplier1.png")
        }else {
            whatSupplier = require("../images/supplier.png")
        }

        return(
            
            <img className='w-25 p-2' src = {whatSupplier}/>
            
        );
    }
}
export default Supplier;