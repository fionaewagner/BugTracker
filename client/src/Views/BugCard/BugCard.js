import { useEffect, useState } from "react"
import { Card, Col, Row, Container, Button } from "reactstrap"
import { getDisplayName, getUser } from "../../actions/auth"
import Loading from "../Loading/Loading"
import { useDispatch, useSelector } from "react-redux"
import { selectLoading, setLoading } from "../../Controllers/Redux/loadingSlice"
import { Form, Formik, Field } from "formik"
import { selectGroupMembers } from "../../Controllers/Redux/authSlice"
import './BugCard.css'
import { updateBug } from "../../actions/bugs"
import{
    faPen,
    faFloppyDisk
  
  }from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const BugCard = ({bug})=>{
    const {name, description,project, priority, creator, assigned, status, datePosted,_id} = bug
    const [assignedUser, setAssignedUser] = useState("")
    const [creatorUser, setCreatorUser] = useState("")
    const [date, setDate] = useState("")
    const gpMembers = useSelector(selectGroupMembers)
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [displayName, setDisplayName] = useState(name ? name : `"Untitled Ticket"`)
    useEffect(()=>{
        getDisplayName(assigned, setAssignedUser)
        getDisplayName(creator, setCreatorUser)
        setDate(formatDate(datePosted))
    },[])

    const formatDate=(dateString)=>{
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours ? hours : 12;
        const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
        return formattedDate;
    }

    const formatCapitals = s => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const handleSubmit=(values)=>{
        const updatedBug = {
            name: displayName,
            description: values.description,
            project: values.project,
            priority: values.priority.toLowerCase(),
            assigned: values.assigned,
            status: values.status
        }
        console.log(updatedBug)
        updateBug(_id,updatedBug)

    }

    const loading = useSelector(selectLoading)
    if(loading || bug == undefined || creator == undefined 
        || datePosted == undefined || gpMembers == undefined || assigned == undefined ){
        return(
            <Loading/>
        )
    }else{
    return(
       <Card >
        <div className="card-body">
            <div className="mb-4">
                
                <Row className="bug-card-ttl text-center"> 
                    <Col/>
                    <Col>
                        {editMode ? <input onChange={(e)=>setDisplayName(e.target.value)}
                        className="header-input" placeholder="Edit Title"/> 
                        : <h1>{displayName}</h1>}
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col xs='12' sm='6' className="text-center bug-card-sub">
                        <p>{`Reported by ${creatorUser} at ${date} `}{"  "} 
                        <FontAwesomeIcon onClick={()=>setEditMode(!editMode)} icon={faPen}/></p> 
                    </Col>
                    <Col/>
                </Row>
            </div>
            <Formik
            initialValues={{
                description: description,
                project: project,
                priority: priority,
                assigned: assigned,
                status: status
            }}
            onSubmit={handleSubmit}>
                <Form className="bugcard-form">
                        <Row>
                            <Col>
                                <label for='priority' className="title"><b>Priority</b></label>
                            </Col>
                            <Col>
                                <label for='assigned' className="title"><b>Assigned</b></label>
                            </Col>
                            <Col>
                                <label for='status' className="title"><b>Status</b></label>
                            </Col> 
                        </Row>
                        <Row >
                            
                            <Col>
                                <Field as='select' id='priority' name='priority' className='bugcard-select'>
                                    <option value="low">Low</option>
                                    <option value="mid">Mid</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="high">High</option>
                                </Field>
                            </Col>
                            <Col>
                                <Field as='select' id='assigned' name='assigned' className='bugcard-select'>
                                    <option value={assigned}>{assignedUser}</option>
                                    {gpMembers.map(member => (
                                        (member._id !== assigned) && (
                                        <option key={member._id} value={member._id}>
                                            {member.username}
                                        </option>
                                        )
                                    ))}
                                </Field>
                            </Col>
                            <Col>
                                <Field as='select' id='status' name='status' className='bugcard-select'>
                                    <option value="open">Open</option>
                                    <option value="pending">Pending</option>
                                    <option value="waiting">Waiting on 3rd Party</option>
                                    <option value="closed">Closed</option>
                                </Field>
                            </Col>
                        </Row>
                    <Row> 
                        <Col>
                            <b className="title">Bug Details</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='12'>
                            <Field className='bugcard-input' component='textarea' id='description' name="description"/>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <Button type="submit">
                                <FontAwesomeIcon icon={faFloppyDisk}/>
                                {"  "}Save Bug
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
            </Formik>
            
        </div>

       </Card>
        
    )
    }

}

export default BugCard