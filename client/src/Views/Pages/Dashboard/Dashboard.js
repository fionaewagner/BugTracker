import { Col, Row } from "reactstrap"
import BugsStatusCard from "../../BugByAttributeCards/BugsStatusCard/BugsStatusCard"
import BugsTypeCard from "../../BugByAttributeCards/BugsTypeCard/BugsTypeCard"
import TotalBugsCard from "../../TotalBugsCard/TotalBugsCard"
import Header from "../../Header/Header"
import { getBugsForUserGroup } from "../../../actions/bugs"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import './Dashboard.css'
import { signIn } from "../../../Controllers/Redux/authSlice"



const Dashboard = ({sidebarIsOpen})=>{

    const token = sessionStorage.getItem("authToken")
    const dispatch = useDispatch()
    

    useEffect(()=>{
        getBugsForUserGroup(dispatch)
        dispatch(signIn())
    },[])

    if(token){
        console.log("found token")
   
    return(
        <div>
            <Header name={"Dashboard"} sidebarIsOpen={sidebarIsOpen} />
            <div className={sidebarIsOpen ? 'dashboard-closed' : 'dashboard-open'}>
                <Row className="dash-content mb-3">
                    <Col/>
                    <Col xs='10' md='5' >
                        <TotalBugsCard/>
                    </Col>
                    <Col xs='10' md='5'>
                        <BugsTypeCard/>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col xs='10' md='5'>
                        <BugsStatusCard/>
                    </Col>
                    <Col/>
                    
                </Row>
            </div>
        </div>
    )
    }
    else{
        return(<></>)
    }
    


}

export default Dashboard