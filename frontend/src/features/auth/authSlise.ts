import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from './authActions'

interface UserInfo {
    email: string
    name: string;
    password: string
}

interface IAuthState {
    loading: boolean;
    userInfo: null | UserInfo
    userToken: null | string
    error: null | string | undefined
    success: boolean
}

const initialState: IAuthState = {
  loading: false,
  userInfo: null,
  userToken: null, 
  error: null,
  success: false, 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(registerUser.fulfilled, (state, { payload }) => {
          state.loading = false
          state.success = true
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
          state.loading = false
          state.error = payload
        })
    },
  })

export default authSlice.reducer