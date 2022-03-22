import React from "react";

interface IVaultProps {

}
interface IVaultState {
    build : boolean;
    owned : boolean;

}

class Vault extends React.Component<IVaultProps,IVaultState> {
    constructor(props : IVaultProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/VAULT.PNG")}/>
           
        );
    }
}
export default Vault;