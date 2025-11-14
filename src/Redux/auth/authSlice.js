import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, login, register, uploadAvatar } from "./authAPI";
import { act } from "react";


const registerUser = createAsyncThunk('user/register', async (formData, thunkAPI) => {
    try {
        const response = await register(formData)
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
    }
})

const loginUser = createAsyncThunk('user/login', async (formData, thunkAPI) => {
    try {
        const response = await login(formData)
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
    }
})

const getUserInfo = createAsyncThunk('user/userInfo', async (formData, thunkAPI) => {
    try {
        const response = await getCurrentUser()
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
    }
})

const updateAvatar = createAsyncThunk(
    "user/updateAvatar",
    async (formData, thunkAPI) => {
        try {
            const response = await uploadAvatar(formData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data.message);
        }
    }
);


const tokenFromStorage = localStorage.getItem('token51') || null

const initialState = {
    token: tokenFromStorage,
    user: null,
    status: "idle",
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null,
                state.user = null,
                localStorage.removeItem('token51');
        },
        setUser(state) {
            state.action = action.payload.userInfo
        }
    },

    extraReducers(builder) {
        builder
            .addCase(registerUser.fulfilled, (state, action) => { state.status = 'succeeded' })

            .addCase(registerUser.rejected, (state, action) => { state.status = 'failed', state.error = action.error })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const token = action.payload.token
                state.token = token
                localStorage.setItem('token51', token)
            })

            .addCase(loginUser.rejected, (state, action) => { state.status = 'failed', state.error = action.error })

            .addCase(getUserInfo.rejected, (state, action) => { state.status = 'failed', state.error = action.error })

            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const user = action.payload.userInfo
                state.user = user
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.user.avatar = action.payload.avatar;
            })



    }
})

export const { logout, setUser } = authSlice.actions;
export { registerUser, loginUser, getUserInfo, updateAvatar }
export default authSlice.reducer