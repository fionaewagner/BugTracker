import { useState } from "react"
import { Card, Row, Col } from "reactstrap"
import { createComment } from "../../actions/comment"

const CommentsCard=({bug})=>{
    const [comment, setComment] = useState({text: "hi this is a comment", creator: sessionStorage.getItem("userId")})
    return(
        <>
        <h4 className="mt-4">Add a Comment</h4>
        <input  type="text"/>
        <button onClick={()=>{createComment(comment, bug._id)}}>Add</button>
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
                    </Row>
                    {bug.comments.map((c)=>{
                        return(
                            <Row>
                                <Col>
                                    <p>{c}</p>
                                </Col>
                                
                            </Row>
                        )
                    })}
                </div>

        </Card>
       </>
    )

}

export default CommentsCard