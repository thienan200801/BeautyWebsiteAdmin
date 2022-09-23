import React from "react";
import { HOST_NAME } from "utils/constant";
import { FormatVndCurrency } from "utils/helper";

export default function OrderProductCard({ orderItem }) {
  let price = 0;
  let number = 0;
  let total = 0;
  let discountedPrice = 0;
  let discount = 0;
  if (typeof orderItem !== "undefined") {
    //Lay gia san pham
    if (orderItem.ProductVariant) {
      price = orderItem.ProductVariant.price;
    } else {
      price = orderItem.product.price;
    }

    // Lay so luong sna pham
    number = orderItem.number;

    // Lay gia sau khi giam. chia number vi discount nay la tong discount.
    discount = number > 0 ? orderItem.discount / number : orderItem.discount;
    discountedPrice = price - discount;

    // Tinh tong gia tri sau khi giam
    total = orderItem.total - orderItem.discount;
  }

  function priceComponent(price, discountedPrice) {
    if (price !== discountedPrice) {
      return (
        <>
          <span className="line-through text-gray">
            {FormatVndCurrency(price)}
          </span>{" "}
          <span>{FormatVndCurrency(discountedPrice)}</span>
        </>
      );
    }

    return (
      <>
        <span>{FormatVndCurrency(price)}</span>
      </>
    );
  }

  return (
    <div className="grid grid-cols-6 border-t items-center py-2">
      <span className="justify-self-center ">
        <img
          src={`${HOST_NAME}${orderItem?.product?.thumbnail}`}
          alt="hello"
          className="w-12 h-12 object-center object-cover  rounded-full"
        />
      </span>
      <span className="justify-self-center col-span-2">{`${
        orderItem?.product?.name
      } ${
        orderItem?.ProductVariant?.name
          ? "- " + orderItem?.ProductVariant?.name
          : ""
      }`}</span>
      <span className="justify-self-center">
        {priceComponent(price, discountedPrice)}
      </span>
      <span className="justify-self-center break-words">{number}</span>
      <span className="justify-self-center">{FormatVndCurrency(total)}</span>
    </div>
  );
}
