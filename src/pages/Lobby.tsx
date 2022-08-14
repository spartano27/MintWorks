import e from 'express';
import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GButton from '../components/gButton';
import Footer from '../footer';
import { changeDifficult, RootState } from '../store';

/**
 * It returns a div that contains an image and a div that contains three buttons.
 * @returns A div with an image and a container with three buttons.
 */
 const user = (state:RootState) => state.username;
function Lobby(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(user);
    const [visible,setVisible] = useState(false);

    const handleDiff = () => {
        dispatch(changeDifficult(true));
        navigate(`/IndividualGame/Gl${username}-1-1`);
    } 
    return(
        
        <div style={{overflow:'hidden'}}>
            <img alt='LogoLobby' className="d-block mx-auto w-50" src={require("../images/logoMint.png")}/>
            <div className='container'>
                <div className='col-md-12 text-center p-2 '>
            
                    <Button className='btn-secondary h-25 w-25' onClick={() => setVisible(true)}> Solo Game </Button>
            
                </div> 
                <GButton title='Search a Game' link='/Buscar'/> 
                <GButton title='Create a Game' link='/Crear'/> 
            </div>
            <Footer/>
            <Modal className="Normal_modal" show={visible} onHide={() => setVisible(false)} backdrop="static" centered >
                <ModalBody>
                    You want to play on hard difficult?
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => handleDiff()}>Yes</Button> 
                    <Button variant="primary" onClick={() => {navigate(`/IndividualGame/Gl${username}-1-0`)}}>No</Button> 
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Lobby;