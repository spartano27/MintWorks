import React from "react";
import { Row } from "react-bootstrap";
import Assembler from "./cards/assemblerCard";
import Bridge from "./cards/bridgeCard";

interface IShopProps {

}

interface IShopState {

}


class Shop extends React.Component<IShopProps,IShopState> {

constructor(props: IShopProps){
    super(props);
    this.state = {}
}

public render() {
    return (
        <Row className='justify-content-md-center'>
             <Assembler />
             <Bridge />
             <Assembler />
        </Row>
       
    );

}

}

export default Shop;
