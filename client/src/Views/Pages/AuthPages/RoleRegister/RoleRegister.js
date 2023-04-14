import { Col, Row, Button, Card } from "reactstrap"
import {
    faArrowCircleRight
    
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Logo from '../../../../Images//Logo66-01.png'
import './RoleRegister.css'
import { Link } from "react-router-dom";

const RoleRegister=()=>{
    const [admin, setAdmin] = useState(false)
    const adminText = 
    `As an admin, you have the ability to create and manage your own group.
    You will be able to add users to your group, track their tickets,
    and manage any user accounts within your group.`
    const userText =
    `As a user, you have the ability to join a group and see all tickets from that group.
    You will be able to create, edit, and assign yourself to a ticket. However, you will lack permissions
    to create a group of your own and can only change your own user settings.`

    const handleOptionChange = (event) => {
        setAdmin(!admin);
      };

    return(   
        <div className="role-page-container">
            <Row>
                <div className="text-center mt-3">
                <img src={Logo} width='150' height='150'/>
                    <h1>Bug Tracker</h1>
                    <p>Register</p>
                </div>

            </Row>
            
            <Row className="role-page">
                
                <Col className="role-sel-card" xs='6'>
                    <Row className="mb-5">
                        <Col xs='3'/>
                            <Col>
                                <h3>I am an...</h3>
                            </Col>
                        <Col/>
                    </Row>
                    <Row>
                        <Col>
                            <label for='admin' className="form-control">
                            <input  id="admin" checked={admin} onChange={handleOptionChange}
                            className="radio-active"name="admin" type='radio'/>Admin</label>
                        </Col>
                        <Col>
                            <label for='user' className="form-control ">
                            <input id="user" checked={!admin} onChange={handleOptionChange}
                            className="radio-active"name="admin" type='radio'/>User</label>
                        </Col>
                    </Row>
                    
                </Col> 
                <Col className="role-txt-card" xs='6'>
                    <Row>
                        <h3>
                            {admin ? adminText : userText}
                        </h3>
                    </Row>  
                </Col>
                 
            </Row>
            <Row className="mt-2">
                    <Col xs='8'/>
                    <Col >
                        <Link to={admin? '/adreg' : '/userreg'} className="btn move-o">
                            Continue to {admin ? "admin " : "user "} register page{"   "}
                            <FontAwesomeIcon icon={faArrowCircleRight}/>
                        </Link>
                    </Col>
            </Row>
            
        </div>
       
    )
}

export default RoleRegister