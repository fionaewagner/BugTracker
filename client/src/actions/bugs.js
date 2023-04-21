import axios from 'axios'
import { setBugs, setSelectedBug } from '../Controllers/Redux/bugsSlice';
import { setLoading } from '../Controllers/Redux/loadingSlice';
import { getUser } from './auth';


const url = 'http://localhost:5000/bugs';

export const getBugs=async(dispatch)=>{

      try {
        console.log("getting bugs")
            const {data} = await axios.get(url);
            dispatch(setBugs(data))
      } catch (error) {
        console.log(error)
          
      }
  
  }

  export const getBug=async(_id, dispatch)=>{
    dispatch(setLoading(true))
    try{
      const {data} = await axios.get(`${url}/${_id}`);
      if(data){
      console.log("data is:" + data)
      dispatch(setSelectedBug(data))
      dispatch(setLoading(false))
      return data;
    }
  
    }catch(err){
      console.log(err)
    }

  }

  export const getBugsForUserGroup=async(dispatch)=>{
    dispatch(setLoading(true))
    try{
      const user = await getUser(sessionStorage.getItem("userId"), dispatch) 
      if(user){
        const groupId = user.groupId
        console.log("groupId is: " + groupId)
        const bugs = await axios.get(`${url}/group`, {groupId})
        console.log("the response was: " + bugs.data)
        dispatch(setBugs(bugs.data))
        dispatch(setLoading(false))
        return bugs;
      }

    }catch(err){
      console.log(err.message)

    }
  }

  export const createBug=async(bug, navigate)=>{
    const {
        name,
        description,
        project,
        priority,
        creator,
        assigned,
        status,
        datePosted,
        groupId} = bug;
  
      try {
          const config = {
              header: {
                "Content-Type": "application/json",
              },
            };
  
          const {data} = await axios.post( `${url}/create`,
          {
            name,
            description,
            project,
            priority,
            creator,
            assigned,
            status,
            datePosted,
            groupId
          },
          config
        ); 
        if(data){
          navigate("../dashboard", { replace: true });

        }   
      } catch (error) {
        console.log(error)
          
      }
  
  }