import { Button, Card, Row, Col } from "reactstrap"
import Header from "../../Header/Header"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import{
    faKey,
    faUsers
  
  }from "@fortawesome/free-solid-svg-icons"
import './MyGroup.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyGroup =({sidebarIsOpen})=>{

    const handleJoin=(values)=>{
        

    }

    return(
        <div>
            <Header name={"My Group"} sidebarIsOpen={sidebarIsOpen}/>
            <Card className="group-card-div">
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
                                    <Col >
                                        <p >Group Name</p>
                                    </Col>
                                </Row>
                               
                                <Row className="mb-2 profile-row group-input-row"> 
                                    <Col xs='12' sm='4'>
                                        <FontAwesomeIcon className="group-input-icon" icon={faUsers}  />
                                       <Field className='yum' type='text' placeholder='Name'
                                        name='name' id='name'/>
                                         <ErrorMessage name="name">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                </Row>

                                <Row className="text-center"> 
                                    
                                    <Col>
                                        <p className="color-tan add-underline">Group Key</p>
                                    </Col>
                                    
                                </Row>
                                <Row className="mb-2 profile-row group-input-row"> 
                                    <Col xs='12' sm='4'>
                                        
                                        <FontAwesomeIcon className="group-input-icon" icon={faKey}  />
                                       <Field className='yum' type='text' placeholder='Key'
                                        name='key' id='key'/>
                                         <ErrorMessage name="key">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                </Row>
                                
                                
                            </Form>
                        </div>
                        
                    </Formik>
                
            </Card>
        </div>

    )

}

export default MyGroup