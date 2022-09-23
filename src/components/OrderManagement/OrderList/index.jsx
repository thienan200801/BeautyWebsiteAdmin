import React from 'react'
import { useHistory } from 'react-router'


export default function OrderList() {
    const history = useHistory();
    return (
        <div>
            Quản lý đơn hàng
            danh sách đơn hàng tại đây - phần Lê An
            <div onClick={() => {
                history.push("/home/order/editor");
            }} className='text-sm text-blue-500 underline hover:text-gray-800 cursor-pointer'>Tạo/chỉnh sửa đơn hàng</div>
        </div >
    )
}
