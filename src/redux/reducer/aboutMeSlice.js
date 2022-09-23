import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { callNotification } from "App";

import * as client from "../../api";
import { startLoading, stopLoading } from "../reducer/loaderSlice";
const initialState = {
  personal: null,
  newInfo: null,
};
export const getAboutMeSlice = createAsyncThunk(
  "personal/aboutMe",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    let url = "/landing/about";
    let response;
    // console.log("Payload", payload);
    try {
      response = await client.get(url, payload);
      if (response.status == 200) {
        dispatch(setAboutMe(response.data));
        // console.log("response.data", response.data);
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);
export const updateAboutMeSlice = createAsyncThunk(
  "personal/updateAboutMeSlice",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    console.log("PAYLOAD:", payload);
    dispatch(startLoading());
    let url = `users`;
    let response;
    try {
      response = await client.patch(url, payload);
      if (response.status == 200) {
        // dispatch(setAboutMe(payload));
        callNotification(() => message.success("Cập nhật thành công"));
      }
    } catch (error) {
      console.log(error);
      callNotification(() => message.error(error.response.data.error));
    } finally {
      dispatch(stopLoading());
    }
  }
);
export const aboutMeSlice = createSlice({
  name: "/personal",
  initialState,
  reducers: {
    setAboutMe: (state, action) => {
      state.personal = action.payload;
    },
  },
});

export default aboutMeSlice.reducer;

export const { setAboutMe } = aboutMeSlice.actions;
