
import React from "react";
import { FormatVndCurrency } from "utils/helper";

import OrderProductCard from "./OrderProductCard";

export default function ProductList({ order }) {
  if (!order) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="font-semibold mb-4 text-base">Thông tin đơn hàng</div>
      <div className="w-full border mb-2">
        <div>
          <div className="grid grid-cols-6 font-semibold py-2">
            <span className="justify-self-center"> </span>
            <span className="justify-self-center col-span-2">Sản phẩm</span>
            <span className="justify-self-center">Đơn giá</span>
            <span className="justify-self-center">Số lượng</span>
            <span className="justify-self-center">Tạm tính</span>
          </div>
          {order?.items &&
            order?.items.length > 0 &&
            order?.items.map((item) => {
              const itemKey =
                Number.parseInt(item.product_id) +
                Number.parseInt(item.variant_id) +
                Number.parseInt(item.order_id);

              return <OrderProductCard key={itemKey} orderItem={item} />;
            })}
        </div>
      </div>
      <div className="font-semibold self-end flex flex-col items-end mr-6">
        {/* <div>Tạm tính: </div> */}
        <div>Tổng cộng: {FormatVndCurrency(order?.total)}</div>
      </div>
    </div>
  );
}
