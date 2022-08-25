import React from "react";
import { Button, Row } from "react-bootstrap";

function Footer(){

    return(
        <footer className="mt-4" style={{backgroundColor:"#445868"}}>
            
            <Row className="d-flex justify-content-center">
                <div className="pt-4">
                    <Button href="/Contact" variant="secondary">Contact</Button>
                </div>
               
                <div className="pl-4 pt-4" >
                    <Button href="/Privacy" variant="secondary">Privacy</Button>
                </div>
               
                <div className="pl-4 pt-4">
                    <Button href="/Termsof" variant="secondary">Terms of Service</Button>
                </div>
               
                <div className="pl-4 pt-4">
                    <Button href="https://twitter.com/" variant="secondary">Twitter</Button>
                </div>
            </Row>        
        </footer>
    )

}
export default Footer;