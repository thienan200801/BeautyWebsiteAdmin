import {
  createAsyncThunk,
  createSelector,
  createSlice
} from "@reduxjs/toolkit";
import { message } from "antd";
import * as client from "api/index";

import { startLoading, stopLoading } from "./loaderSlice";
const initialState = {};

export const getComments = createAsyncThunk(
  "comment/getall",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "comment/all";
    let response;
    try {
      response = await client.get(url, payload);
      if (response.status == 200) {
        dispatch(setComments(response.data));
        dispatch(stopLoading());
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.error);
      dispatch(stopLoading());
    }
  }
);

export const getCommentsOfBlog = createAsyncThunk(
  "comment/getcommentsofblog",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "comment";
    let response;
    try {
      response = await client.get(url, { blogId: payload });
      if (response.status == 200) {
        const res = response.data ? [response.data] : [];
        dispatch(setComments(res));
        dispatch(stopLoading());
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.error);
      dispatch(stopLoading());
    }
  }
);

export const updateCommentApi = createAsyncThunk(
  "comment/update",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    const { commentid, changes } = payload;
    dispatch(startLoading());
    let url = `comment/${commentid}`;
    let response;
    try {
      response = await client.patch(url, changes);
      if (response.status == 200) {
        dispatch(updateComment({ ...payload, changes: { ...response.data } }));
        dispatch(stopLoading());
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.error);
      dispatch(stopLoading());
    }
    dispatch(stopLoading());
  }
);

export const deleteCommentApi = createAsyncThunk(
  "tag/delete",
  async (payload, { dispatch }) => {
    const { blogId, commentId } = payload;
    dispatch(startLoading());
    let url = `comment/${commentId}`;
    let response;
    try {
      response = await client.deleteItem(url);
      if (response.status == 200) {
        dispatch(deleteComment({ blogId: blogId, commentId: commentId }));
        message.success("Thành công");
        dispatch(stopLoading());
      }
    } catch (error) {
      message.error(error.response.data.error);
      dispatch(stopLoading());
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    deleteComment: (state, action) => {
      const { blogId, commentId } = action.payload;
      const blogIndex = state.comments.findIndex((blog) => blog.id == blogId); //find blog contain removing comment
      const commentIndex = state.comments[blogIndex].comments.findIndex(
        (cmt) => cmt.id == commentId
      );
      state.comments[blogIndex].comments.splice(commentIndex, 1);
    },
    updateComment: (state, action) => {
      const { changes, commentid, blogid } = action.payload;
      const blogIndex = state.comments.findIndex((blog) => blog.id == blogid); //find blog contain removing comment
      const commentIndex = state.comments[blogIndex].comments.findIndex(
        (cmt) => cmt.id == commentid
      );

      state.comments[blogIndex].comments[commentIndex] = {
        ...state.comments[blogIndex].comments[commentIndex],
        ...changes,
      };
    },
  },
});

export const {
  setComments,
  deleteComment,
  insertComment,
  updateComment,
} = commentSlice.actions;

export default commentSlice.reducer;