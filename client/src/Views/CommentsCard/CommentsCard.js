import { useState } from "react"
import { useSelector } from "react-redux"
import { Card, Row, Col, Button } from "reactstrap"
import { createComment } from "../../actions/comment"
import { selectLoading } from "../../Controllers/Redux/loadingSlice"
import{
    faTrash
  }from "@fortawesome/free-solid-svg-icons"
import Loading from "../Loading/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CommentsCard=({bug})=>{
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState(bug.comments)
    const loading = useSelector(selectLoading)
    if(loading || comments == undefined){
        return(
            <Loading/>
        )

    }else{
    return(
        <>
        <h4 className="mt-4">Add a Comment</h4>
        <input onChange={(event)=>setComment(event.target.value)} type="text"/>
        <button onClick={()=>{
            const newComment = {text: comment, creator: sessionStorage.getItem("userId")}
            createComment(newComment, bug._id)
            setComments([...comments, {...newComment, creator: sessionStorage.getItem("username")}])}}>Add</button>
            <Card>
                <div className="card-body">
                    <div className="card-title title">
                        <p>Comments</p>
                    </div>
                    <Row className="card-row">
                        <Col>
                            <p className="title">Comment</p> 
                        </Col>
                        <Col>
                            <p className="title">Posted By</p>
                        </Col>
                        <Col xs='1'/>
                    </Row>
                    {comments.map((c)=>{
                        console.log("c is: " + c.creator.username)
                        return(
                            <Row>
                                <Col>
                                    <p>{c.text}</p>
                                </Col>
                                <Col>
                                    <p>{c.creator.username}</p>
                                </Col>
                                <Col xs='1'>
                                    <Button>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </Col>
                            </Row>
                        )
                    })}
                </div>

        </Card>
       </>
    )}
    

}

export default CommentsCard