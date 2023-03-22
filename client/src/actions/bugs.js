import axios from 'axios'
import { setBugs } from '../Controllers/Redux/bugsSlice';


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

  export const createBug=async(bug)=>{

  
    const {_id,
        name,
        description,
        project,
        priority,
        creator,
        assigned,
        status,
        datePosted} = bug;
  
      try {
          const config = {
              header: {
                "Content-Type": "application/json",
              },
            };
  
          const {data} = await axios.post( `${url}/create`,
          {
            _id,
            name,
            description,
            project,
            priority,
            creator,
            assigned,
            status,
            datePosted
          },
          config
        );    
      } catch (error) {
        console.log(error)
          
      }
  
  }