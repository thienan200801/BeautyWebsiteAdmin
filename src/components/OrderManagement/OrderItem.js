import { List } from "antd";
import { Tag } from 'antd';
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Order_STATUS_TRANS } from "utils/constant";
import getDateTime from "utils/ConvertTime";
import { FormatVndCurrency } from "utils/helper";
// import { Order_STATUS_TRANS } from "utils/constant";

export default function OrderItem({ order }) {
    //   console.log("Order Item nhận ", order);

    // const dispatch = useDispatch();
    const { listOrder } = useSelector((state) => state.order);

    const { isLoading } = useSelector((state) => state.loader);


    return (
        <div >
            <List.Item>
                <div className="w-48 p-4 font-bold text-left">Tên Khách hàng</div>
                <div className="w-48 font-bold text-left">Email</div>
                <div className="w-48 font-bold text-left">Ngày đặt</div>
                <div className="w-48 font-bold text-center">Giá trị đơn hàng</div>
                <div className="w-32 font-bold text-center">Tình trạng </div>
                <div className="w-48 font-bold text-left">Ghi chú của người xử lý</div>
            </List.Item>
            <List
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={listOrder}
                renderItem={(item) => (
                    <div className="cursor-pointer" key={item.id}>
                        <Link to={`/home/order/editor/${item.id}`}>
                            <List.Item
                                key={item.id}
                                className="hover:bg-blue-400 hover:text-white hover:px-2"
                            >
                                <div className="w-48 pl-4">{item.customer_name}</div>
                                <div className="w-48 overflow-hidden">{item.customer_email}</div>
                                <div className="w-48 overflow-hidden">{getDateTime(item.createdAt)}</div>
                                <div className="w-48 overflow-hidden text-center">{FormatVndCurrency(item.total)}</div>
                                <div className="w-32 overflow-hidden text-center">
                                    <Tag color={Order_STATUS_TRANS[item.status] === "Đang chờ" ? "default" : (Order_STATUS_TRANS[item.status] === "Đã giao hàng" ? "success" : (Order_STATUS_TRANS[item.status] === "Đang giao hàng" ? "warning" : (Order_STATUS_TRANS[item.status] === "Xác nhận" ? "processing" : "warning")))}>{Order_STATUS_TRANS[item.status]}</Tag>
                                </div>
                                <div className="w-48 overflow-hidden text-left">{item.handle_note}</div>
                            </List.Item>
                        </Link>
                    </div>
                )}
            />
        </div>
    );
}
