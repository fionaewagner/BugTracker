import { createSlice } from "@reduxjs/toolkit";
import bugModel from "../../Models/bugModel";

const initialState = {
    bugsArray:[]
}

const bugsSlice = createSlice({
    name:'bugs',
    initialState,
    reducers:{
        setBugs:(state,action)=>{
            state.bugsArray = action.payload;
            console.log(state.bugsArray)
        },
        addBug: (state, action)=>{
            console.log(action.payload)
            console.log(state.bugsArray)
            const newBug = new bugModel({
                _id: state.bugsArray.length +1,
                ...action.payload
            });
            state.bugsArray.push(newBug)
        }
    }
})

export const bugsReducer = bugsSlice.reducer

export const {addBug} = bugsSlice.actions

export const {setBugs} = bugsSlice.actions


export const selectAllBugs=(state)=>{
    return state.bugs.bugsArray
}

export const selectBugById = (id) => (state) => {
    return state.bugs.bugsArray.find(
        (bug) => bug._id === parseInt(id)
    );
};