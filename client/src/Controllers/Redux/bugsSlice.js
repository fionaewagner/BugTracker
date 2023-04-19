import { createSlice } from "@reduxjs/toolkit";
import bugModel from "../../Models/bugModel";

const initialState = {
    bugsArray:[],
    selectedBug: {}
}

const bugsSlice = createSlice({
    name:'bugs',
    initialState,
    reducers:{
        setBugs:(state,action)=>{
            state.bugsArray = action.payload;
            console.log(state.bugsArray)
        },
        setSelectedBug: (state, action)=>{
            state.selectedBug = action.payload;
        }
    }
})

export const bugsReducer = bugsSlice.reducer

export const {setBugs} = bugsSlice.actions

export const {setSelectedBug} = bugsSlice.actions


export const selectAllBugs=(state)=>{
    return state.bugs.bugsArray
}

export const selectBug = (state) => {
    return state.bugs.selectedBug
};