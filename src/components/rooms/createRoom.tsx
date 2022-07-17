import { actions } from "@liveblocks/redux";
import React, {useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { addRooms, changeRoom, RootState} from "../../store";

const user = (state:RootState) => state.username;

/* A form that allows you to create a room. */

export function CreateRoom() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(user);
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

    /**
     * When the switch is clicked, set the state of the switch to the opposite of what it currently is,
     * and set the state of the room to the opposite of what it currently is.
     */

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
        setRoom({...room,
            difficult: !isSwitchOn});
    }

    /**
     * The function handleName takes an event object as an argument, and returns a new room object with
     * the name property set to the value of the event target.
     * @param e - { target: { value: string; }; }
     */

    const handleName = (e: { target: { value: string; }; }) => {
      setRoom({...room,
              name: e.target.value});
    }

    /**
     * "If the input is empty, set the room to public, otherwise set the room to private and set the
     * password to the input value.
     * @param e - { target: { value: string; }; }
     */
    const handlePassword = (e: { target: { value: string; }; }) => {
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

    /**
     * The function takes an event object as an argument, and then sets the state of the room object to
     * the value of the event target.
     * @param e - { target: { value: string; }; }
     */
    const handlePlayers = (e: { target: { value: string; }; }) =>{ 
      setRoom({...room,
          players: Number(e.target.value)});
    }

    /**
     * "handleSubmit is a function that takes an event as an argument and returns nothing. The event is
     * of type React.FormEvent<HTMLFormElement>."
     * 
     * The function is called when the form is submitted. It prevents the default action of the form
     * (which is to reload the page) and then checks if the form is valid. If it is, it calls the
     * addRooms action creator and navigates to the room page. If it isn't, it stops the event from
     * propagating
     * @param event - { currentTarget: EventTarget & HTMLFormElement; preventDefault: () => void;
     * stopPropagation: () => void; }
     */
    
    const handleSubmit = (event: { currentTarget: EventTarget & HTMLFormElement; preventDefault: () => void; stopPropagation: () => void; }) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        
        event.stopPropagation();
      }
      else{
          dispatch(addRooms(room));
          dispatch(changeRoom(room));
          navigate(`/Room/${room.name}-${room.players}`);
          
      }
      setValidated(true);
    };

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
    
    return(
        <Container className="p-4">
            <h1 className="text-center p-4 "> Configuration </h1>
            <Row className="justify-content-center">
                <Form noValidate validated={validated} onSubmit={(e:React.FormEvent<HTMLFormElement>): void => handleSubmit(e)}>

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
                        <Form.Control onChange={(e: { target: { value: string }}) => handlePlayers(e)} required as="select" placeholder="Enter Password">
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

