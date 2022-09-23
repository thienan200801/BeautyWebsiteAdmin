import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { message } from "antd";
import { callNotification } from "App";

import * as client from "../../api";
import { startLoading, stopLoading } from "./loaderSlice";

const initialState = {
  tags: [],
};

export const getTag = createAsyncThunk(
  "category/search",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "tag";
    let response;
    try {
      response = await client.get(url, payload);

      if (response.status == 200) {
        dispatch(setTags(response.data));
        dispatch(stopLoading());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const createTag = createAsyncThunk(
  "tag/create",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "tag/create";

    let response;
    try {
      response = await client.post(url, payload);
      if (response.status == 200) {
        callNotification(() => message.success("Thành công"));
        dispatch(getTag());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tag/delete",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `tag/${payload}`;
    let response;
    try {
      response = await client.deleteItem(url, payload);
      if (response.status == 200) {
        callNotification(() => message.success("Thành công"));
        dispatch(getTag());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const editTag = createAsyncThunk(
  "tag/modify",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `tag/${payload.id}`;

    let response;
    try {
      response = await client.patch(url, payload.data);
      if (response.status == 200) {
        callNotification(() => message.success("Thành công"));
        dispatch(getTag());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTags: (state, action) => {
      // sort by created day, but use id instead
      const sortByCreated = action.payload.sort((prev, next) => next.id - prev.id)
      state.tags = sortByCreated
    },
  },
});

export default tagSlice.reducer;
export const { setTags } = tagSlice.actions;

export const selectNomalizedTag = createSelector(
  (state) => state.tag.tags,
  (tags) => {
    if (tags?.length != 0)
      return Object.fromEntries(tags.map((tag) => [tag.id, tag]));
    else return null;
  }
);
