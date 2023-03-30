import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faChartBar,
  faAddressBook,
  faRectangleList
 
  
} from "@fortawesome/free-regular-svg-icons";
import { NavItem, NavLink, Nav, NavbarBrand, Button } from "reactstrap";
import classNames from "classnames";
import { Link, useLocation, useNavigate} from "react-router-dom";
import './Sidebar.css'
import Logo from '../../Images/Logo66-01.png'
import { useSelector } from "react-redux";
import { getName } from "../../Controllers/Redux/authSlice";
import cx from 'classnames';



const SideBar = ({ isOpen, toggle }) => {
  const navigate = useNavigate()
  

  const handleLogOff=()=>{
    sessionStorage.clear();
    navigate("../", { replace: true });
  }
  const userName = useSelector(getName)
  const location = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(true)
  

  return(

  <>
  
  <Button  className={cx('toggle-button', {
   'hidden': location.pathname ==='/' || location.pathname==='/register',
   
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
        
        <p>Welcome, {userName}</p>
        <NavItem>
          <NavLink tag={Link} to={"/dashboard"} className='link-name'>
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            {'  '}Dashboard
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink tag={Link} to={"/bugs"} className='link-name'>
            <FontAwesomeIcon icon={faRectangleList} className="mr-2" />
            {'  '}Bugs
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