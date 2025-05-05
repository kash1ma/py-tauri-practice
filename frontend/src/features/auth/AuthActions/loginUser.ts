import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:8000";

interface LoginUserInput {
  email?: string;
  phone?: string;
  password: string;
  access_token?: string;
}

interface LoginUserResoponse {
  message: string;
  access_token: string
}

type LoginError = string;

export const userLogin = createAsyncThunk<
  LoginUserResoponse,
  LoginUserInput,
  {
    rejectValue: LoginError;
  }
>("auth/login", async ({ email, password, phone }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loginData = email ? {email, password} : {phone, password}

    const { data } = await axios.post<LoginUserResoponse>(
      `${backendURL}/auth/login`,
      loginData,
      config
    )
    console.log(data)
    localStorage.setItem("userToken", data.access_token)
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
