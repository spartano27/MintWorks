import { actions } from "@liveblocks/redux";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container,Modal,ModalBody,ModalFooter,ModalTitle, Form, Alert, ListGroupItem, ListGroup } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {changeDifficult, changeRoom, modifyRoom, RootState } from "../../store";
import GButton from "../gButton";

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
                dispatch(changeDifficult(room.difficult));
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
            if(EsValido){
                const newRoom = {author: room.author,publico: room.publico, password: room.password,difficult: room.difficult,name: room.name,users:[...room.users,username],players:room.players}
                dispatch(changeDifficult(room.difficult));
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

    const [inputText,setInputText] = useState("");
    const inputHandler = (e: { target: { value: string; }; }) => {
        const lowercase = e.target.value.toLowerCase();
        setInputText(lowercase);
    };

    const [currentPage,setcurrentPage] = useState(1);
    const [itemsPerPage,setitemsPerPage] = useState(3);
    const [pageNumberLimit,] = useState(5);
    const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit,setMinPageNumberLimit] = useState(0);

    const handleClickPage = (event: { target: { id: number; }; }) =>{
        setcurrentPage(Number(event.target.id));
        console.log(currentPage);
    }

    const handleNextbtn = () => {
        setcurrentPage(currentPage+1);
        if(currentPage+1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    const handlePrevbtn = () => {
        setcurrentPage(currentPage-1);
        if((currentPage-1)%pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    const handleLoadMore = () => {
        setitemsPerPage(itemsPerPage+5);
    }

    const pages = [];
    for(let i=1; i<=Math.ceil(roomList.length/itemsPerPage);i++){
        pages.push(i);
    }
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = (inputText: string) => {
        const filteredData = roomList.filter((el: { name: string; })=>{
            if(inputText == ""){
                return el;
            }
            else{
                return el.name.toLowerCase().includes(inputText);
            }
        })
        console.log(filteredData.slice(indexOfFirstItem,indexOfLastItem));
        return filteredData.slice(indexOfFirstItem,indexOfLastItem);
        
    };
    const renderPageNumbers = pages.map(number=>{
       if(number < maxPageNumberLimit+1 && number>minPageNumberLimit){
        return(
            <ListGroupItem key={number} id={String(number)}  onClick={(e:any)=> handleClickPage(e)} 
            className={currentPage == number ? "active" : undefined}>
                {number}
            </ListGroupItem>
        )
       } else{
            return null;
       }
    });

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn = <ListGroupItem onClick={() => handleNextbtn()}> &hellip;</ListGroupItem>
    }
    let pageDecrementBtn = null;
    if(minPageNumberLimit >= 1){
        pageDecrementBtn = <ListGroupItem onClick={() => handlePrevbtn()}> &hellip;</ListGroupItem>
    }

    if(roomList.length === 0){
        return(
        <Container>
            <h1 className="text-center p-4"> List of Rooms</h1>
            <h2 className="text-center p-4"> There are currently no rooms created </h2>
            <GButton title='Create a Game!' link='/Crear'/> 
        </Container>
        );
    }
    return(
        
        <Container >
            <h1 className="text-center p-4"> List of Rooms</h1>
            <Col  className="justify-content-center">
                <Form className="p-4 justify-content-center">
                    <Form.Group>
                        <Form.Control className="mx-auto" style={{width:'50%'}}  type="text" placeholder="Search a room by name" onChange={(e) => inputHandler(e)} /> 
                    </Form.Group>
                </Form>
                {currentItems(inputText).map(function(item,index){
                    return(
                        
                        <div key={item.name}>
                            <Modal className="Normal_modal" centered show={visible} onHide={() => setVisible(false)} >
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
                                <ModalFooter style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <Button variant="primary" onClick={() => handleSubmit(item,index)} >
                                    Submit 
                                </Button>
                                </ModalFooter>
                            </Modal>

                            <Modal className="Warning_modal" centered show={full} onHide={() => setFull(false)} >
                                <ModalHeader>
                                    Oh no...
                                </ModalHeader>
                                <ModalBody>
                                    The room you try to access is full. Try another one!
                                </ModalBody>
                                <ModalFooter style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <Button variant="primary" onClick={() => setFull(false)} >
                                    Ok
                                </Button>
                                </ModalFooter>
                            </Modal>

                            <Card className="mx-auto justify-content-center" style={{width:"30rem"}} bg={item.publico ? "success": "danger"}>
                                <Card.Header > {item.publico ? "Public room":"Private room"} </Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Subtitle className="mb-2">by: {item.author}</Card.Subtitle>
                                    <Card.Text>
                                            number of players: {item.players}
                                    </Card.Text>
                                    <Card.Text>        
                                            difficult: {item.difficult ? "Hard":"Normal"}                    
                                    </Card.Text>
                                    <Button onClick={() => handleClick(item,index)} className="flex-right ml-auto" type="submit"> Join </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )                
                })} 

           <ListGroup horizontal className="pageNumbers">
            <ListGroupItem>
                <Button onClick={()=>handlePrevbtn()}
                disabled={currentPage==pages[0] ? true : false}>
                        Prev</Button>
            </ListGroupItem>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <ListGroupItem>
                <Button onClick={()=>handleNextbtn()}
                disabled={currentPage==pages[pages.length-1] ? true : false}>
                Next</Button>
            </ListGroupItem>
            </ListGroup>
            <Button onClick={()=>handleLoadMore()} className="mx-auto d-block mt-2">Load More</Button>
            </Col>
        </Container>
    );
}

