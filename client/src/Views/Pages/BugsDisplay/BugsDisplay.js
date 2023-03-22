import './BugsDisplay.css'
import { useSelector } from 'react-redux'
import { selectAllBugs } from '../../../Controllers/Redux/bugsSlice'
import { Card, Col, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../../Header/Header'
import { useEffect } from 'react'

const BugsDisplay=()=>{
    
    const bugs = useSelector(selectAllBugs)
    return(
        <div className='bugs-display'>
            <Header name={"Bugs"}/>
            <Row>
                <Col xs='11'>
            <Card className='bugs-card'>
            <Row>
                <Col xs='10' className='card-title mb-4'>
                    <h3>Your Bugs</h3>
                </Col>
            </Row>
            <Row>
                <Col xs='1'>
                </Col>
                <Col>
                   <Link to='/create' className='create-btn btn'>
                    Create new bug
                   </Link>
                </Col>
            </Row>
            <div className='bugs'>
                <Row>
                    <Col xs='3'>
                        <h5>Bug Title</h5>
                    </Col>
                    <Col>
                        <h5>Description</h5>
                    </Col>
                </Row>
                {bugs.map((bug)=>{
                    console.log(bug)
                    return(
                    <Link to={`${bug._id}`}>
                        <Row className='bug-row'>
                        <Col xs='3'>
                        {bug.name}
                        </Col>
                        <Col>
                        {bug.description}
                        </Col>
                        </Row>
                    </Link>)})}
            </div>
            </Card>
            </Col>
            </Row>
            </div>
            
    )

}

export default BugsDisplay