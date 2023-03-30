import React from "react";
import UserSettings from "./Views/Pages/UserSettings/UserSettings";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import BugsDisplay from "./Views/Pages/BugsDisplay/BugsDisplay";
import Dashboard from "./Views/Pages/Dashboard/Dashboard";
import BugView from "./Views/Pages/BugView/BugView";
import CreateBug from "./Views/Pages/CreateBug/CreateBug";
import RegisterPage from "./Views/Pages/AuthPages/RegisterPage/RegisterPage";
import LoginPage from "./Views/Pages/AuthPages/LoginPage/LoginPage";
import MyGroup from "./Views/Pages/MyGroup/MyGroup";


const Content = ({ sidebarIsOpen, toggleSidebar, setSidebarOpen}) => {
  const location = useLocation();
  if(location.pathname === "/" || location.pathname === "/login"){
    setSidebarOpen(false)
  }

  const token = sessionStorage.getItem("authToken")
  return(
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Routes>
      <Route exact path="/" element={<LoginPage/>} />
      <Route exact path="/register" element={<RegisterPage/>} />
      <Route exact path="/dashboard" element={token ? <Dashboard sidebarIsOpen={sidebarIsOpen}/> : <Navigate to="/" />} />
      <Route exact path="/bugs" element={token ? <BugsDisplay sidebarIsOpen={sidebarIsOpen}/> : <Navigate to="/" />} />
      <Route exact path='/groups' element={token ? <MyGroup sidebarIsOpen={sidebarIsOpen}/> : <Navigate to="/" />}/>
      <Route exact path="/Pages" element={() => "Pages"} />
      <Route exact path="/user" element={token ? <UserSettings/> :<Navigate to="/" />} />
      <Route exact path="/create" element={token ? <CreateBug/> : <Navigate to="/" />} />
      <Route path="bugs/:bugId" element={token ? <BugView/> : <Navigate to="/" />} />
    </Routes>
  </Container>
)};

export default Content