import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as client from "../../api";
import { getCookie, removeCookie, setCookie } from "../../utils/helper";
// import { startLoading, stopLoading } from "./loaderSlice";

const initState = {
  user: getCookie("user"),
  error: "",
  isLoading: false,
};

//function
export const adminLogin = createAsyncThunk("auth/login", async (payload) => {
  let url = "users/login";
  const response = await client.post(url, payload);
  return response.data;
});

//reducer
export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    lougout: (state, action) => {
      state.error = "";
      removeCookie();
      state.user = "";
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: {
    [adminLogin.fulfilled]: (state, action) => {
      let { token } = action.payload;
      setCookie("user", token, 12);

      state.user = token;
      state.isLogedIn = true;
      state.isLoading = false;
      state.error = "";
    },
    [adminLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [adminLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = "Wrong username or password";
    },
  },
});

export default authSlice.reducer;

//action
export const { lougout, setError } = authSlice.actions;

//selector
