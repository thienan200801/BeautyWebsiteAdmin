import { Affix, Layout } from "antd";
import React from "react";

const { Sider } = Layout;

export default function Sidebar({ menu }) {
  return (
    <Affix offsetTop={0}>
      <Sider
        trigger={null}
        theme="light"
        // collapsible
        breakpoint={"lg"}
        collapsedWidth={0}
        // collapsed={collapsed}
        style={{ height: "100vh" }}
      >
        <div className=" m-2 h-11">
          <img style={{ height: "100%" }} className="mx-auto" src="/drdongphuong-logo.png" alt="drdongphuong" />
        </div>
        {menu}
      </Sider>
    </Affix>
  );
}
