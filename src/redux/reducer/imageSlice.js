import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { callNotification } from "App";
import { kilobytesToSize } from "utils/ConvertSize";

import * as client from "../../api";
import { setError, startLoading, stopLoading } from "./loaderSlice";

const initialState = {
  imageSet: null,
};

export const getImage = createAsyncThunk(
  "image/search",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "media";
    let response;
    try {
      response = await client.get(url, payload);
      if (response.status == 200) {
        dispatch(setImage(response.data));
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const uploadImage = createAsyncThunk(
  "image/upload",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "media/upload";
    let response;
    dispatch(startLoading());
    try {
      response = await client.uploadImage(url, payload);
      if (response.status == 200) {
        dispatch(getImage());
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error("Upload không thành công"));
      dispatch(stopLoading());
    }
  }
);
export const modifyImage = createAsyncThunk(
  "image/modify",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    const { filename } = payload;
    const { alt, title } = payload.info;
    let url = `media/${filename}`;
    let response;
    try {
      response = await client.patch(url, { alt: alt, title: title });
      if (response.status == 200) {
        callNotification(() => message.success("Thành công"));
        dispatch(getImage());
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);
export const deleteImage = createAsyncThunk(
  "image/delete",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    const { filename } = payload;
    let url = `media/${filename}`;
    let response;
    try {
      response = await client.deleteItem(url, {});
      if (response.status == 200) {
        callNotification(() => message.success("Xoá thành công"));
        dispatch(getImage());
        dispatch(stopLoading());
      }
    } catch (error) {
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
      }
    }
  }
);

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action) => {
      const mapped = action.payload.map((item) => {
        item.filesize = kilobytesToSize(item.filesize);
        return item;
      });

      state.imageSet = mapped;
    },
  },
});

export default imageSlice.reducer;

export const { setImage } = imageSlice.actions;
