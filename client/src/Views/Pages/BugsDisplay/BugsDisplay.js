import './BugsDisplay.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { selectAllBugs } from '../../../Controllers/Redux/bugsSlice'
import { Card, Col, Row, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../../Header/Header'
import { useEffect, useState } from 'react'
import {
  
    faPlus,
    faTrash,
    faMagnifyingGlass
    
  } from "@fortawesome/free-solid-svg-icons";
import { getBugsForUserGroup } from '../../../actions/bugs';
import { getUser } from '../../../actions/auth';
import { selectGroupMembers } from '../../../Controllers/Redux/authSlice';
import { Form, Formik, Field } from 'formik';
import { selectLoading } from '../../../Controllers/Redux/loadingSlice';
import Loading from '../../Loading/Loading';


const BugsDisplay=({sidebarIsOpen})=>{
    const dispatch = useDispatch()
    const bugs = useSelector(selectAllBugs)
    const [closingClass, setClosingClass] = useState("open")
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const gpMembers = useSelector(selectGroupMembers)

    const loading = useSelector(selectLoading)

  const toggleDropdown = () => setIsOpen(prevState => !prevState);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

    useEffect(()=>{
        getUser(sessionStorage.getItem("userId"), dispatch)
        getBugsForUserGroup(dispatch)
    },[])

    if(loading || !gpMembers){
        return(
            <Loading/>
        )
    }else{
    
    return(
        <div className='bugs-display'>
            <Row>
                <Col xs='11'>
            <Card className='bugs-card'>
            <Row>
                <Col xs='10' className='card-title '>
                    <h3>Your Bugs</h3>
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col xs='1'/>
                <Col>
                    <FontAwesomeIcon className="group-input-icon" icon={faMagnifyingGlass}  />
                    <input id='name' className='yum pt-1 pb-1' type='text' placeholder='Search all bugs...'
                    name='name' id='name'/>             
                </Col>
                <Col>
                <Dropdown isOpen={isOpen} toggle={toggle} className='mt-4'>
                    <DropdownToggle caret>Filters...</DropdownToggle>
                    <DropdownMenu>
                        <Formik
                        initialValues={{
                            assigned:"",
                            creator:""
                        }}>
                            <Form>
                                <DropdownItem header>
                                    Assigned to...
                                </DropdownItem>
                                <DropdownItem>
                                <Field onClick={stopPropagation} as='select' id='assigned' name='assigned'>
                                    <option value="">Select a member...</option>
                                    {gpMembers.map(member => (
                                        <option key={member._id} value={member._id} >
                                            {member.username}
                                        </option>
                                    ))}
                                </Field>
                                </DropdownItem>
                                <DropdownItem header>
                                    Priority...
                                </DropdownItem>
                                <DropdownItem onClick={() => console.log('Action 1 clicked')}>
                                <Field onClick={stopPropagation} as='select' id='priority' name='priority'>
                                    <option value="low">Low</option>
                                    <option value="mid">Mid</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="high">High</option>
                                </Field>
                                </DropdownItem>
                                <DropdownItem header>
                                    Status...
                                </DropdownItem>
                                <DropdownItem onClick={() => console.log('Action 2 clicked')}>
                                    <Field onClick={stopPropagation} as='select' id='status' name='status'>
                                        <option value="open">Open</option>
                                        <option value="pending">Pending</option>
                                        <option value="waiting">Waiting on 3rd Party</option>
                                        <option value="closed">Closed</option>
                                    </Field>
                                </DropdownItem>
                                <DropdownItem header>
                                    Created by...
                                </DropdownItem>
                                <DropdownItem onClick={() => console.log('Action 2 clicked')}>
                                    <Field onClick={stopPropagation} as='select' id='creator' name='creator'>
                                        <option value="">Select a member...</option>
                                        {gpMembers.map(member => (
                                            <option key={member._id} value={member._id} >
                                                {member.username}
                                            </option>
                                        ))}
                                    </Field>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => console.log('Action 3 clicked')}>
                                    <Button type='submit'>Apply Filters</Button>
                                </DropdownItem>
                            </Form>
                        </Formik>
                    </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col xs='2' className='new-bug-btn mt-4'>
                    <Button>
                        <Link to='/create' className='new-bug-btn'>
                            <FontAwesomeIcon icon={faPlus}/>{"  "}New Bug
                        </Link>
                   </Button> 
                </Col>
                <Col/>
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

}

/**
 * <Dropdown isOpen={isOpen} toggle={toggleDropdown} className="my-dropdown" >
                    <DropdownToggle caret>
                        {selectedOption || 'Select an option'}
                    </DropdownToggle>
                    <DropdownMenu className={`${isOpen ? 'show ' : ''}${closingClass}`}>
                        <DropdownItem onClick={() => handleOptionSelect('Option 1')}>
                        Option 1
                        </DropdownItem>
                        <DropdownItem onClick={() => handleOptionSelect('Option 2')}>
                        Option 2
                        </DropdownItem>
                        <DropdownItem onClick={() => handleOptionSelect('Option 3')}>
                        Option 3
                        </DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
 * 
 */

export default BugsDisplay