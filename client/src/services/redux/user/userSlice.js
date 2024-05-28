import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    session:null,
    success:null,
    error:null,
}

const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        loadingStart:(state)=>{
            state.loading=true;
        },
        loadingStop:(state)=>{
            state.loading=false;
        },
        success:(state,action)=>{
            state.success=action.payload;
            state.error=null
            state.loading=false
        },
        error:(state,action)=>{
            state.success=null;
            state.error=action.payload
            state.loading=false
        },
        loginSuccess:(state,action)=>{
            state.session=action.payload;
        },
        logoutSuccess:(state)=>{
            state.session=null
        }
    }
})

export const{loadingStart,loadingStop,success,error,loginSuccess,logoutSuccess}=userSlice.actions;
export default userSlice.reducer;