import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { callNotification } from "App";

import * as client from "../../api";
import { setError, startLoading, stopLoading } from "./loaderSlice";

const initState = {
  slides: [],
  editingSlide: null,
  //listBannerInEditingSlide: [],
};
//Thêm slide. Truyền vào 1 object {idSlide:int, bannerId:[mảng id]}
export const updateEditingSlide = createAsyncThunk(
  "slide/updateEditingSlide",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    const { idSlide, bannerId } = payload;
    dispatch(startLoading());
    let url = `/slide/update-banner/${idSlide}`;
    try {
      await client.post(url, { bannerId: bannerId });
      dispatch(fetchEditingSlide({ slideId: idSlide }));
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
    } finally {
      dispatch(stopLoading());
    }
  }
);
export const fetchSlides = createAsyncThunk(
  "slide/fetchSlides",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "slide";
    let response;
    try {
      response = await client.get(url);
      if (response.status == 200) {
        dispatch(setSlides(response.data));
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
    } finally {
      dispatch(stopLoading());
    }
  }
);
export const updateSlideStatus = createAsyncThunk(
  "slide/updateSlideStatus",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    const { id, status } = payload;
    console.log(id, status);
    dispatch(startLoading());
    let url = `/slide/${id}`;
    let response;
    try {
      response = await client.patch(url, { is_visible: status });
      if (response.status == 200) {
        dispatch(setSlideStatus({ id, status }));
      }
    } catch (error) {
      console.log(error);
      callNotification(() => message.error(error.response.data.error));
    } finally {
      dispatch(stopLoading());
    }
  }
);
export const removeBannerFromSlide = createAsyncThunk(
  "slide/removeBannerFromSlide",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    const { bannerId, slideId } = payload;
    let url = `/slide/remove-banner/${slideId}`;
    try {
      const response = await client.Delete(url, { bannerId: bannerId });
      if (response.data) {
        message.success("Xóa banner khỏi slide thành công");
        dispatch(removeBanner({ bannerId }));
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);

export const fetchEditingSlide = createAsyncThunk(
  "slide/fetchEditingSlide",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    const { slideId } = payload;
    let url = `/slide/${slideId}`;
    try {
      const response = await client.get(url);
      if (response.data) {
        dispatch(setSlidesEditing(response.data));
      }
    } catch (error) {
      console.log(error);
      callNotification(() => message.error(error.response.data.error));
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);

const loaderSlice = createSlice({
  name: "slide",
  initialState: initState,
  reducers: {
    setSlides: (state, action) => {
      state.slides = action.payload;
    },
    setSlidesEditing: (state, action) => {
      state.editingSlide = action.payload;
    },
    setSlideStatus: (state, action) => {
      const { id, status } = action.payload;
      let newSlides = [...state.slides];
      let index = newSlides.findIndex((slide) => slide.id === id);
      newSlides[index].is_visible = status;
      state.slides = newSlides;
    },
    removeBanner: (state, action) => {
      console.log(action.payload);
      const { bannerId } = action.payload;
      let banners = [...state.editingSlide.banners];
      let newBanners = banners.filter((banner) => banner.id !== bannerId);
      state.editingSlide = { ...state.editingSlide, banners: newBanners };
    },
  },
});

export default loaderSlice.reducer;

export const { setSlides, setSlideStatus, setSlidesEditing, removeBanner } =
  loaderSlice.actions;
