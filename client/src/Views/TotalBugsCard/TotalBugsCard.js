import { Card, Row, Col } from "reactstrap";
import { useSelector } from 'react-redux';
import { selectAllBugs } from '../../Controllers/Redux/bugsSlice';
import './TotalBugs.css'

const TotalBugsCard =()=>{
    const bugs = useSelector(selectAllBugs)
    return (
        <Card className="bugs-doughnut-card total-bugs" >
            <Row className="mb-5">
                <Col className="doughnut-row">
                    <h5>Total Bugs</h5>
                </Col>
            </Row>
            
            <Row className="total-bug-row">
                <Col />
                <Col className="bugs-doughnut">
                    <div class="numberCircle">
                        <h1>{bugs.length}</h1>
                    </div>
                </Col>
                <Col/>
            </Row> 
            
        </Card>
    )
    
}

export default TotalBugsCard;