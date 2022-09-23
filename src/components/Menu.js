import { createFromIconfontCN } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import confirm from "./Modals/ConfirmModal";

const { SubMenu } = Menu;

export default function SidebarMenu({ selectedKey, ...props }) {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
      onSelect={props.onMenuClick}
    >
      <Menu.Item key="0" >Trang chủ</Menu.Item>
      <SubMenu key="bai-viet" title="Bài viết">
        <Menu.Item key="1" >Danh mục bài viết</Menu.Item>
        <Menu.Item key="3">Danh sách bài viết</Menu.Item>
        <Menu.Item key="2">Bình luận</Menu.Item>
        <Menu.Item key="4">Thẻ</Menu.Item>
      </SubMenu>
      <SubMenu key="san-pham" title="Sản phẩm">
        <Menu.Item key="9">Danh mục sản phẩm</Menu.Item>
        <Menu.Item key="11">Tất cả sản phẩm</Menu.Item>
      </SubMenu>
      <Menu.Item key="13">Quản lý đơn hàng</Menu.Item>

      <Menu.Item key="5">Thư viện ảnh</Menu.Item>
      <SubMenu key="banner" title="Banner quảng cáo">
        <Menu.Item key="6">Quản lý Banner</Menu.Item>
        <Menu.Item key="7">Quản lý các Slide</Menu.Item>
      </SubMenu>

      <Menu.Item key="10">Cập nhật trang về tôi</Menu.Item>

      <Menu.Item key="12">Đăng ký nhận tin</Menu.Item>

      <Menu.Item key="10000" danger onClick={() => confirm("Bạn chuẩn bị đăng xuất", () => props.logout(), "Đăng xuất")}>
        <span className="lg:hidden">Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );
}
