import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import React, { useState } from "react";

export default function NavBar({ menu }) {
  const [visible, setVisible] = useState(false);
  const ToggleMenuButton = () => {
    if (visible) {
      return (
        <MenuFoldOutlined
          className="text-lg cursor-pointer p-2 rounded-sm text-white bg-blue-500 transition duration-300"
          onClick={() => setVisible(false)}
        />
      );
    } else {
      return (
        <MenuUnfoldOutlined
          className="text-lg cursor-pointer p-2 rounded-sm text-white bg-blue-500 transition duration-300"
          onClick={() => setVisible(true)}
        />
      );
    }
  };
  return (
    <nav className="lg:hidden visible py-2 px-4 text-white text-left">
      <ToggleMenuButton />
      <Drawer
        title="Menu"
        bodyStyle={{ padding: "0", paddingTop: "24px" }}
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>
    </nav>
  );
}
