import axios from 'axios'
import { setBugs } from '../Controllers/Redux/bugsSlice';
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

  export const getBugsForUserGroup=async(dispatch)=>{
    try{
      const user = await getUser(sessionStorage.getItem("userId")) 
      if(user){
        const groupId = user.groupId
        const bugs = await axios.get(`${url}/group`, {groupId})
        dispatch(setBugs(bugs))
        return bugs;
      }

    }catch(err){
      console.log(err.message)

    }
  }

  export const createBug=async(bug)=>{
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
      } catch (error) {
        console.log(error)
          
      }
  
  }