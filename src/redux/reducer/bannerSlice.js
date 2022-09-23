import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';
import { callNotification } from "App";
import { HOST_NAME } from "utils/constant";

import * as client from "../../api";
import { setError, startLoading, stopLoading } from "./loaderSlice";



const initialState = {
  banners: [],
  bannerEditing: null
};

// pass empty data to get all tags
export const getBanner = createAsyncThunk(
  "banner/search",
  async (payload, thunkApi) => {
    console.log("hello");
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "banner";
    try {
      const response = await client.get(url, payload);
      switch (response.status) {
        case 200:
          console.log("success", response.data);
          dispatch(setBanners(response.data));
          dispatch(stopLoading());
          return;
        case 400:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };

        default:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
      }
    } catch (error) {
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);

export const getSpecificBanner = createAsyncThunk(
  "banner/searchID",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = `banner/${payload}`;
    try {
      const response = await client.get(url, payload);
      switch (response.status) {
        case 200:
          dispatch(setBannerEditingWithUrlChange(response.data));
          return;
        case 400:
          throw new Error({
            message: "Lỗi không xác định, vui lòng thao tác lại",
          });
        default:
          throw new Error({
            message: "Lỗi không xác định, vui lòng thao tác lại",
          });
      }
    } catch (error) {
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        return null;
      }
    }
  }
);

export const createBanner = createAsyncThunk(
  "banner/create",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "banner/create";
    try {
      const response = await client.post(url, payload);
      switch (response.status) {
        case 200:
          dispatch(getBanner());
          callNotification(() => message.success("Tạo banner thành công"));
          return;
        case 400:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
        default:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
      }
    } catch (error) {
      callNotification(() => message.error("Tạo banner thất bại"));
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);
export const deleteBanner = createAsyncThunk(
  "banner/delete",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `banner/${payload}`;
    try {
      const response = await client.deleteItem(url, payload);
      switch (response.status) {
        case 200:
          callNotification(() => message.success("Thành công"));
          dispatch(getBanner());
          return;
        case 400:
          throw new Error({
            message: "Lỗi không xác định, vui lòng thao tác lại",
          });
        default:
          throw new Error({
            message: "Lỗi không xác định, vui lòng thao tác lại",
          });
      }
    } catch (error) {
      callNotification(() => message.error("Thất bại"));
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);

export const editBanner = createAsyncThunk(
  "banner/modify",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `banner/${payload.id}`;
    try {
      const response = await client.patch(url, payload.state);
      switch (response.status) {
        case 200:
          dispatch(getBanner());
          callNotification(() => message.success("Sửa banner thành công"));
          return;
        case 400:
          throw new Error({
            message: "Lỗi không xác định, vui lòng thao tác lại",
          });
        default:
          throw new Error({
            message: "Lỗi không xác định, vui lòng thao tác lại",
          });
      }
    } catch (error) {
      callNotification(() => message.error("Sửa banner thất bại :( Vui lòng thao tác lại"));
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanners: (state, action) => {
      console.log(action.payload);
      // state.banners = action.payload; 
      try {
        let newBanners = action.payload.map((banner) => {
          return {
            ...banner,
            media: {
              ...banner?.media,
              url: HOST_NAME.concat(banner?.media?.url),
            }
          };
        });
        console.log("new banner", newBanners);
        state.banners = newBanners;

      } catch (error) {
        console.log(error);
      }
    },
    setBannerEditing: (state, action) => {
      state.bannerEditing = action.payload;

    },
    setBannerEditingWithUrlChange: (state, action) => {
      let banner = action.payload;
      state.bannerEditing = {
        ...banner,
        media: {
          ...banner.media,
          url: HOST_NAME.concat(banner.media.url),
        }
      }
    }
  },
});

export default bannerSlice.reducer;
export const { setBanners, setBannerEditing, setBannerEditingWithUrlChange } = bannerSlice.actions;
