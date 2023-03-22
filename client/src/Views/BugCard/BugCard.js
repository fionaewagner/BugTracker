import { Card, Col, Row, Container } from "reactstrap"
import './BugCard.css'
const BugCard = ({bug})=>{
    if(bug != undefined){
    const {name, description,project, priority, creator, assigned, datePosted,_id} = bug
    return(
       <Card className="bug-card">
        <div className="card-body">
            <div className="card-title title">
                <p>Details for Ticket #13</p>
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
                <Col xs='7'>
                    <p className="title">Assigned</p>
                    <p>{assigned}</p>
                </Col>
                <Col>
                    <p className="title">Creator</p>
                    <p>{creator}</p>
                </Col>
            </Row>
            <Row  className="card-row">
                <Col>
                   
                </Col>
                <Col >
                    <p className="title">Date Created</p>
                    <p>{datePosted}</p>
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