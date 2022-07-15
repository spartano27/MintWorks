import { actions } from "@liveblocks/redux";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { addRooms} from "../../store";

export function CreateRoom() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state:any) => state.username);
    const [isSwitchOn,setIsSwitchOn] = useState(false);
    const [validated,setValidated] = useState(false);
    const [room,setRoom] = useState({
        author: username,
        name: "",
        password: "",
        players: 2,
        difficult: false,
        publico: true,
        users: [username],
    });

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
        setRoom({...room,
            difficult: !isSwitchOn});
    }

    const handleName = (e: { target: { value: any; }; }) => {
      setRoom({...room,
              name: e.target.value});
    }

    const handlePassword = (e: { target: { value: any; }; }) => {
      if (e.target.value === ""){
          setRoom({...room,
              publico: true});
      }
      else{
          setRoom({...room,
              publico: false,
              password: e.target.value});
      }   
    }

    const handlePlayers = (e: { target: { value: any; }; }) =>{ 
      setRoom({...room,
          players: e.target.value});
    }

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else{
          dispatch(addRooms(room));
          navigate(`/Room/${room.name}-${room.players}`);
          
      }
      setValidated(true);
    };

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
    
    return(
        <Container className="p-4">
            <h1 className="text-center p-4 "> Configuration </h1>
            <Row className="justify-content-center">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label className="text-end p-2"> Author</Form.Label>
                        <Form.Control type="text" defaultValue={username} plaintext readOnly/> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-center p-2"> Room name</Form.Label>
                        <Form.Control required onChange={ e => handleName(e)} type="text" placeholder="Enter name"/> 
                        <Form.Control.Feedback type="invalid">
                                Please put a room name
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="p-2">Password</Form.Label>
                        <Form.Control onChange={ e => handlePassword(e)} type="password" placeholder="Enter Password"/> 
                    </Form.Group>

                    <h2 className="text-center p-4" > Rules </h2>

                    <Form.Group>
                        <Form.Label className="p-2">Number of players</Form.Label>
                        <Form.Control onChange={e => handlePlayers(e)} required as="select" placeholder="Enter Password">
                          <option className="d-none" value="">
                              Select Option
                          </option>
                          <option key={'2'} value="2"> 2 </option>
                          <option key={'3'} value="3"> 3 </option>
                          <option key={'4'} value="4"> 4 </option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Switch
                        className="p-4"
                        onChange={onSwitchAction}
                        id = "difficult"
                        label = "Hard Difficult?"
                        checked={isSwitchOn}/> 

                <Button type="submit" className="justify-content-center"> Crear</Button>       
                </Form>
            </Row>
        </Container> 
    );
}

