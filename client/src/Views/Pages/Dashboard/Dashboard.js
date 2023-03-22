import { Col, Row } from "reactstrap"
import BugsStatusCard from "../../BugByAttributeCards/BugsStatusCard/BugsStatusCard"
import BugsTypeCard from "../../BugByAttributeCards/BugsTypeCard/BugsTypeCard"
import TotalBugsCard from "../../TotalBugsCard/TotalBugsCard"
import Header from "../../Header/Header"



const Dashboard = ({sidebarIsOpen})=>{

    const token = sessionStorage.getItem("authToken")

    if(token){
        console.log("found token")
   
    return(
        <div>
            <Header name={"Dashbaord"}/>
            <Row>
                <Col xs='10' md='5' >
                    <TotalBugsCard/>
                </Col>
                <Col className="dashboard-col" xs='10' md='5'>
                    <BugsTypeCard/>
                </Col>
            </Row>
            <Row>
                <Col xs='10' md='5'>
                    <BugsStatusCard/>
                </Col>
                
            </Row>
        </div>
    )
    }
    else{
        return(<></>)
    }
    


}

export default Dashboard