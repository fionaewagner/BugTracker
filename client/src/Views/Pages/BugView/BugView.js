import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBug, selectBugById } from '../../../Controllers/Redux/bugsSlice';
import BugCard from '../../BugCard/BugCard';
import { Row, Col } from 'reactstrap';
import CommentsCard from '../../CommentsCard/CommentsCard';
import './BugView.css'
import { useEffect } from 'react';
import { getBug } from '../../../actions/bugs';
const BugView=()=>{
    const {bugId} = useParams();
    const dispatch = useDispatch();
    const bug = useSelector(selectBug)
    console.log(bug)

    useEffect(()=>{
       getBug(bugId, dispatch)
    },[])

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