import { Card, Row, Col } from "reactstrap";
import { useSelector } from 'react-redux';
import { selectAllBugs } from '../../Controllers/Redux/bugsSlice';

const TotalBugsCard =()=>{
    const bugs = useSelector(selectAllBugs)
    return (
        <Card className="bugs-doughnut-card" >
            <Row>
                <Col className="doughnut-row">
                    <h3>Total Bugs</h3>
                </Col>
            </Row>
            <Row>
                <Col/>
                <Col  className="bugs-doughnut">
                    <div class="numberCircle">
                        {bugs.length}
                    </div>
                </Col>
                <Col/>
            </Row> 
        </Card>
    )
    
}

export default TotalBugsCard;