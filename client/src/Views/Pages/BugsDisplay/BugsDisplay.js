import './BugsDisplay.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { selectAllBugs } from '../../../Controllers/Redux/bugsSlice'
import { Card, Col, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../../Header/Header'
import { useEffect } from 'react'
import {
  
    faPlus
    
  } from "@fortawesome/free-solid-svg-icons";
import { getBugsForUserGroup } from '../../../actions/bugs';

const BugsDisplay=({sidebarIsOpen})=>{

    const dispatch = useDispatch()
    
    const bugs = useSelector(selectAllBugs)

    useEffect(()=>{
        getBugsForUserGroup(dispatch)
    },[])
    return(
        <div className='bugs-display'>
            <Header name={"Bugs"} sidebarIsOpen={sidebarIsOpen}/>
            <Row>
                <Col xs='11'>
            <Card className='bugs-card'>
            <Row>
                <Col xs='10' className='card-title mb-4'>
                    <h3>Your Bugs</h3>
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col xs='1'/>
                <Col xs='2' className='new-bug-btn'>
                   <Link to='/create' className='create-btn btn'>
                        <FontAwesomeIcon icon={faPlus}/>{"  "}New Bug
                   </Link> 
                   
                </Col>
            </Row>
            <div className='bugs'>
                <Row className='mb-3'>
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
                    <Link to={`${bug._id}`} className='bug-display-itm'>
                        <Row className='bug-row'>
                            <Col xs='3' >
                            {bug.name ? bug.name : "Untitled"}
                            </Col>
                            <Col>
                            {bug.description ? bug.description : "No description available"}
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