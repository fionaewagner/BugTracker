import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./Views/Sidebar/Sidebar";
import Content from "./Content";
import "./App.css";
import { Col } from "reactstrap";
import LoginPage from "./Views/Pages/AuthPages/LoginPage/LoginPage";
import RegisterPage from "./Views/Pages/AuthPages/RegisterPage/RegisterPage";
import { useSelector } from "react-redux";
import { selectAuth, selectUser } from "./Controllers/Redux/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBugs } from "./actions/bugs";



const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const signedIn= useSelector(selectAuth);
  const token = sessionStorage.getItem("authToken")
  const user = useSelector(selectUser) 
  const dispatch = useDispatch()
  
  


    if(token){
      console.log("token")
    }
    
    return (
    
      <Router>
        <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
          <Col style={{marginLeft:"20%"}} className={sidebarIsOpen?'content-col':'content-col-is-open'}>
            <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} setSidebarOpen={setSidebarOpen} />
          </Col>
        </div>
      </Router>
    )
  
  
  
};

export default App;
