import { configureStore } from "@reduxjs/toolkit";

import aboutMeReducer from "./reducer/aboutMeSlice";
import authReducer from "./reducer/authSlice";
import bannerSlice from "./reducer/bannerSlice";
import blogReducer from "./reducer/blogSlice";
import categoryReducer from "./reducer/categorySlice";
import commentSlice from "./reducer/commentSlice";
import getNews from "./reducer/getNews";
import imageReducer from "./reducer/imageSlice";
import loaderReducer from "./reducer/loaderSlice";
import mediamodalSlice from "./reducer/mediaModalSlice";
import orderDetailSlice from "./reducer/orderDetailSlice";
import orderSlice from "./reducer/orderSlice";
import productCategorySlice from "./reducer/productCategorySlice";
import productSlice from "./reducer/productSlice";
import slideSlice from "./reducer/slideSlice";
import tagReducer from "./reducer/tagSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    banner: bannerSlice,
    slide: slideSlice,
    tag: tagReducer,
    category: categoryReducer,
    image: imageReducer,
    blog: blogReducer,
    mediaModal: mediamodalSlice,
    personal: aboutMeReducer,
    comment: commentSlice,
    productCategory: productCategorySlice,
    product: productSlice,
    news: getNews,
    order: orderSlice,
    orderDetail: orderDetailSlice,
  },
});
