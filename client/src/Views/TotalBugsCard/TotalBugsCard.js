import { Card } from "reactstrap";
import { useSelector } from 'react-redux';
import { selectAllBugs } from '../../Controllers/Redux/bugsSlice';

const TotalBugsCard =()=>{
    const bugs = useSelector(selectAllBugs)
    return (
        <Card className="bugs-doughnut-card">
            Total Bugs: {bugs.length}
        </Card>
    )
    
}

export default TotalBugsCard;