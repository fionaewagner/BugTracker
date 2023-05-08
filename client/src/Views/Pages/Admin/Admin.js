import { Button, Card, Row, Col } from "reactstrap"
import Header from "../../Header/Header"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import{
    faKey,
    faUsers
  
  }from "@fortawesome/free-solid-svg-icons"
import './Admin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joinGroup } from "../../../actions/group";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import { updateUserGroup } from "../../../actions/auth";

const Admin =({sidebarIsOpen})=>{

    const userId = sessionStorage.getItem("userId")
    
    const handleJoin=(values)=>{

    }

    return(
        <div>
            <Header name={"Admin"} sidebarIsOpen={sidebarIsOpen}/>
            <Card className={sidebarIsOpen ? 'group-card-div-closed' : 'group-card-div-opn'}>
                <Formik
                        initialValues={{name:'',key:'',}}
                        onSubmit={handleJoin}
                        > 
                            <div className="auth-form">
                                <Form>
                                <Row>
                                    <Col className='group-card-title mb-4'>
                                        <h3>Edit Group Information</h3>
                                    </Col>
                                </Row>

                                    <Row className="text-center"> 
                                        <Col/>
                                        <Col xs='5'>
                                            <p className="add-underline pb-2">Group Name</p>
                                        </Col>
                                        <Col/>
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
                                    
                                    </Row>

                                    <Row className="text-center"> 
                                        <Col/>
                                        <Col xs='4'>
                                            <p className="add-underline pb-2">Group Key</p>
                                        </Col>
                                        <Col/>
                                        
                                    </Row>
                                    <Row className="mb-2 profile-row group-input-row"> 
                                    
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
                                        <Col xs='5' className="mt-3">
                                            <Button type="submit">Join Group</Button>
                                        </Col>
                                        <Col/>
                                    </Row>
                                </Form>
                            </div>
                            
                        </Formik>
                    
                
            </Card>
           
        </div>

    )

}

export default Admin