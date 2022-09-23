
import {
  createFromIconfontCN,
} from "@ant-design/icons";
import { Button } from "antd";
import { Layout } from "antd";
import SidebarMenu from "components/Menu";
import confirm from "components/Modals/ConfirmModal";
import NavBar from "components/NavBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { getCookie } from "utils/helper";
import ScrollToTop from "utils/ScrollToTop";

import Sidebar from "../components/sidebar";
import { lougout } from "../redux/reducer/authSlice";
import SidebarRoute from "../routes/SidebarRoute";
const { Header, Content } = Layout;

const routeConfig = [
  { key: "1", path: "/home/categories", label: "Danh mục sản phẩm" },
  { key: "2", path: "/home/comments", label: "Danh sách bình luận" },
  { key: "3", path: "/home/blogs", label: "Danh sách bài viết" },
  { key: "4", path: "/home/tags", label: "Quản lí thẻ" },
  { key: "5", path: "/home/media-library", label: "Thư viện ảnh" },
  { key: "6", path: "/home/banner", label: "Quản lý banner" },
  { key: "7", path: "/home/slide", label: "Quản lý slide" },
  { key: "9", path: "/home/product/category", label: "Danh mục sản phẩm" },
  { key: "10", path: "/home/personal", label: "Trang cá nhân" },
  { key: "11", path: "/home/product", label: "Tất cả sản phẩm" },
  { key: "10", path: "/home/category", label: "Quản lý danh mục" },
  { key: "12", path: "/home/subscribe", label: "Đăng ký nhận tin" },
  { key: "13", path: "/home/order", label: "Quản lý đơn hàng" },
  { key: "0", path: "/home", label: "Home", },
];

export default function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { user } = useSelector(state => state.auth)
  const [selectedKey, setSelectedKey] = useState(
  );

  const onMenuClick = (menu) => {
    console.log('ff')
    if (menu.key != "10000") {
      const { path } = routeConfig.find((_item) => _item.key === menu.key);
      history.push(path);
    }
  };

  useEffect(() => {
    setSelectedKey(
      routeConfig.find((_item) => location.pathname.startsWith(_item.path))?.key
    );
  }, [location]);

  const handleLogout = () => dispatch(lougout());


  const menu = (
    <SidebarMenu selectedKey={selectedKey} onMenuClick={onMenuClick} logout={handleLogout} />
  );

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });


  if (!user) return <Redirect to="/login" />

  return (
    <ScrollToTop>
      <Layout >
        <NavBar menu={menu} />
        <Layout >
          <Sidebar menu={menu} />
          <Layout >
            <Header
              className="items-center justify-end lg:flex hidden"
              style={{ padding: 0, backgroundColor: "white" }}
            >
              <Button
                type="danger"
                className="mr-4"
                onClick={() =>
                  confirm("Bạn chuẩn bị đăng xuất", handleLogout, "Đăng xuất")
                }
                icon={<IconFont type="icon-tuichu" />}
              >
                Đăng xuất
              </Button>
            </Header>
            <Content
              className="bg-gray-100 text-left min-h-full p-6 mt-4"
            >
              <SidebarRoute handleLogout={handleLogout} />
            </Content>
          </Layout>
        </Layout >
      </Layout >
    </ScrollToTop>
  );
}
