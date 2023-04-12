import axios from 'axios'
import { setName, setUser } from '../Controllers/Redux/authSlice';

const url = 'http://localhost:5000/auth';

export const register=async(user, navigate, dispatch)=>{
  const {username,email, password} = user;

    try {
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

        const {data} = await axios.post( `${url}/register`,
        {
          username,
          email,
          password,
        },
        config
      );

      if(data){
      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userId", data._id)
      navigate("../dashboard", { replace: true });
      dispatch(setUser(email))
      dispatch(setName(username))
      }
      else{
        console.log("Invalid Credentials")
      }   
    } catch (error) {
      console.log(error)  
    }

}



export const login=async(user, navigate, dispatch)=>{
  const {email, password} = user;

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      `${url}/login`,
      { email, password },
      config
    );

    sessionStorage.setItem("authToken", data.token);
    sessionStorage.setItem("userId", data._id)
    dispatch(setUser(email))
    dispatch(setName(data.username))
    navigate("../dashboard", { replace: true });

  } catch (error) {
    console.log(error)
  }
};

export const updateUser = async (_id, user) => {
  console.log("this updated user is: " + user)
  try {
    axios.patch(`${url}/${_id}`, user);
  } catch (error) {
    console.log(error.message);
  }
};


export const signOff=async()=>{
  
}