import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./Views/Sidebar/Sidebar";
import Content from "./Content";
import "./App.css";
import { Col } from "reactstrap";
import LoginPage from "./Views/Pages/AuthPages/LoginPage/LoginPage";
import RegisterPage from "./Views/Pages/AuthPages/RegisterPage/RegisterPage";
import { Provider, useSelector } from "react-redux";
import { selectAuth, selectLogIn, selectUser } from "./Controllers/Redux/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBugs } from "./actions/bugs";
import { store } from "./app/store";



const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarIsOpen)
  };
  
  const signedIn= useSelector(selectAuth);
  const token = sessionStorage.getItem("authToken")
  const loggedIn = useSelector(selectLogIn)
  const dispatch = useDispatch()
  
  


    if(token){
      console.log("token")
    }
    
    return (
    <Provider store={store}>
      <Router>
        <div className="App wrapper">
        {loggedIn && <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />}
          <Col className={sidebarIsOpen?'content-col':'content-col-is-open'}>
            <Content  toggleSidebar={toggleSidebar} 
            sidebarIsOpen={sidebarIsOpen} setSidebarOpen={setSidebarOpen} />
          </Col>
        </div>
      </Router>
    </Provider>
    )
  
  
  
};

export default App;
