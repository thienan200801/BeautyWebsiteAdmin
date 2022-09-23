import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { message } from "antd";
import { callNotification } from "App";
import { HOST_NAME } from "utils/constant";

import * as client from "../../api";
import { setError, startLoading, stopLoading } from "./loaderSlice";


const initialState = {
  products: [],
  productEditing: null,
  productCategories: [],
  productThumbnail: null,
  productImages: [],
  productID: null,
  productVariant: null,
};

// pass empty data to get all tags
export const getProducts = createAsyncThunk(
  "product/search",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "product";
    try {
      const response = await client.get(url, payload);
      switch (response.status) {
        case 200:
          console.log("success", response.data);
          dispatch(setProducts(response.data));
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

export const getSpecificProduct = createAsyncThunk(
  "product/searchID",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    let url = `product/${payload}`;
    try {
      const response = await client.get(url, payload);
      switch (response.status) {
        case 200:
          dispatch(setProductEditing(response.data));
          dispatch(setProductID(response.data.id));
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

export const createProduct = createAsyncThunk(
  "product/create",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "product/create";
    try {
      const response = await client.post(url, payload);
      switch (response.status) {
        case 200:
          dispatch(setProductID(response.data.id));
          dispatch(getProducts());
          console.log("id set ne", response.data.id);
          //Message chi xuat hien khi them moi, khong xuat hien khi tao variant
          if (!initialState.productID) {
            message.success("Tạo product thành công");
          }
          return;
        case 400:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
        default:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
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

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `product/${payload}`;
    try {
      const response = await client.deleteItem(url, payload);
      switch (response.status) {
        case 200:
          callNotification(() => message.success("Thành công"));
          dispatch(getProducts());
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

export const editProduct = createAsyncThunk(
  "product/modify",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `product/${payload.id}`;
    try {
      const response = await client.patch(url, payload.state);
      switch (response.status) {
        case 200:
          dispatch(getProducts());
          dispatch(getSpecificProduct(payload.id));
          callNotification(() => message.success("Sửa product thành công"));
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
        message.error("Sửa product thất bại :( Vui lòng thao tác lại")
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

//Product categories section here
export const getProductCategories = createAsyncThunk(
  "product/category/search",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "product/category";
    try {
      const response = await client.get(url, payload);
      switch (response.status) {
        case 200:
          dispatch(setProductCategories(response.data));
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

export const createProductVariant = createAsyncThunk(
  "product/variant/create",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = "product/variant/create";
    try {
      const response = await client.post(url, payload.data);
      switch (response.status) {
        case 200:
          callNotification(() =>
            message.success("Tạo biển thể sản phẩm thành công")
          );
          dispatch(getSpecificProduct(payload.productID));
          return;
        case 400:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
        default:
          throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
      }
    } catch (error) {
      callNotification(() => message.error("Tạo biến thể thất bại"));
      let { message } = error;
      if (message) {
        dispatch(setError(message));
        dispatch(stopLoading());
        return null;
      }
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const editProductVariant = createAsyncThunk(
  "product/variant/patch",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `product/variant/${payload.id}`;
    try {
      const response = await client.patch(url, payload.state);
      switch (response.status) {
        case 200:
          callNotification(() =>
            message.success("Sửa biển thể sản phẩm thành công")
          );
          dispatch(getSpecificProduct(payload.productID));
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
        message.error("Sửa product thất bại :( Vui lòng thao tác lại")
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

export const deleteProductVariant = createAsyncThunk(
  "product/variant/delete",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    let url = `product/variant/${payload.id}`;
    try {
      const response = await client.deleteItem(url, payload);
      switch (response.status) {
        case 200:
          callNotification(() => message.success("Thành công"));
          dispatch(getSpecificProduct(payload.productID));
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductCategories: (state, action) => {
      // sort by created day, but use id instead
      const sortByCreated = action.payload.sort((prev, next) => prev.id - next.id)
      state.productCategories = sortByCreated
    },
    setProductEditing: (state, action) => {
      state.productEditing = action.payload;
    },
    setProductEditingWithUrlChange: (state, action) => {
      let banner = action.payload;
      state.productEditing = {
        ...banner,
        media: {
          ...banner.media,
          url: HOST_NAME.concat(banner.media.url),
        },
      };
    },
    initProduct: (state, _action) => {
      const init = {
        name: "",
        description: "",
        category_id: 0,
        media: [],
        thumbnail: "",
        price: 0,
        is_on_sale: false,
        discount: 0,
        maxDiscount: null,
        SKU: "string",
        is_track_inventory: true,
        is_in_stock: true,
        is_publish: true,
        brand: "",
        shipping_infor: "",
        return_infor: "",
        manual_infor: "",
        brand_infor: "",
        deal_of_week: false,
      };
      state.productEditing = init;
    },
    setThumbnail: (state, action) => {
      state.productThumbnail = action.payload;
    },
    setListImages: (state, action) => {
      state.productImages = action.payload;
    },
    setCategories: (state, action) => {
      state.productEditing.media = action.payload;
    },
    setProductID: (state, action) => {
      state.productID = action.payload;
    },
    setProductVariant: (state, action) => {
      state.productVariant = action.payload;
    },
  },
});

export default productSlice.reducer;
export const {
  setProducts,
  setProductEditing,
  setProductEditingWithUrlChange,
  setProductCategories,
  initProduct,
  setThumbnail,
  setListImages,
  setProductID,
  setProductVariant,
} = productSlice.actions;

export const selectNomalizedProducts = createSelector(
  (state) => state.product.products,
  (products) => {
    if (products.length > 0)
      return Object.fromEntries(
        products.map((product) => [
          product.id,
          {
            id: product.id,
            name: product.name,
            description: product.description,
            thumbnail: product.thumbnail,
          },
        ])
      );
    else return null;
  }
);
