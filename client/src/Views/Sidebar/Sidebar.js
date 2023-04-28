import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faChartBar,
  faAddressBook,
  faRectangleList
 
  
} from "@fortawesome/free-regular-svg-icons";
import{
  faGroupArrowsRotate,
  faBug

}from "@fortawesome/free-solid-svg-icons"
import { NavItem, NavLink, Nav, NavbarBrand, Button } from "reactstrap";
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
    <div className="sidebar-header">
       <NavbarBrand  href="/" >
        <img src={Logo} width='150' height='150'/>
       </NavbarBrand>
      
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
       
        <h4>Bug Tracker</h4>
        
        <p>Welcome</p>
        <NavItem>
          <NavLink tag={Link} to={"/dashboard"} className='link-name'>
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            {'  '}Dashboard
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink tag={Link} to={"/bugs"} className='link-name'>
            <FontAwesomeIcon icon={faBug} className="mr-2" />
            {'  '}Bugs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/groups"} className='link-name'>
            <FontAwesomeIcon icon={faGroupArrowsRotate} className="mr-2" />
            {'  '}My Group
          </NavLink>
        </NavItem>
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