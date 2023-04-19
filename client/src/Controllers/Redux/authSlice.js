import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn:false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        signIn:(state, action)=>{
            state.loggedIn=true
        },
        registerUser:(state,action)=>{
            state.user = action.payload
        },
        setUserGroupMembers:(state,action)=>{
            state.groupMembers = action.payload
        },
        setUser:(state, action)=>{
            return ({...state, email: action.payload})
        },
        setName:(state, action)=>{
            console.log(action.payload)
            return({...state, username:action.payload})
        }
    
    }

})

export const {signIn} = authSlice.actions

export const {registerUser}= authSlice.actions

export const {setUser}=authSlice.actions

export const {setName}=authSlice.actions

export const {setUserGroupMembers} = authSlice.actions

export const authReducer = authSlice.reducer

export const selectAuth =(state)=>{
    return state.auth.loggedIn
}

export const selectUser=(state)=>{
    return state.auth.user
}

export const selectGroupMembers=(state)=>{
    return state.auth.groupMembers
}

export const getUser=(state)=>{
    return state.auth.email
}

export const getName=(state)=>{
    return state.auth.username
}