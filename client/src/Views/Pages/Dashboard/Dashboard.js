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
            <Header name={"Dashboard"} sidebarIsOpen={sidebarIsOpen}/>
            <Row className="mb-3">
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
    )
    }
    else{
        return(<></>)
    }
    


}

export default Dashboard