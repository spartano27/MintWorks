import React from 'react';
import {Alert, Container, Form, Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {changeUsername} from "../store";

/* A function that is used to validate the username. */
function PlayButton() {

    let aviso;
    const dispatch = useDispatch();

    const [link,setLink] = React.useState({
        error: false,
        value: "/"
    });

    /**
     * If the input is empty, less than 8 characters, more than 21 characters, or contains a special
     * character, then set the error to true and the value to "/". Otherwise, set the error to false
     * and the value to "Lobby".
     * @param e - { target: { value: string; }; }
     */
    const PushName = (e: { target: { value: string; }; }) => {

        const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        const data = e.target.value

        if (data === '' || data.length < 8 || data.length > 21 || format.test(data)){
                
            const value1 = "/";
            const error1 = true;
            setLink({
                error : error1,
                value : value1,
            });
        }
        else{
                
            dispatch(changeUsername(data));
            const value1 = "Lobby";
            const error1 = false;
            setLink({
                error : error1,
                value : value1,
            });
        }   
    }

    if (link.error){

        aviso = <Alert className='mx-auto'variant='danger' style={{ width: "35rem" }}> 
        The username must be 8-20 characters long and must not contain spaces</Alert>;
    }
    
    return (

        <Container>
            <Row className="d-flex justify-content-center">
                <Form > 
                    <Form.Group className='form-inline' controlId="formUser">
                        <Form.Control  type="text"  name="username" placeholder="Enter Username" onChange={e => PushName(e)}/> 
                        <Link to={link.value} >  
                            <Button type="submit" style={{background:'transparent', border:0}}>
                                <img alt='MintPlay' style={{width:'80px'}} src={require("../images/MENTA-BOTÓN.PNG")}/> 
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
            </Row>
            {aviso}
        </Container>
    );
}

export default PlayButton;

