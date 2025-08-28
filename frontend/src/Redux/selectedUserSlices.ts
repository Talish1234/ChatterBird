import {createSlice} from "@reduxjs/toolkit";

const selectedUserSlice = createSlice({
    name:'selectedUser',
    initialState: { value: null } as { value: string | null },
    reducers:{
        setSelectedUser:(state,action)=>{
            state.value = action.payload
        },
        clearSelectedUser:(state)=>{
            state.value = null
        }
    }
})

export const {setSelectedUser,clearSelectedUser} = selectedUserSlice.actions
export const selectedUserReducer = selectedUserSlice.reducer