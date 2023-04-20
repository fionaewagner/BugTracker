import { useEffect, useState } from "react"
import { Card, Col, Row, Container } from "reactstrap"
import { getDisplayName } from "../../actions/auth"
import './BugCard.css'
const BugCard = ({bug})=>{
    const {name, description,project, priority, creator, assigned, datePosted,_id} = bug
    const [assignedUser, setAssignedUser] = useState("")
    const [creatorUser, setCreatorUser] = useState("")
    
    const [date, setDate] = useState("")
    

    useEffect(()=>{
        getDisplayName(assigned, setAssignedUser)
        getDisplayName(creator, setCreatorUser)
        setDate(formatDate(new Date()))
    },[])

    const formatDate=(dp)=>{
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
        const dayOfWeek = daysOfWeek[dp.getUTCDay()];
        const month = months[dp.getUTCMonth()];
        const dayOfMonth = dp.getUTCDate();
        const hours = dp.getUTCHours();
        const minutes = dp.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
  
        // Convert to 12-hour format
        const displayHours = hours % 12 || 12;
  
        return `${dayOfWeek}, ${month} ${dayOfMonth} ${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    




    if(bug != undefined){
    


    return(
       <Card className="bug-card">
        <div className="card-body">
            <div className="card-title title">
                <p>Ticket Details</p>
            </div>
            <Row className="card-row">
                <Col>
                    <p className="title">Bug Title</p>
                    <p>{name}</p>
                </Col>
                <Col>
                    <p className="title">Bug Description</p>
                    <p>{description}</p>
                </Col>
            </Row>
            <Row  className="card-row">
                <Col>
                    <p className="title">Project</p>
                    <p>{project}</p>
                </Col>
                <Col>
                    <p className="title">Priority</p>
                    <p>{priority}</p>
                </Col>
            </Row >
            <Row  className="card-row">
                <Col >
                    <p className="title">Assigned</p>
                    <p>{assignedUser}</p>
                </Col>
                <Col>
                    <p className="title">Creator</p>
                    <p>{creatorUser}</p>
                </Col>
            </Row>
            <Row  className="card-row text-center">
                
                <Col >
                    <p className="title">Date Created</p>
                    <p>{date}</p>
                </Col>
               
            </Row>
        </div>

       </Card>
        
    )
    }
    else{
        return <></>
    }

}

export default BugCard