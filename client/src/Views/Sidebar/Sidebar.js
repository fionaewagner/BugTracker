import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faChartBar,
  faAddressBook,
  faRectangleList,
  faUser
 
  
} from "@fortawesome/free-regular-svg-icons";
import{
  faGroupArrowsRotate,
  faBug,
  faUserShield

}from "@fortawesome/free-solid-svg-icons"
import { NavItem, NavLink, Nav, NavbarBrand, Button, Row, Col } from "reactstrap";
import classNames from "classnames";
import { Link, useLocation, useNavigate} from "react-router-dom";
import './Sidebar.css'
import Logo from '../../Images/Logo66-01.png'
import { useSelector } from "react-redux";
import { getName, selectUser } from "../../Controllers/Redux/authSlice";
import cx from 'classnames';



const SideBar = ({ isOpen, toggle }) => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const username = sessionStorage.getItem("username")
  const admin = sessionStorage.getItem("admin")

  console.log(username)
  

  const handleLogOff=()=>{
    sessionStorage.clear();
    navigate("../", { replace: true });
  }
  
  const location = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(true)
  

  return(

  <>
  
  <Button  className={cx('toggle-button', {
   'hidden': location.pathname ==='/' || location.pathname==='/register' 
   || location.pathname==='/userreg' || location.pathname==='/adreg',
   
})}  onClick={toggle} >
        <FontAwesomeIcon icon={faChartBar}  />
  </Button>


  <div className={classNames("sidebar",{ "is-open": isOpen } )} sticky='top'>
    <div className={location.pathname ==='/' || location.pathname==='/register' ? 'hidden' : 'yay'}>
    <Row className="sidebar-header text-center">
       <NavbarBrand  href="/" >
        <img src={Logo} width='150' height='150'/>
       </NavbarBrand>
    </Row>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
       
        <Row className="text-center">
          <Col>
            <h4>Bug Tracker</h4>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p>Welcome, {username}!</p>
          </Col>
        </Row>
        <NavItem>
          <NavLink tag={Link} to={"/dashboard"} className='link-name'>
            <FontAwesomeIcon icon={faChartBar} className="mr-3" />
            {'  '}Dashboard
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink tag={Link} to={"/bugs"} className='link-name'>
            <FontAwesomeIcon icon={faBug} className="mr-3" />
            {'  '}Bugs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/groups"} className='link-name'>
            <FontAwesomeIcon icon={faGroupArrowsRotate} className="mr-3" />
            {'  '}My Group
          </NavLink>
        </NavItem>
        {admin && <NavItem>
          <NavLink tag={Link} to={"/admin"} className='link-name'>
            <FontAwesomeIcon icon={faUserShield} className="mr-3" />
            {'  '}Admin Dashboard
          </NavLink>
        </NavItem>}
        <Button onClick={handleLogOff}>Log Off</Button>
      </Nav>
    </div>
    </div>
  </div>
  </>
  )
  
  
  }
  ;



export default SideBar;