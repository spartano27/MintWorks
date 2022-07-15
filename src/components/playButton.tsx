import {useSelf} from '@liveblocks/react';
import React from 'react';
import {Alert, Container, Form, Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {changeUsername} from "../store";

function PlayButton() {

    let aviso;
    const dispatch = useDispatch();

    const [link,setLink] = React.useState({
        error: false,
        value: "/"
    });

    const PushName = (e: { target: { value: any; }; }) => {

        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let data = e.target.value

        if (data === '' || data.length < 8 || data.length > 21 || format.test(data)){
                
            console.log("The username must be 8-20 characters long and must not contain spaces");
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

        console.log("The username must be 8-20 characters long and must not contain spaces");
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

