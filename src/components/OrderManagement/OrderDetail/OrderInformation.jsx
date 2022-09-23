import React from "react";

export default function OrderInformation({ orderInformation }) {
  return (
    <div className="break-words w-1/2">
      <div className="font-semibold text-base">Thông tin khách hàng</div>
      <div>
        <span className="font-semibold">Tên:</span>
        {` ${orderInformation?.customer_name} `}
      </div>
      <div>
        <span className="font-semibold">Email:</span>
        {` ${orderInformation?.customer_email} `}
      </div>
      <div>
        <span className="font-semibold">SĐT:</span>
        {` ${orderInformation?.phone} `}
      </div>
      <div>
        <span className="font-semibold">Địa chỉ:</span>
        {` ${orderInformation?.address} `}
      </div>
      <div>
        <span className="font-semibold">Ghi chú:</span>
        {` ${orderInformation?.note ? orderInformation?.note : ""} `}
      </div>
    </div>
  );
}
