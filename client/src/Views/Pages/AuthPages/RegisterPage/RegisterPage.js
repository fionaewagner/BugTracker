import { Button, Card, Col, Row } from "reactstrap"
import {
  
    faMessage,
    faAddressBook,
    faRectangleList,
    faQuestionCircle
    
  } from "@fortawesome/free-regular-svg-icons";
  import{
    faKey,
    faUsers
  
  }from "@fortawesome/free-solid-svg-icons"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from "../../../../Controllers/Redux/authSlice";
import { register, userRegister } from "../../../../actions/auth";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import Logo from '../../../../Images//Logo66-01.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const RegisterPage=()=>{

    const dispatch = useDispatch();

    const [openTab, setOpenTab] = useState(0);

    const navigate = useNavigate();

    const handleRegister=(values)=>{
        const group = {
            name: values.name,
            key: values.key
        }
        const currentUser={
            username: values.username,
            email: values.email,
            password: values.password,
            group: group,
            admin: false
        }
        console.log(currentUser);
        userRegister(currentUser, navigate);
        dispatch(registerUser(currentUser));

}
    return(
        <div>
            <Row>
                <div className="text-center">
                <img src={Logo} width='130' height='130'/>
                    <h1 className="admin-reg-title">Bug Tracker</h1>
                    <p>User Registration</p>
                </div>

            </Row>
        <Row className="admin-reg-page">
            <Col/>
            <Col>
                <div className="reg-card">
                    
                    <Formik
                    initialValues={{email:'',username:'',password:'', remember:''}}
                    onSubmit={handleRegister}> 
                        <div className="auth-form">
                            <Form>
                                <Col className='group-card-title mb-2'>
                                    <h3>Your Information</h3>
                                </Col>
                                <Row className="label-row-user"> 
                                    <Col>
                                        <p>Email</p>
                                    </Col>
                                    <Col >
                                        <p>Username</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs='6'>
                                        <Field type='email' placeholder='Email'
                                        name='email' id='email'/>
                                    </Col>
                                    <Col xs='6'>
                                        <Field type='text' placeholder='Username'
                                        name='username' id='username'/>
                                    </Col>
                                </Row>
    
                                <Row className="label-row-user"> 
                                    
                                    <Col >
                                        <p>Password</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs='6'>
                                        <Field type='password' placeholder='Password'
                                        name='password' id='password'/>
                                    </Col>
                                </Row>
                    
                            <Row className="mt-4">
                                <Col className='group-card-title mb-4'>
                                    <h3>Group Information</h3>
                                </Col>
                            </Row>

                            <Row className="label-row">  
                                    <Col>
                                        <p >Group Name</p>
                                    </Col>
                                    <Col >
                                        <p >Group Key</p>
                                    </Col>
                                </Row>
                               
                                <Row className="group-input-row"> 
                                    
                                    <Col>
                                        <FontAwesomeIcon className="group-input-icon" icon={faUsers}  />
                                       <Field id='name' className='yum' type='text' placeholder='Name'
                                        name='name' id='name'/>
                                         <ErrorMessage name="name">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col>
                                        <FontAwesomeIcon className="group-input-icon" icon={faKey}  />
                                       <Field className='yum' type='text' placeholder='Key'
                                        name='key' id='key'/>
                                         <ErrorMessage name="key">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                   
                                </Row>

                                
                            <Row>
                                <Col/>
                                <Col>
                                    <Button type="submit">Create New Account</Button>
                                </Col>
                                <Col/>
                            </Row>
                         </Form>
                         </div>       
                                
                        
                     
                    </Formik>
                

                </div>
                <Row className="text-center">
                    
                        <Col >
                            <Link to='/' className="rmv-dec">Log in</Link>
                        </Col>
                </Row>
            </Col>
            
            <Col/>
        </Row>   
        </div>
    )
}

export default RegisterPage