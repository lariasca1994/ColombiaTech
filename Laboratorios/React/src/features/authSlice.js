import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            console.log(action)
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;