import { Card, Row, Col } from "reactstrap"

const CommentsCard=()=>{
    return(
        <>
        <h4 className="mt-4">Add a Comment</h4>
        <input type="text"/>
        <button>Add</button>
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
                </div>

        </Card>
       </>
    )

}

export default CommentsCard