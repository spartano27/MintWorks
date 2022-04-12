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

    DragHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    public render(){

        let whatSupplier;
        if(this.props.players < 4){
            whatSupplier = require("../../images/supplier1.png")
        }else {
            whatSupplier = require("../../images/supplier.png")
        }

        return(
            
            <img style = {{width:210}} src = {whatSupplier} onDragStart={this.DragHandler}/>
            
        );
    }
}
export default Supplier;