
import React, { useState } from "react";
import {Button, Container, Form, Row } from "react-bootstrap";


function Contact(){

    const [validated,setValidated] = useState(false);
    const handleName = (e:any) => {

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }
   
    return(
        <Container  className="p-4">
            <h1 className="text-center p-4 "> Contact </h1>
            <Row style={{borderColor:'#bcd0cf',border:"double",borderRadius: '25px',padding: '25px'}} className="justify-content-center">
            <Form noValidate validated={validated} onSubmit={(e:React.FormEvent<HTMLFormElement>): void => handleSubmit(e)}>  
              <Row style={{borderColor:'#bcd0cf',borderBottomStyle:'double'}} className="p-4">

                    <Form.Group className="p-4">
                        <Form.Label className="text-center p-2"> Name</Form.Label>
                        <Form.Control required onChange={ e => handleName(e)} type="text" placeholder="Enter name"/> 
                        <Form.Control.Feedback type="invalid">
                                Please put a name
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="p-4">
                        <Form.Label className="text-center p-2"> Lastname</Form.Label>
                        <Form.Control onChange={ e => handleName(e)} type="text" placeholder="Enter lastname"/> 
                    </Form.Group>

                    <Form.Group className="p-4">
                        <Form.Label className="text-center p-2"> Email</Form.Label>
                        <Form.Control required onChange={ e => handleName(e)} type="text" placeholder="Enter email"/> 
                        <Form.Control.Feedback type="invalid">
                                Please put a correct Email
                        </Form.Control.Feedback>
                    </Form.Group>

              </Row>
              <Row className="p-4 justify-content-center">
                    <Form.Group style={{width:'200%',left:'50%'}} className="p-4">
                        <Form.Label className="text-center p-2"> Message</Form.Label>
                        <Form.Control  as="textarea" rows={4}  onChange={ e => handleName(e)} placeholder="Enter message"/> 
                    </Form.Group>
              </Row>
            
                    <Button style={{marginTop:'25px'}} className="mx-auto d-block" variant="secondary" type="submit"> Send Email</Button> 
                      
            </Form>
            </Row>
        </Container> 
    )

}
export default Contact;