import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Redux/auth/authSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})