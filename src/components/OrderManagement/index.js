/* eslint-disable unused-imports/no-unused-vars */

import {
    LoadingOutlined, SearchOutlined,
} from "@ant-design/icons";
import { Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getOrder, selectOrders } from "redux/reducer/orderSlice";
import { Order_STATUS, Order_STATUS_TRANS } from "utils/constant";

import OrderItem from "./OrderItem";
const { TabPane } = Tabs;
export default function OrderManagement() {
    const history = useHistory();
    const orders = useSelector(selectOrders);
    const { isLoading } = useSelector((state) => state.loader);
    const { listOrder } = useSelector((state) => state.order);
    const [query, setQuery] = useState(null);
    const [orderId, setOrderId] = useState();
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState();
    const dispatch = useDispatch();
    const { pendingOrder, allOrders } = useSelector((state) => state.order);
    //console.log("pendingOrder",pendingOrder);

    useEffect(() => {
        dispatch(getOrder());
    }, []);

    useEffect(() => {
        if (orderId) setVisible(true);
    }, [orderId]);

    // useEffect(() => {

    //     dispatch(getOrder({ customer_name: query }));
    // }, [query]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            dispatch(getOrder({ customer_name: query }));
        }, 500);
        return () => clearTimeout(debounceSearch)
    }, [query, dispatch]);



    const tabheader = (status) => {
        if (status) {
            //console.log("STATUS", status);
            const length = listOrder.length;
            return (
                <span className=" text-black px-2">
                    {Order_STATUS_TRANS[status]}
                    {/* <span
                        style={{ paddingLeft: "6px", paddingRight: "6px" }}
                        className="ml-2 text-gray-600 border border-gray-500 rounded-full text-xs"
                    >
                        {listOrder.length}
                    </span> */}
                </span>
            );
        }
    };
    //search
    const spin = (
        <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
    );
    const AddNewSearch = (
        <div className=" w-44   relative flex items-center flex-wrap mb-2 bg-gray-600">
            {" "}
            <div className="absolute top-0 left-0 z-10  flex items-center h-full w-10 justify-center overflow-hidden rounded-tl rounded-bl  bg-blue-600">
                {isLoading && <Spin indicator={spin} />}
                {!isLoading && (
                    <SearchOutlined style={{ fontSize: "18px", color: "white" }} />
                )}
            </div>
            <input
                value={query}
                type="text"
                placeholder="Nhập tên"
                onChange={(e) => {
                    // console.log("e.target.value", e.target.value);
                    setQuery(e.target.value)
                }}
                className=" relative pr-2 py-2 w-44 focus:w-full transition-width outline-none  rounded-tr round-br border  border-gray-300 focus:border-blue-600 duration-300 pl-12"
            />{" "}
        </div>
    );


    const handleTabChange = (status) => {
        dispatch(getOrder({ status: status === "publish" ? undefined : status }));
    }

    function count(status) {
        let quantity;
        if (status === Order_STATUS.publish) {
            quantity = allOrders?.length;
        }
        else {
            quantity = allOrders?.filter(order => order.status == status).length;
        }

        return (<span
            style={{ paddingLeft: "5px", paddingRight: "5px" }}
            className="mr-10 mt-1 text-gray-600 border border-gray-500 rounded-full text-xs absolute"
        >
            {quantity}
        </span>);
    }
    return (
        <div className="w-full m-auto ">
            <div className="text-2xl font-semibold mb-5">Danh sách đặt hàng</div>
            <div className="bg-white ">

                <Tabs
                    tabBarExtraContent={AddNewSearch}
                    onChange={handleTabChange}
                    className="pb-2 bg-white relative"
                    style={{ padding: "25px 30px" }}
                >

                    {
                        Object.keys(Order_STATUS_TRANS).map((status, index) => (
                            <>
                                <TabPane tab={<span>{tabheader(status)}   {count(status)}</span>} key={status}>
                                    <OrderItem
                                        order={status}
                                        key={index}
                                        setOrderId={setOrderId}
                                    />
                                </TabPane>
                            </>))
                    }

                </Tabs>

            </div>
        </div>
    );
}
