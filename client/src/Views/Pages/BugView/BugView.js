import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBugById } from '../../../Controllers/Redux/bugsSlice';
import BugCard from '../../BugCard/BugCard';
import { Row, Col } from 'reactstrap';
import CommentsCard from '../../CommentsCard/CommentsCard';
import './BugView.css'
const BugView=()=>{
    const {bugId} = useParams();
    const bug = useSelector(selectBugById(bugId))
    return(
        <Row>
            <Col xs='6' className='side-border'>
                <BugCard bug={bug}/>
            </Col>
            <Col>
                <CommentsCard/>
            </Col>
        </Row>
    )

}

export default BugView