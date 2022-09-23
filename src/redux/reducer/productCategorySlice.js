import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { callNotification } from "App";
import { current } from "immer";
import { arrayMove } from "react-sortable-hoc";
import { HOST_NAME } from "utils/constant";

import * as client from "../../api";
import { deepCopy, getNodeInTree, list_to_tree, updateNodeInTree } from "../../utils/helper";
import { setError, startLoading, stopLoading } from "./loaderSlice";

const initialState = {
  products: [],
  productCategory: [],
  productEditing: null,
  productCategories: [],
};
//fetch product category
export const fetchProductCategory = createAsyncThunk(
  "productCategory/fetchcategory",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "product/category";
    try {
      const response = await client.get(url, payload);
      switch (response.status) {
        case 200:
          // console.log("success response.data", response.data);
          dispatch(setProductCategory(response.data));
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
//delete Product category
export const deleteProductCategory = createAsyncThunk(
  "productCategory/deleteProductCategory",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    //console.log("XOA", payload);
    dispatch(startLoading());
    let url = `product/category/${payload}`;
    try {
      const response = await client.deleteItem(url, payload);
      switch (response.status) {
        case 200:
          callNotification(() => message.success("Thành công"));
          dispatch(fetchProductCategory());
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
//create Product Category
export const createProductCategory = createAsyncThunk(
  "productCategory/categoryCreate",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "product/category/create";
    try {
      const response = await client.post(url, payload);
      switch (response.status) {
        case 200:
          dispatch(fetchProductCategory());
          callNotification(() => message.success("Tạo danh mục sản phẩm thành công"));
          return;
        case 400:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
        default:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
      }
    } catch (error) {
      callNotification(() => message.error("Tạo danh mục sản phẩm thất bại"));
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);
//edit Product category
export const editProductCategory = createAsyncThunk(
  "productCategory/modifyProductCategory",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    //console.log("EDIT", payload);
    let url = `product/category/${payload.id}`;
    try {
      const response = await client.patch(url, payload.data);
      switch (response.status) {
        case 200:
          dispatch(fetchProductCategory());
          callNotification(() => message.success("Sửa danh mục sản phẩm thành công"));
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
      callNotification(() =>
        message.error("Sửa danh mục sản phẩm thất bại :( Vui lòng thao tác lại")
      );
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    }
  }
);

export const changeProductCategoryOrder = createAsyncThunk(
  "product/category/modify",
  async ({ id, changes }, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = `product/category/order/${id}`;
    let response;
    try {
      response = await client.patchWithQuery(url, changes);
      if (response.status == 200) {
        // callNotification(() => message.success("Thành công"));
        // dispatch(updateCategory({ id, changes: { order: response.data.order } }))
      }
    } catch (error) {
      callNotification(() => message.error(error.response.data.error));
      dispatch(fetchProductCategory())
      dispatch(stopLoading());
    }

  }
);

export const productSlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.map((product) => {
        return {
          ...product,
          media: product.media.map((media) => ({
            ...media,
            url: HOST_NAME.concat(media.url),
          })),
          thumbnail: HOST_NAME.concat(product.thumbnail),
        };
      });
    },
    ////////////////////////////////////////////////
    setProductCategory: (state, action) => {
      const categoryTree = list_to_tree(action.payload);
      state.productCategory = categoryTree;
    },
    moveProductCategoryIndex: (state, action) => {
      const { oldIndex, newIndex } = action.payload
      let copiedArray = deepCopy(current(state.productCategory))

      state.productCategory = arrayMove(copiedArray, oldIndex, newIndex)

    },
    moveProductChildCategoryIndex: (state, action) => {
      const { oldIndex, newIndex, parentId } = action.payload
      let copiedArray = deepCopy(current(state.productCategory))
      let parent = getNodeInTree({ children: copiedArray }, parentId)

      parent.children = arrayMove(parent.children, oldIndex, newIndex)
      updateNodeInTree(copiedArray, parentId, parent)

      state.productCategory = copiedArray
    },

  },
});

export default productSlice.reducer;
export const {
  setProductCategory,
  moveProductChildCategoryIndex,
  moveProductCategoryIndex
} = productSlice.actions;
