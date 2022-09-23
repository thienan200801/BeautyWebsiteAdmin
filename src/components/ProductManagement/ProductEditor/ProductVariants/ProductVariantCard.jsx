import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import { FormatVndCurrency } from "utils/helper";

function ProductVariantCard({ variant, eventHandler }) {
  const handleOnChangeVariantInfor = () => {
    eventHandler.handleModifyingVariant(variant);
  };

  const handleDeleteVariant = () => {
    eventHandler.handleDeleteVariant(variant);
  };

  const menu = () => (
    <Menu>
      <Menu.Item key="333" onClick={handleOnChangeVariantInfor}>
        Chỉnh sửa
      </Menu.Item>
      <Menu.Item key="79657" danger onClick={handleDeleteVariant}>
        Xoá biến thể
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="grid grid-cols-4 px-6 h-16 text-sm border-b ">
      <div className="justify-self-center flex items-center break-words">
        {variant?.name}
      </div>
      <div className="justify-self-center flex items-center">
        {FormatVndCurrency(variant?.price)}
      </div>
      <div className="justify-self-center flex items-center ">
        {variant?.description}
      </div>
      <div className="justify-self-center flex items-center">
        <Dropdown
          overlay={menu}
          placement="bottomLeft"
          trigger={["click"]}
          arrow
        >
          <button className="bg-blue-200 p-1 rounded-full w-auto h-auto flex hover:bg-blue-400 transform duration-300">
            <EllipsisOutlined style={{ fontSize: "14px" }} />
          </button>
        </Dropdown>
      </div>
    </div>
  );
}

export default ProductVariantCard;
