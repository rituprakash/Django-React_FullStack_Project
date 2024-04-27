import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null
    },
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload;
            window.localStorage.setItem('user',JSON.stringify(action.payload))
        },
        removeUser: (state)=>{
            state.user = null;
            window.localStorage.removeItem('user')
        },
        
        setUserFromLocalStorage: (state) => {
            var user = window.localStorage.getItem('user');
            if (user) {
                try {
                    user = JSON.parse(user);
                    state.user = user;
                } catch (error) {
                    console.error('Error parsing user from localStorage:', error);
                    state.user = null;
                }
            } else {
                state.user = null;
            }
        }
        
    }
});

export const {setUser, removeUser,setUserFromLocalStorage} = authSlice.actions

export default authSlice.reducer;


