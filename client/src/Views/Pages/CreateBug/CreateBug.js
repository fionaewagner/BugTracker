import { Card, Row, Col, Button } from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { selectAllBugs } from "../../../Controllers/Redux/bugsSlice";
import { addBug } from "../../../Controllers/Redux/bugsSlice";
import { createBug } from "../../../actions/bugs";
import { getName } from "../../../Controllers/Redux/authSlice";
const CreateBug=()=>{
    const dispatch = useDispatch()
    const bugs = useSelector(selectAllBugs)
    const user = useSelector(getName)
    

    const handleCreate=(values)=>{
        
        const date =  new Date()
        const bug = {
            name: values.name,
            _id: bugs.length + 1,
            description: values.description,
            project: values.project,
            priority: values.priority.toLowerCase(),
            creator: user,
            assigned: values.assigned,
            status: 'open',
            datePosted: date

        }
        console.log(bug.priority)
        createBug(bug)
        

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
                    <Col xs='7'>
                        <p className="title">Assigned</p>
                        <Field as='input' name='assigned' id='assigned'/>
                    </Col>
                    
                </Row>
                
            </div>
            <Button type='submit'>Submit</Button>

       </Card>
       </Form>
        </Formik>
    )

}

export default CreateBug