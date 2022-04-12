import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


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
            <Link to={this.props.link}>
                <Button className='btn btn-secondary h-25 w-25'> {this.props.title}</Button>
            </Link>
        
        </div>
        
    );

}


}

export default GButton;