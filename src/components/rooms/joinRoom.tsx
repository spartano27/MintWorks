import { actions } from "@liveblocks/redux";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container,Modal,ModalBody,ModalFooter,ModalTitle, Form, Alert } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {changeRoom, modifyRoom, RootState } from "../../store";

const user = (state:RootState) => state.username;
const rooms = (state:RootState) => state.roomList;

/* The above code is a React component that is used to display a list of rooms that are available to
join. */
export function JoinRoom() {

    const roomList = useSelector(rooms);
    const username = useSelector(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible,setVisible] = useState(false);
    const [EsValido,setEsvalido] = useState(false);
    const [aviso,setAviso] = useState(false);
    const [full,setFull] = useState(false);
    
    useEffect(() => {
        dispatch(
          actions.enterRoom("rooms", {
            roomList: [],
            room: {}
          })
        );
        return () => {
          dispatch(actions.leaveRoom("rooms"));
        };
      }, [dispatch]);   
   
    /**
     * "If the room is public, add the user to the room and navigate to the room, otherwise, set the
     * visibility to true."
     * 
     * I'm trying to make a function that will add the user to the room and navigate to the room if the
     * room is public, otherwise, set the visibility to true
     * @param room - { publico: boolean, name: string, users: string[], players:number }
     */

    const handleClick = (room: {author:string, password:string, publico: boolean,difficult:boolean, name: string, users: string[], players:number }, index: number) => {
        if(room.users.length < room.players){
            if(room.publico){
                const newRoom = {author: room.author,publico: room.publico, password: room.password,difficult: room.difficult,name: room.name,users:[...room.users,username],players:room.players}
                dispatch(modifyRoom([index,newRoom]));
                dispatch(changeRoom(newRoom));
                navigate(`/Room/${room.name}-${room.players}`);
                
            }
            else{
                setVisible(true);
            }
        }
        else{
            setFull(true);
        }
    }

    /**
     * If the room has less than the maximum number of players, and the username is valid, then add the
     * username to the room and navigate to the room.
     * 
     * If the room has less than the maximum number of players, and the username is not valid, then set
     * the warning to true.
     * 
     * @param room - { name: string,users: string[], players:number }
     */
    const handleSubmit = (room: {author:string, password:string, publico: boolean,difficult:boolean, name: string, users: string[], players:number }, index: number) => {
        if(room.users.length < room.players){
            if(EsValido) {
                const newRoom = {author: room.author,publico: room.publico, password: room.password,difficult: room.difficult,name: room.name,users:[...room.users,username],players:room.players}
                dispatch(modifyRoom([index,newRoom]));
                dispatch(changeRoom(newRoom));
                navigate(`/Room/${room.name}-${room.players}`);
            }
            else{
                setAviso(true);
            }
        }
        else{
            setFull(true);
        }
    }

    /**
     * The function takes an event and a string, and if the event's target's value is equal to the
     * string, it sets the state to true, otherwise it sets the state to false.
     * @param e - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
     * @param {string} password - string -&gt; The password that the user has to enter.
     */
    
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,password: string) => {
        if(e.target.value === password ){
            setEsvalido(true);
        }
        else{
            setEsvalido(false);
        }
    }

    return(
        
        <Container>
            <h1 className="text-center p-4"> List of Rooms</h1>
            <Col className="justify-content-center">

                {roomList.map(function(item,index){
                    console.log(item);
                    return(

                        <div key={item.name}>
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
                                <Button variant="primary" onClick={() => handleSubmit(item,index)} >
                                    Submit 
                                </Button>
                                </ModalFooter>
                            </Modal>

                            <Modal  show={full} onHide={() => setFull(false)} >
                                <ModalBody>
                                    The room you try to access is full. Try another one!
                                </ModalBody>
                                <ModalFooter>
                                <Button variant="primary" onClick={() => setFull(false)} >
                                    Ok
                                </Button>
                                </ModalFooter>
                            </Modal>

                            <Card className="mx-auto justify-content-center" style={{width:"30rem"}} bg={item.publico ? "secondary": "success"}>
                                <Card.Header > {item.publico ? "Public room":"Private room"} </Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Subtitle className="mb-2">by: {item.author}</Card.Subtitle>
                                    <Card.Text>
                                            number of players: {item.players}
                                    </Card.Text>
                                    <Card.Text>        
                                            difficult: {item.difficult ? "Normal":"Hard"}                    
                                    </Card.Text>
                                    <Button onClick={() => handleClick(item,index)} className="flex-right ml-auto" type="submit"> Join </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )                        
                })} 
            </Col>
        </Container>
    );
}

