import { Card, Row, Col, Button } from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { selectAllBugs } from "../../../Controllers/Redux/bugsSlice";
import { addBug } from "../../../Controllers/Redux/bugsSlice";
import { createBug } from "../../../actions/bugs";
import { getName, selectGroupMembers, selectUser } from "../../../Controllers/Redux/authSlice";
import { getUser } from "../../../actions/auth";
import { useEffect } from "react";
const CreateBug=()=>{
    const dispatch = useDispatch()
    const bugs = useSelector(selectAllBugs)
    const user = useSelector(selectUser)
    const gpMembers = useSelector(selectGroupMembers)

    console.log("all members:" + gpMembers)

    

    useEffect(()=>{
        getUser(sessionStorage.getItem("userId"), dispatch)
    },[])

    

    const handleCreate=(values)=>{
        
        const date =  new Date()
        console.log(gpMembers)
        
        const bug = {
            name: values.name,
            description: values.description,
            project: values.project,
            priority: values.priority.toLowerCase(),
            creator: user._id,
            assigned: values.assigned,
            status: 'open',
            datePosted: date,
            groupId: user.groupId

        }
        console.log(bug)
        //createBug(bug)
        

    }
    return(
        <Formik 
        initialValues={{
            name: "",
            description:"",
            project:"",
            assigned:"",
            priority: "Low"
        }}
        onSubmit={handleCreate}>
            <Form>
                <Card className="bug-card">
            <div className="card-body">
                <div className="card-title title">
                    <p>Create Bug</p>
                </div>
                <Row className="card-row">
                    <Col xs='2'>
                    </Col>
                    <Col>
                        <p className="title">Bug Title</p>
                        <Field as='input' name='name' id='name'/>
                    </Col>
                    <Col>
                        <p className="title">Bug Description</p>
                        <Field as='input' name='description' id='description'/>
                    </Col>
                </Row>
                <Row  className="card-row">
                <Col xs='2'>
                    </Col>
                    <Col>
                        <p className="title">Project</p>
                        <Field as='input' name='project' id='project'/>
                    </Col>
                    <Col>
                        <p className="title">Priority</p>
                        <Field as='select' id='priority' name='priority'>
                            <option value="low">Low</option>
                            <option value="mid">Mid</option>
                            <option value="high">Urgent</option>
                            <option value="urgen">High</option>
                        </Field>
                    </Col>
                </Row >
                <Row  className="card-row">
                <Col xs='2'>
                    </Col>
                    <Col >
                        <p className="title">Assigned</p>
                        <Field as='input' name='assigned' id='assigned'/>
                    </Col>
                    
                </Row>
                <Row className="text-center mt-3">
                
                <Col>
                    <Button type='submit'>Submit</Button>
                </Col>
                
                </Row>
                
            </div>
            

       </Card>
       </Form>
        </Formik>
    )

}

export default CreateBug