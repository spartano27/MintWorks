import React from "react";

interface IObeliskProps {

}
interface IObeliskState {
    build : boolean;
    owned : boolean;

}

class Obelisk extends React.Component<IObeliskProps,IObeliskState> {
    constructor(props : IObeliskProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img src = {require("../../images/cards_images/OBELISK.PNG")} style={{padding:'0px'}}/>
           
        );
    }
}
export default Obelisk;