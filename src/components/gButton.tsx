import React from 'react';
import { Button } from 'react-bootstrap';


interface IGButtonProps {
    title: string,
    link: string;
}

class GButton extends React.Component<IGButtonProps>{
    constructor(props : IGButtonProps){
        super(props);
    }

public render() {
    return(
        <div className='col-md-12 text-center p-2 '>
        <Button className='btn btn-secondary h-25 w-25' href={this.props.link}> {this.props.title}</Button>
        </div>
        
    );

}


}

export default GButton;