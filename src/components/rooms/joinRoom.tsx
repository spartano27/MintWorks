import React from "react";
import { Button, Card, Col, Container, ListGroup,Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


export function JoinRoom() {
    const roomList = useSelector((state:any) => state.roomList);
    const dispatch = useDispatch();

    console.log(roomList);
    const handleClick = (room: { publico: any; }) => {
        if(room.publico){
            console.log("a");
        }else{
            console.log("b");
        }


    }
        return(
            
            <Container>
                <h1 className="text-center p-4"> List of Rooms</h1>
                <Col className="justify-content-center">
                    
                            {roomList.map(function(item: any,i: React.Key | null | undefined){
                                console.log(item);
                                return(
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
                                    </Card>)
                            })} 
                </Col>
                

           </Container>
        );
    

}

