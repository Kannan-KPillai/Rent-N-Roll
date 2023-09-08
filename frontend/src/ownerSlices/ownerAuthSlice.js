import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ownerInfo: localStorage.getItem('ownerInfo') ? JSON.parse(localStorage.getItem('ownerInfo')) : null 
}

const ownerAuthSlice = createSlice({
    name: 'owner',
    initialState,
    reducers:{
        setOwnerCredentials: (state, action) => {
            state.ownerInfo = action.payload;
            localStorage.setItem('ownerInfo', JSON.stringify(action.payload))
        },
         logout: (state, action) => {
            state.ownerInfo = null;
            localStorage.removeItem('ownerInfo');
         },
    },
});

export const {setOwnerCredentials, logout} = ownerAuthSlice.actions;

export default ownerAuthSlice.reducer;