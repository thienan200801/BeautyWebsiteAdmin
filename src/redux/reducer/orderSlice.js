
import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import { message } from "antd";
import * as client from "api/index";
import { callNotification } from "App";
import { Order_STATUS_TRANS } from "utils/constant";

import { startLoading, stopLoading } from "./loaderSlice";

const orderAdapter = createEntityAdapter({});

const initialState = orderAdapter.getInitialState({
    pendingOrder: [],
    listOrder: [],
    IdOrder: null,

});
////////////////////////////////////
export const getOrder = createAsyncThunk(
    "order/get",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(startLoading());
        let url = "order";
        let response;
        try {
            response = await client.get(url, payload);

            if (response.status == 200) {
                //console.log("response.status == 200", response.status == 200, "payload", payload);
                dispatch(setListOrder(response.data));
                if (!payload?.status) {
                    dispatch(setAllOrders(response.data));
                    console.log("DATA", response.data)
                }
                if (payload?.status === "pending") {
                    dispatch(setPendingOrder(response.data));

                }
                dispatch(stopLoading());
            }
        } catch (error) {
            callNotification(() => message.error("Không thành công", error));
            console.log("error", error);
            dispatch(stopLoading());
        }
    }
);


//////////////////
//get order by id
export const getOrderWithId = createAsyncThunk(
    "order/getbyid",
    async (payload, thunkApi) => {
        const { dispatch } = thunkApi;
        const { id } = payload;

        dispatch(startLoading());
        let url = `order/${id}`;

        let response;
        try {
            response = await client.get(url, {});
            if (response.status == 200 || response.status == 204) {
                dispatch(setIdOrder(response.data));

                dispatch(stopLoading());
            }
        } catch (error) {
            callNotification(() => message.error("Không thành công"));
            console.log(error);
            dispatch(stopLoading());
        }
    }
);

///////////

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        ////////////
        setOrder: (state, action) => {
            orderAdapter.upsertMany(state, action);
        },
        /////////////
        setListOrder: (state, action) => {
            state.listOrder = action.payload;
        },
        setAllOrders: (state, action) => {
            state.allOrders = action.payload;
        },
        setIdOrder: (state, action) => {
            state.IdOrder = action.payload;
        },
        setPendingOrder: (state, action) => {
            state.pendingOrder = action.payload;
        }

    },
});

export default orderSlice.reducer;

export const {
    setOrder,
    setAllOrders,
    setListOrder,
    setIdOrder,
    setPendingOrder,

} = orderSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds,
} = orderAdapter.getSelectors((state) => state.order);
export const selectOrders = createSelector(selectAllOrders, (orders) => {
    const cagorized = Object.keys(Order_STATUS_TRANS).map((ordertype) => {
        return {
            [ordertype]: orders.filter((item) => item.status === Order_STATUS_TRANS[ordertype]),
        };
    });
    return cagorized;
});

