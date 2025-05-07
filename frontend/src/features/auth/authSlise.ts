import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./AuthActions/registerUser";
import { userLogin } from "./AuthActions/loginUser";

interface UserInfo {
  email: string;
  username: string;
  role: string
}

interface IAuthState {
  loading: boolean;
  userInfo: null | UserInfo;
  userToken: any;
  error: null | string | undefined;
  success: boolean;
  redirect: boolean
}
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState: IAuthState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  redirect: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.redirect = true
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true
        state.userToken = payload.access_token;
        state.userInfo = payload.user
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
