import React from 'react';
import {Container, Form, Row, Stack} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
class PlayButton extends React.Component {
public render() {
    return (
        
        <Container>
            <Row>
        
                <Form> 
                    <Form.Group className="mb-3" controlId="formUser">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" /> 
                        <Form.Text className="text-muted"> The username must be 8-20 characters long and must not contain spaces</Form.Text> 
                    </Form.Group>
                </Form>
                
                <Button className="w-3" variant="secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                    </svg> 
                </Button>
            </Row>
         </Container>
        
        
        
        
    );
}
}


export default PlayButton;