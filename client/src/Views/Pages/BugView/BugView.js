import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBug, selectBugById } from '../../../Controllers/Redux/bugsSlice';
import BugCard from '../../BugCard/BugCard';
import { Row, Col } from 'reactstrap';
import CommentsCard from '../../CommentsCard/CommentsCard';
import './BugView.css'
import { useEffect } from 'react';
import { getBug } from '../../../actions/bugs';
import Loading from '../../Loading/Loading';
import { selectLoading } from '../../../Controllers/Redux/loadingSlice';

const BugView=()=>{
    const {bugId} = useParams();
    const dispatch = useDispatch();
    const bug = useSelector(selectBug)
    const loading = useSelector(selectLoading)
    console.log("the bug is: " + bug)

    useEffect(()=>{
       getBug(bugId, dispatch)
    },[])

    if(!loading){

    return(
        <Row>
            <Col xs='6' className='side-border'>
                <BugCard bug={bug}/>
            </Col>
            <Col>
                <CommentsCard bug={bug}/>
            </Col>
        </Row>
    )
    }else{
        return(
            <Loading/>
        )
    }

}

export default BugView