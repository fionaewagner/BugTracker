import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Card, Row, Col, Button } from "reactstrap"
import { createComment, deleteComment, updateComment } from "../../actions/comment"
import { selectLoading } from "../../Controllers/Redux/loadingSlice"
import{
    faTrash,
    faPen, 
    faCheck,
    faPlusCircle
  }from "@fortawesome/free-solid-svg-icons"
import Loading from "../Loading/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './CommentsCard.css'


const CommentsCard=({bug})=>{
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState(bug.comments)
    const [editMode, setEditMode] = useState(false)
    const [commentToEdit, setCommentToEdit] = useState({})
    const [editedComment, setEditedComment] = useState("")
   
    const loading = useSelector(selectLoading)
    if(loading || comments == undefined){
        return(
            <Loading/>
        )

    }else{
    return(
        <div>
        
            <Card className="comment-card">
                <div className="card-body">
                    <div className="bug-card-ttl text-center p-2">
                        <h4>Comments</h4>
                    </div>
                    <Row>
                        <Col xs='6'>
                            <input className="comment-input" onChange={(event)=>setComment(event.target.value)} type="text"/>
                        </Col>
                        <Col >
                        <Button onClick={()=>{
                                const newComment = {text: comment, creator: sessionStorage.getItem("userId")}
                                createComment(newComment, bug._id)
                                setComments([...comments, {...newComment, creator: sessionStorage.getItem("username")}])}}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                    {"  "}Add Comment
                                    </Button>
                        </Col>
                        
                    </Row>
                    <Row className="comment-title-row">
                        <Col >
                            <p >Comment</p> 
                        </Col>
                        <Col>
                            <p className="title">Posted By</p>
                        </Col>
                        <Col xs='1'/>
                    </Row>
                    {comments.map((c)=>{
                        return(
                            <Row>
                                <Col>
                                    {editMode && commentToEdit===c ?
                                    <input placeholder={c.text} onChange={(event)=>setEditedComment(event.target.value)}></input> :
                                    <p>{c.text}</p>}
                                </Col>
                                <Col>
                                    <p>{c.creator.username}</p>
                                </Col>
                                {c.creator._id === sessionStorage.getItem("userId") ?
                                    <Col xs='1'>
                                        <Button id='editcom' onClick={()=>{
                                            if(editMode && commentToEdit===c){
                                                updateComment(c._id, editedComment)
                                                const updatedComment = {
                                                    ...c,
                                                    text: editedComment,
                                                  };
                                                  const updatedComments = comments.map((comment) =>
                                                    comment === c ? updatedComment : comment
                                                  );
                                                  setComments(updatedComments);
                                            }
                                            setEditMode(!editMode)
                                            setCommentToEdit(c)
                                            
                                        }}>
                                            <FontAwesomeIcon icon={editMode && commentToEdit===c ? faCheck :faPen}/>
                                        </Button>
                                    </Col> : <></>}
                                    <Col xs='1'>
                                    <Button onClick={()=>{
                                        deleteComment(c._id)
                                        setComments(comments.filter(comment => comment !== c));
                                    }}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                    
    
                                </Col>
                                
                            </Row>
                        )
                    })}
                </div>

        </Card>
       </div>
    )}
    

}

export default CommentsCard