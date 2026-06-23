import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// Redux store holds application-wide state
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});