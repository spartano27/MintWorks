import { actions } from "@liveblocks/redux";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container,Modal,ModalBody,ModalFooter,ModalTitle,Row, Form, Alert } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function JoinRoom() {
    const roomList = useSelector((state:any) => state.roomList);
    const username = useSelector((state:any) => state.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible,setVisible] = useState(false);
    const [EsValido,setEsvalido] = useState(false);
    const [aviso,setAviso] = useState(false);
    
    useEffect(() => {
        dispatch(
          actions.enterRoom("rooms", {
            roomList: [],
          })
        );
    
        return () => {
          dispatch(actions.leaveRoom("rooms"));
        };
      }, [dispatch]);   
   
    const handleClick = (room: { publico: boolean, name: string, users: any[], players:number }) => {
        if(room.users.length <= room.players){
            if(room.publico){
                room.users.push(username);
                console.log(room.users);
                navigate(`/Room/${room.name}-${room.players}`);
                
            }else{
                setVisible(true);
                console.log(visible);
                
            }
        }else{
            
        }


    }
    const handleSubmit = (room: { name: any,users: any[], players:number }) => {
        if(room.users.length <= room.players){
            if(EsValido) {
                room.users.push(username);
                console.log(room.users);    
                navigate(`/Room/${room.name}-${room.players}`);
            }else{
                setAviso(true);
            }
        }else{
            

    }
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,password: any) => {
        console.log(password)
        if(e.target.value === password ){
            setEsvalido(true);
        }else{
            setEsvalido(false);
        }
    }
        return(
            
            <Container>
    
                <h1 className="text-center p-4"> List of Rooms</h1>
                <Col className="justify-content-center">
                    
                            {roomList.map(function(item: any,i: React.Key | null | undefined){
                                console.log(item);
                                return(
                                    <div>


                                        <Modal show={visible} onHide={() => setVisible(false)} >
                                            <ModalHeader closeButton>
                                            <ModalTitle>Introduce the correct password</ModalTitle>
                                            </ModalHeader>
                                            <ModalBody>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label className="text-end p-2"> Password</Form.Label>
                                                    <Form.Control type="password" onChange={e => handlePassword(e,item.password)}/> 
                                                </Form.Group>
                                            </Form>
                                            <Alert show={aviso} className="mx-auto" variant="danger"> the password is wrong </Alert>
                                            </ModalBody>
                                            <ModalFooter>
                                            <Button variant="primary" onClick={() => handleSubmit(item)} >
                                                Submit 
                                            </Button>
                                            </ModalFooter>
                                        </Modal>
                                    <Card className="mx-auto justify-content-center" style={{width:"30rem"}} bg={item.publico ? "secondary": "success"}>
                                        <Card.Header > {item.publico ? "Public room":"Private room"} </Card.Header>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Subtitle className="mb-2">by: {item.author}</Card.Subtitle>
                                            <Card.Text>
                                                <Row className="p-2">
                                                    number of players: {item.players}
                                                </Row>
                                                <Row className="p-2">
                                                    difficult: {item.difficult ? "Normal":"Hard"}
                                                </Row >
                                            </Card.Text>
                                            <Button onClick={e => handleClick(item)} className="flex-right ml-auto" type="submit"> Join </Button>
                                        </Card.Body>
                                    </Card>
                                    </div>
                                    )
                                    
                            })} 
                </Col>
                

           </Container>
        );
    

}

