import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfoLogin = createAsyncThunk(
  "user/getUserInfoLogin",
  async ({ email, password }) => {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  }
);

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  userLoading: false,
  userError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
  },
  extraReducers: {
    [getUserInfoLogin.pending]: (state) => {
      state.userLoading = true;
    },
    [getUserInfoLogin.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
    [getUserInfoLogin.rejected]: (state, action) => {
      state.userLoading = false;
      state.userError = true;
      console.log(action.payload)
    },
  },
});

export const { logout } = userSlice.actions;

export const selectUserState = (state) => state.user;

export default userSlice.reducer;
