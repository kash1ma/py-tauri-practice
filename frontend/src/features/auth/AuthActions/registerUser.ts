import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:8000";

interface RegisterUserInput {
  email: string;
  phone: string;
  username: string;
  password: string;
}

interface RegisterUserResponse {
  message: string;
}

type RegisterUserError = string;

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserInput,
  {
    rejectValue: RegisterUserError;
  }
>(
  "auth/register",
  async ({ email, phone, username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        email: email.toLowerCase(),
        phone: phone,
        username: username,
        role: "user",
        password: password,
      };

      const response = await axios.post<RegisterUserResponse>(
        `${backendURL}/auth/register`,
        body,
        config
      )

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


