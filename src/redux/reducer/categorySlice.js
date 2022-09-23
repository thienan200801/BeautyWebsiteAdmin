import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { message } from "antd";
import { callNotification } from "App";
import { current } from "immer";
import { arrayMove } from "react-sortable-hoc";

import * as client from "../../api/index";
import { deepCopy, getNodeInTree, moveOrderImmutable, swapOrderImmutable, updateNodeInTree } from "../../utils/helper";
import { list_to_tree } from "../../utils/helper";
import { startLoading, stopLoading } from "../reducer/loaderSlice";

const initialState = {
  categories: [],
};

export const getCategory = createAsyncThunk(
  "category/search",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "category";
    let response;
    try {
      response = await client.get(url, payload);
      if (response.status == 200) {
        dispatch(setCategories(response.data));
        dispatch(stopLoading());
      }
    } catch (error) {
      console.log(error);
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "category/create";

    let response;
    try {
      response = await client.post(url, payload);
      if (response.status == 200) {
        callNotification(() => message.success("Thành công"));
        dispatch(getCategory());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `category/${payload}`;
    console.log("category/delete", payload);
    let response;
    try {
      response = await client.deleteItem(url, payload);
      if (response.status == 200) {
        callNotification(() => message.success("Thành công"));
        dispatch(getCategory());
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }
  }
);


export const editCategory = createAsyncThunk(
  "category/modify",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `category/${payload.id}`;

    let response;
    try {
      response = await client.patch(url, payload.data);
      if (response.status == 200) {
        callNotification(() => message.success("Thành công"));
        dispatch(getCategory());

      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(stopLoading());
    }

    //test zone:

  }
);


export const changeCategoryOrder = createAsyncThunk(
  "category/modify",
  async ({ id, changes }, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = `category/order/${id}`;
    let response;
    try {
      response = await client.patchWithQuery(url, changes);
      if (response.status == 200) {
        // callNotification(() => message.success("Thành công"));
        // dispatch(updateCategory({ id, changes: { order: response.data.order } }))
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(getCategory())
    }

  }
);
export const categorySlice = createSlice({
  name: "/category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      const categoryTree = list_to_tree(action.payload.sort((prev, next) => next.order.localeCompare(prev.order)))

      state.categories = categoryTree
    },
    moveCategoryIndex: (state, action) => {
      const { oldIndex, newIndex } = action.payload
      let copiedArray = deepCopy(current(state.categories))

      state.categories = arrayMove(copiedArray, oldIndex, newIndex)

    },
    moveChildCategoryIndex: (state, action) => {
      const { oldIndex, newIndex, parentId } = action.payload

      let copiedArray = deepCopy(current(state.categories))


      // let parent = copiedArray.find(item => item.id == parentId)
      let parent = getNodeInTree({ children: copiedArray }, parentId)

      parent.children = arrayMove(parent.children, oldIndex, newIndex)
      updateNodeInTree(copiedArray, parentId, parent)

      state.categories = copiedArray
    },
    updateCategory: (state, action) => {
      const { changes, id } = action.payload
      console.log(changes, id)
      const changedCategory = state.categories.find(item => item.id == id)
      Object.assign(changedCategory, changes)
    }
  },
});

export default categorySlice.reducer;

export const { setCategories, moveCategoryIndex, updateCategory, moveChildCategoryIndex } = categorySlice.actions;

// sort category by its order and return as a tree
export const selectAllCategory = createSelector(state => state.category.categories, categogies => categogies)