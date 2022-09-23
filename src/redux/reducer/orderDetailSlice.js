import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';
import { callNotification } from "App";
import { HOST_NAME } from "utils/constant";

import * as client from "../../api";
import { setError, startLoading, stopLoading } from "./loaderSlice";

const initialState = {
    orders: [],
    orderEditing: null,
    invoice: null,
};

// pass empty data to get all tags
export const getOrders = createAsyncThunk(
    "order/search",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(startLoading());
        let url = "order";
        try {
            const response = await client.get(url, payload);
            switch (response.status) {
                case 200:
                    console.log("success", response.data);
                    dispatch(setOrders(response.data));
                    //   dispatch(stopLoading());
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

export const getSpecificOrder = createAsyncThunk(
    "order/searchID",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        let url = `order/${payload}`;
        dispatch(startLoading());

        try {
            const response = await client.get(url, payload);
            switch (response.status) {
                case 200:
                    dispatch(setOrderEditing(response.data));
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
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const editOrder = createAsyncThunk(
    "order/modify",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(startLoading());
        let url = `order/${payload.id}`;
        try {
            const response = await client.patch(url, payload.state);
            switch (response.status) {
                case 200:
                    callNotification(() => message.success("Thành công"));
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
            callNotification(() => message.error("Thất bại :( Vui lòng thao tác lại"));
            let { message } = error;
            if (message) {
                dispatch(setError(message));
                dispatch(stopLoading());
                return null;
            }
        }
    }
);

export const getInvoice = createAsyncThunk(
    "order/invoice",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        let url = `order/invoice/${payload}`;
        try {
            const response = await client.get(url, payload);
            switch (response.status) {
                case 200:
                    dispatch(setInvoice(response.data));
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
            callNotification(() => message.error("Thất bại :( Vui lòng thao tác lại"));
            let { message } = error;
            if (message) {
                dispatch(setError(message));
                return null;
            }
        }
    }
);

export const confirmOrder = createAsyncThunk(
    "order/confirm",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        // dispatch(startLoading());
        let url = `order/confirm/${payload}`;
        try {
            const response = await client.patch(url, payload);
            switch (response.status) {
                case 200:
                    // dispatch(getOrders());
                    callNotification(() => message.success("Mail Thành công"));
                    dispatch(getSpecificOrder(payload));
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

export const confirmPaymentOrder = createAsyncThunk(
    "order/confirmPayment",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        // dispatch(startLoading());
        let url = `order/shipping/${payload}`;
        try {
            const response = await client.patch(url, payload);
            switch (response.status) {
                case 200:
                    // dispatch(getOrders());
                    dispatch(getSpecificOrder(payload));
                    callNotification(() => message.success("Mail Thành công"));

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

export const orderDetailSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setOrderEditing: (state, action) => {
            state.orderEditing = action.payload;
        },
        setInvoice: (state, action) => {
            state.invoice = `${HOST_NAME}${action.payload.url}`;
        },
    },
});

export default orderDetailSlice.reducer;
export const { setOrders, setOrderEditing, setInvoice } = orderDetailSlice.actions;
