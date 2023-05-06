import { Button, Card, Col, Container, Row } from "reactstrap"
import {
  
    faMessage,
    faAddressBook,
    faRectangleList
   
    
  } from "@fortawesome/free-regular-svg-icons";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '../AuthPages.css'
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from "../../../../Controllers/Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../../actions/auth";




const LoginPage=()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin=(values)=>{
        const currentUser={
            email: values.email,
            password: values.password
        }
        console.log(currentUser)
        login(currentUser, navigate, dispatch)
    dispatch(signIn())

}
    return(
        <div className="auth-page">
            <div className='auth-title'>
                <h1 className="bug-title">Bug Tracker</h1>
                <p>Login</p>
            </div>
            <Row>
                <Col/>
                <Col>
                    <div className="auth-card">
                        <Formik
                        initialValues={{email:'',password:'', remember:''}}
                        onSubmit={handleLogin}> 
                            <div className="auth-form">
                                <Form>
                                    <Row className="mb-2">
                                        <Col xs='6'>
                                            <Field type='email' placeholder='Email'
                                            name='email' id='email'/>
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
                                        <Button type="submit">Sign in</Button>
                                        </Col>
                                    </Row>
                                    
                                </Form>
                            </div>
                            
                        </Formik>
                    

                    </div>
                    <Row>
                        <Col/>
                        <Col xs='5'>
                            <p>Forgot Password?</p>
                        </Col>
                        <Col xs='5'>
                            <Link className="rmv-dec" to='/register'>Create an Account</Link>
                        </Col>
                        <Col/>
                       
                    </Row>
                </Col>
                
                <Col/>
            </Row>    
        </div>
    )
}

export default LoginPage