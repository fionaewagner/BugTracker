import axios from 'axios'

const url = 'http://localhost:5000/comment';

export const createComment=async(comment, bugId)=>{
    const {text, creator} = comment;
    console.log(bugId)

    try {
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

        const {data} = await axios.post( `${url}/`,
        {
          text, creator, bugId
        },
        config
      );

      if(data){
      console.log("Comment was created succesfully")
      }
      else{
        console.log("Creation failed")
      }
        
    } catch (error) {
      console.log(error)
        
    }

}

export const updateComment = async (_id,comment) => {
  console.log(comment)
  const updatedComment = {text : comment}
  try {
    axios.patch(`${url}/${_id}`, updatedComment);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommentasync=async(_id, dispatch)=>{
    
    try{
      const {data} = await axios.get(`${url}/${_id}`);
      if(data){
      console.log("data is:" + data)
      return data;
    }
  
    }catch(err){
      console.log(err)
    }

  }

  export const deleteComment=async(_id)=>{
    console.log("comment id is: " + _id)
    try{
      axios.delete(`${url}/${_id}`)
    }catch(error){
      console.log(error);
    }
}