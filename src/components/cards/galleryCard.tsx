import React from "react";

interface IGalleryProps {

}
interface IGalleryState {
    build : boolean;
    owned : boolean;

}

class Gallery extends React.Component<IGalleryProps,IGalleryState> {
    constructor(props : IGalleryProps){
        super(props);
        this.state = {build: false, owned: false};

    }

    public render(){
       
        return(
            
            <img className='p-2' style={{width: 200}} src = {require("../../images/cards_images/GALLERY.PNG")}/>
           
        );
    }
}
export default Gallery;