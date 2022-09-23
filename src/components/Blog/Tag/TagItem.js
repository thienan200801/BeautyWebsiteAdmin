import { MoreOutlined, TagFilled } from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";

export default function TagItem({ item, menu }) {
  return (
    <div className="py-4 flex w-full justify-between items-center border bg-white">
      <div className="flex items-center">
        <TagFilled style={{ fontSize: "160%", color: "gray" }} className="px-4" />
        {item.name}
      </div>

      <Dropdown
        overlay={menu(item)}
        placement="bottomLeft"
        trigger={["click"]}
        arrow
      >
        <button className=" h-full px-2">
          <MoreOutlined style={{ fontSize: "160%" }} />
        </button>
      </Dropdown>
    </div>
  );
}
