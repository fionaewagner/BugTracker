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
import { deleteBug, getBugsForUserGroup, getTicketsFiltered } from '../../../actions/bugs';
import { getUser } from '../../../actions/auth';
import { selectGroupMembers, selectUser } from '../../../Controllers/Redux/authSlice';
import { Form, Formik, Field } from 'formik';
import { selectLoading } from '../../../Controllers/Redux/loadingSlice';
import Modal from '../../Modal/Modal';
import Loading from '../../Loading/Loading';


const BugsDisplay=({sidebarIsOpen})=>{
    const dispatch = useDispatch()
    const bugs = useSelector(selectAllBugs)
    const user = useSelector(selectUser)
    const [closingClass, setClosingClass] = useState("open")
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const gpMembers = useSelector(selectGroupMembers)
    const [marginLeft, setMarginLeft] = useState("0%");
    const [bugDelete, setBugDelete] = useState({})

    const [modalOpen, setModalOpen] = useState(false);
    const title = `Are you sure you want to delete bug '${bugDelete.name}'?`
    const text = "Doing so will remove this bug permanently."

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

    const handleSubmit=(values)=>{
        const {assigned, creator, priority, status} = values
        console.log(values)
        const filters = {
            assigned,
            creator,
            priority,
            status
        }
        getTicketsFiltered(dispatch, filters)
    }

    if(loading || !gpMembers){
        return(
            <Loading/>
        )
    }else{
    
    return(
        <div className={!sidebarIsOpen ? 'bugs-display' : 'bugs-display-open'}>
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
                <Dropdown isOpen={isOpen} className='mt-4'>
                    <DropdownToggle caret toggle={()=>console.log("toggled")} onClick={toggle}>Filters...</DropdownToggle>
                    <DropdownMenu>
                        <Formik
                        initialValues={{
                            assigned:"",
                            creator:"",
                            status:"",
                            priority:""
                        }}
                        onSubmit={handleSubmit}>
                            <Form>
                                <DropdownItem header>
                                    Assigned to...
                                </DropdownItem>
                                <DropdownItem>
                                <Field  as='select' id='assigned' name='assigned'>
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
                                <DropdownItem >
                                <Field  as='select' id='priority' name='priority'>
                                    <option value="">Select Priority...</option>
                                    <option value="low">Low</option>
                                    <option value="mid">Mid</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="high">High</option>
                                </Field>
                                </DropdownItem>
                                <DropdownItem header>
                                    Status...
                                </DropdownItem>
                                <DropdownItem >
                                    <Field  as='select' id='status' name='status'>
                                        <option value="open">Select status...</option>
                                        <option value="open">Open</option>
                                        <option value="pending">Pending</option>
                                        <option value="waiting">Waiting on 3rd Party</option>
                                        <option value="closed">Closed</option>
                                    </Field>
                                </DropdownItem>
                                <DropdownItem header>
                                    Created by...
                                </DropdownItem>
                                <DropdownItem>
                                    <Field as='select' id='creator' name='creator'>
                                        <option value="">Select a member...</option>
                                        {gpMembers.map(member => (
                                            <option key={member._id} value={member._id} >
                                                {member.username}
                                            </option>
                                        ))}
                                    </Field>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
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
                        <Row className='bug-row'>
                            <Col>
                            <Link to={`${bug._id}`} className='bug-display-itm'>
                                <Row >
                                    <Col xs='3' >
                                    {bug.name ? bug.name : "Untitled"}
                                    </Col>
                                    <Col>
                                    {bug.description ? bug.description : "No description available"}
                                    </Col>
                                    
                                </Row>
                            </Link>
                            
                            </Col>
                            <Col xs='1'>
                                {
                                        user.admin && 
                                    
                                    <Button onClick={()=>{
                                        setBugDelete(bug)
                                        setModalOpen(true)
                                    }}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                }
                            </Col>
                        </Row>
                    )})}
            </div>
            </Card>
            </Col>
            </Row>
            {modalOpen && <Modal 
            setOpenModal={setModalOpen} sidebarIsOpen={sidebarIsOpen}
            title={title} text={text} onModalCont={()=>deleteBug(bugDelete._id)}/>}
            </div>
    )
    }

}


export default BugsDisplay