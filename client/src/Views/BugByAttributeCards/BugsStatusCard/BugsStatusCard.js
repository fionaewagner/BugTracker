import { Card, Row, Col } from "reactstrap"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectAllBugs } from '../../../Controllers/Redux/bugsSlice';


const BugsStatusCard =()=>{

  ChartJS.register(ArcElement, Tooltip, Legend);

  const bugs = useSelector(selectAllBugs)

  


  const open = bugs.filter((bug)=>bug.status === 'open').length 
  const pending = bugs.filter((bug)=>bug.status === 'pending').length 
  const waiting = bugs.filter((bug)=>bug.status === 'waiting').length 
  const closed = bugs.filter((bug)=>bug.status === 'closed').length

const data = {
  labels: [
    'open',
    'pending',
    'waiting',
    'closed'
  ],
  datasets: [
    {
      labels: ["a", "b", "c", "d"],
      data: [open, pending, waiting, closed],
      backgroundColor: [
        'rgb(0, 38, 255)',
        'rgb(0, 141, 7)',
        'rgb(255, 145, 0)',
        'rgb(255, 34, 0)' 
      ],
      borderColor: [
        'white'
      ],
      borderWidth: 2,
    },
  ],
};
  return (
        <Card className="bugs-doughnut-card" >
          <Row>
            <Col className="doughnut-row">
                <h5>Bugs by Status</h5>
            </Col>
            </Row>
            <div className="bugs-doughnut">
                <Doughnut className="do-chart" data={data}/>
            </div>
            
        </Card>
  );
}

export default BugsStatusCard