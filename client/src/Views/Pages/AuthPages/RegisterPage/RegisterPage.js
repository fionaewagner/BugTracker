import { Button, Card, Col, Row } from "reactstrap"
import {
  
    faMessage,
    faAddressBook,
    faRectangleList
   
    
  } from "@fortawesome/free-regular-svg-icons";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from "../../../../Controllers/Redux/authSlice";
import { register } from "../../../../actions/auth";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";





const RegisterPage=()=>{

    const dispatch = useDispatch();

    const [openTab, setOpenTab] = useState(0);

    const navigate = useNavigate();

    const handleRegister=(values)=>{
        const currentUser={
            username: values.username,
            email: values.email,
            password: values.password
        }
        console.log(currentUser);
        register(currentUser, navigate);
    dispatch(registerUser(currentUser));

}
    return(
        <div className="auth-page">
        <div className='auth-title'>
            <h1>Bug Tracker</h1>
            <p>Register</p>
        </div>
        <Row>
            <Col/>
            <Col>
                <div className="auth-card">
                    <Formik
                    initialValues={{email:'',username:'',password:'', remember:''}}
                    onSubmit={handleRegister}> 
                        <div className="auth-form">
                            <Form>
                                <Row className="mb-2">
                                    <Col xs='6'>
                                        <Field type='email' placeholder='Email'
                                        name='email' id='email'/>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs='6'>
                                        <Field type='text' placeholder='Username'
                                        name='username' id='username'/>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs='6'>
                                        <Field type='password' placeholder='Password'
                                        name='password' id='password'/>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <Field type='checkbox' id='remember' 
                                        name='remember' />
                                        {"   "}Remember me
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Button type="submit">Create New Account</Button>
                                    </Col>
                                </Row>
                                
                            </Form>
                        </div>
                        
                    </Formik>
                

                </div>
                <Row>
                    <Col/>
                        <Col xs='2'>
                            <Link to='/' className="rmv-dec">Log in</Link>
                        </Col>
                    <Col/>
                </Row>
            </Col>
            
            <Col/>
        </Row>    
        </div>
    )
}

export default RegisterPage