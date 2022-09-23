import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as client from "../../api";
import { setError, startLoading, stopLoading } from "./loaderSlice";

const initialState = {
    news: [],

};
//fetch product category
export const fetchNews = createAsyncThunk(
    "news/fetch",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(startLoading());
        let url = "subscribe";
        try {
            const response = await client.get(url, payload);
            switch (response.status) {
                case 200:
                    console.log("success 200 response.data", response.data);
                    dispatch(setNews(response.data));
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
// export const deleteProductCategory = createAsyncThunk(
//     "productCategory/deleteProductCategory",
//     async (payload, thunkApi) => {
//         const { dispatch } = thunkApi;
//         //console.log("XOA", payload);
//         dispatch(startLoading());
//         let url = `product/category/${payload}`;
//         try {
//             const response = await client.deleteItem(url, payload);
//             switch (response.status) {
//                 case 200:
//                     callNotification(() => message.success("Thành công"));
//                     dispatch(fetchProductCategory());
//                     return;
//                 case 400:
//                     throw new Error({
//                         message: "Lỗi không xác định, vui lòng thao tác lại",
//                     });
//                 default:
//                     throw new Error({
//                         message: "Lỗi không xác định, vui lòng thao tác lại",
//                     });
//             }
//         } catch (error) {
//             callNotification(() => message.error("Thất bại"));
//             let { message } = error;
//             if (message) {
//                 dispatch(setError(message));
//                 dispatch(stopLoading());
//                 return null;
//             }
//         }
//     }
// );
//create Product Category
// export const createProductCategory = createAsyncThunk(
//     "productCategory/categoryCreate",
//     async (payload, thunkApi) => {
//         const { dispatch } = thunkApi;
//         dispatch(startLoading());
//         let url = "product/category/create";
//         try {
//             const response = await client.post(url, payload);
//             switch (response.status) {
//                 case 200:
//                     dispatch(fetchProductCategory());
//                     callNotification(() => message.success("Tạo product thành công"));
//                     return;
//                 case 400:
//                     throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
//                 default:
//                     throw { message: "Lỗi không xác định, vui lòng thao tác lại" };
//             }
//         } catch (error) {
//             callNotification(() => message.error("Tạo product thất bại"));
//             let { message } = error;
//             if (message) {
//                 dispatch(setError(message));
//                 dispatch(stopLoading());
//                 return null;
//             }
//         }
//     }
// );
//edit Product category
// export const editProductCategory = createAsyncThunk(
//     "productCategory/modifyProductCategory",
//     async (payload, thunkApi) => {
//         const { dispatch } = thunkApi;
//         dispatch(startLoading());
//         //console.log("EDIT", payload);
//         let url = `product/category/${payload.id}`;
//         try {
//             const response = await client.patch(url, payload.data);
//             switch (response.status) {
//                 case 200:
//                     dispatch(fetchProductCategory());
//                     callNotification(() => message.success("Sửa product thành công"));
//                     return;
//                 case 400:
//                     throw new Error({
//                         message: "Lỗi không xác định, vui lòng thao tác lại",
//                     });
//                 default:
//                     throw new Error({
//                         message: "Lỗi không xác định, vui lòng thao tác lại",
//                     });
//             }
//         } catch (error) {
//             callNotification(() =>
//                 message.error("Sửa product thất bại :( Vui lòng thao tác lại")
//             );
//             let { message } = error;
//             if (message) {
//                 dispatch(setError(message));
//                 dispatch(stopLoading());
//                 return null;
//             }
//         }
//     }
// );


export const news = createSlice({
    name: "news",
    initialState,
    reducers: {

        ////////////////////////////////////////////////
        setNews: (state, action) => {
            state.news = action.payload;
        },


    },
});

export default news.reducer;
export const {
    // setProducts,
    setNews,

} = news.actions;
