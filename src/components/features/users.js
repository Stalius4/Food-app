import {createSlice} from "@reduxjs/toolkit"


export const userSlice = createSlice({
     name: "userId",
     initialState: {value: {id:"",first:"", last:""}},
     reducers:{
        setUserId:(state,action)=>{
            state.value= action.payload;
     },
    },
});


export const {setUserId} = userSlice.actions
export default userSlice.reducer