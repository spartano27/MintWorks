import React from 'react';
import {Alert, Container, Form, Row, Stack} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


interface IPlayButtonProps {
    username: string;
    usernameChange: (username: string) => any;
}

interface IPlayButtonState {
    link: string,
    usernameErr: boolean;
}

class PlayButton extends React.Component<IPlayButtonProps,IPlayButtonState> {
    constructor(props : IPlayButtonProps){
        super(props);
        this.state = {link : '', usernameErr: false};
    }


   
public render() {
    let aviso;
    
    const toLink = (e: { target: { value: any; }; }) => {
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const user = this.props.username;
        console.log(user)
       
        if (user === '' || user.length < 7 || user.length > 21 || format.test(user)){
    
                console.log("The username must be 8-20 characters long and must not contain spaces");
                this.setState({usernameErr : true});
                this.props.usernameChange(e.target.value);
                this.setState({link : '/'});
        }
        else{
                this.setState({usernameErr : false});
                this.props.usernameChange(e.target.value);
                this.setState({link : 'Lobby'});
    
                }
        }
    if (this.state.usernameErr){

        console.log("The username must be 8-20 characters long and must not contain spaces");
        aviso = <Alert className='mx-auto'variant='danger' style={{ width: "35rem" }}> 
        The username must be 8-20 characters long and must not contain spaces</Alert>;
    }
    
    return (
        
        <Container>
            
            <Row className="d-flex justify-content-center">
        
                <Form > 
                    <Form.Group className='mb-2' controlId="formUser">
                        
                        <Form.Control  type="text"  name="username" placeholder="Enter Username" onChange={e => toLink(e)} /> 
                        
                    </Form.Group>
                </Form>
                <Link className="h-25 ml-2" to={this.state.link} >  
                    <Button className="h-25 ml-2"  variant="secondary">
                        <img src={require("../images/MENTA-BOTÓN.PNG")}/> 
                    </Button>
                
                </Link>
                
                
            </Row>
            {aviso}
         </Container>
        
        
        
        
    );
}
}


export default PlayButton;