import axios from 'axios'
import { registerUser, setName, setUser, setUserGroupMembers, signIn } from '../Controllers/Redux/authSlice';
import { setLoading } from '../Controllers/Redux/loadingSlice';
import { joinGroup, registerGroup } from './group';

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
        console.log(data)
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("userId", data._id)
        sessionStorage.setItem("username", data.username)
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

export const userRegister=async(user, navigate, dispatch)=>{
  const {username,email, password,group, admin} = user;
  let groupId;
  if(admin){
    console.log("Creating new admin user type")
    try{
      groupId = await registerGroup(group);
    }catch(error){
      console.log(error)}
  }
  else{
    try{
      groupId = await joinGroup(group);
    }catch(error){
      console.log(error)
    }
  }
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
          groupId,
          admin
        },
        config
      );

      if(data){
      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userId", data._id)
      sessionStorage.setItem("username", data.username)
      if(admin){
        sessionStorage.setItem("admin", true)
      }
      dispatch(setUser(email))
      dispatch(setName(username))
      dispatch(signIn())
      navigate("../dashboard", { replace: true });
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
    sessionStorage.setItem("username", data.username)
    sessionStorage.setItem("admin", data.admin)
    dispatch(setUser(email))
    dispatch(setName(data.username))
    dispatch(signIn())
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

export const updateUserGroup = async(_id, group)=>{
  try{
    const groupId = await joinGroup(group);
    if(groupId){
      try {
        console.log("patching now")
        axios.patch(`${url}/${_id}`, {groupId:groupId});
      } catch (error) {
        console.log(error.message);
      }

    }
  }catch(error){
    console.log(error)
  }

}

export const getUser = async(_id,dispatch)=>{
  dispatch(setLoading(true))
  try{
    const {data} = await axios.get(`${url}/find/${_id}`);
    if(data){
    getUsersByGroup(data.groupId, dispatch)
    dispatch(registerUser(data))
    dispatch(setLoading(false))
    return data;
  }

  }catch(err){
    console.log(err)
  }
}

export const getUsersByGroup=async(groupId, dispatch)=>{
  dispatch(setLoading(true))
  console.log("data is:" + groupId)
  try{
    const {data} = await axios.get(`${url}/group`, { params: { groupId }});
    if(data){
    dispatch(setUserGroupMembers(data))
    dispatch(setLoading(false))
    return data;
  }

  }catch(err){
    console.log(err)
  }

}

export const getDisplayName=async(_id, doFun)=>{
  try{
    const {data} = await axios.get(`${url}/find/${_id}`);
    if(data){
      doFun(data.username)
      return data.username;
  }

  }catch(err){
    console.log(err)
  }

}



export const signOff=async()=>{
  
}