import axios from 'axios'
import { setName, setUser } from '../Controllers/Redux/authSlice';
import { updateUser } from './auth';

const url = 'http://localhost:5000/group';

export const registerGroup=async(group)=>{

  
  const {name, key} = group;

    try {
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

        const {data} = await axios.post( `${url}/`,
        {
          name, key
        },
        config
      );

      if(data){
      console.log("Group was created succesfully")
      }
      else{
        console.log("Creation failed")
      }

      
        
    } catch (error) {
      console.log(error)
        
    }

}



export const joinGroup=async(group)=>{
  const {name, key} = group;

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      `${url}/join`,
      { name, key },
      config
    );

    if(data){
        console.log("Group was joined succesfully " + data._id)
        return data._id;
        }
        else{
          console.log("Join failed")
        }

  } catch (error) {
    console.log(error)
  }
};



export const signOff=async()=>{
  
}