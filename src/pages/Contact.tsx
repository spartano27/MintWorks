
import React, {useState } from "react";
import {Button, Container, Form, Row } from "react-bootstrap";
import emailjs from '@emailjs/browser';

function Contact(){
    const [validated,setValidated] = useState(false);
    const [email,setEmail] = useState({
        name: "",
        lastname: "",
        email: "",
        message: ""
    });
    const handleName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail({...email,
        name: e.target.value});
    }
    const handleLastName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail({...email,
        lastname: e.target.value});
    }
    const handleMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail({...email,
        message: e.target.value});
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail({...email,
        email: e.target.value});
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        const form = event.currentTarget;
        console.log(form);
        event.preventDefault();
        if (form.checkValidity() === false) {
        
        event.stopPropagation();
      }else{
        emailjs.sendForm('service_c6qrhyp', 'template_zmrni3n', form, '2xsPPdeI8M0Qe2sMe')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      }

      setValidated(true);
    }
   
    return(
        <Container  className="p-4">
            <h1 className="text-center p-4 "> Contact </h1>
            <Row  style={{borderColor:'#bcd0cf',border:"double",borderRadius: '25px',padding: '25px'}} className="justify-content-center">
            <Form  noValidate validated={validated} onSubmit={(e): void => handleSubmit(e)}>  
              <Row style={{borderColor:'#bcd0cf',borderBottomStyle:'double'}} className="p-4">

                    <Form.Group className="p-4">
                        <Form.Label className="text-center p-2"> Name</Form.Label>
                        <Form.Control required onChange={ e => handleName(e)} type="text" placeholder="Enter name" name="user_name"/> 
                        <Form.Control.Feedback type="invalid">
                                Please put a name
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="p-4">
                        <Form.Label className="text-center p-2"> Lastname</Form.Label>
                        <Form.Control onChange={ e => handleLastName(e)} type="text" placeholder="Enter lastname" name="user_lastname"/> 
                    </Form.Group>

                    <Form.Group className="p-4">
                        <Form.Label className="text-center p-2"> Email</Form.Label>
                        <Form.Control required onChange={ e => handleEmail(e)} type="email" placeholder="Enter email" name="user_email"/> 
                        <Form.Control.Feedback type="invalid">
                                Please put a correct Email
                        </Form.Control.Feedback>
                    </Form.Group>

              </Row>
              <Row className="p-4 justify-content-center">
                    <Form.Group style={{width:'200%',left:'50%'}} className="p-4">
                        <Form.Label className="text-center p-2"> Message</Form.Label>
                        <Form.Control required  as="textarea" rows={4}  onChange={ e => handleMessage(e)} placeholder="Enter message" name="message"/> 
                    </Form.Group>
              </Row>
            
                    <Button style={{marginTop:'25px'}} className="mx-auto d-block" variant="secondary" type="submit"> Send Email</Button> 
                      
            </Form>
            </Row>
        </Container> 
    )

}
export default Contact;