import { createSlice } from "@reduxjs/toolkit";

// Initial authentication state
const initialState = {
    token: localStorage.getItem("accessToken"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    isAuthenticated: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        // Called when user logs in successfully
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },

        // Called when user logs out
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;