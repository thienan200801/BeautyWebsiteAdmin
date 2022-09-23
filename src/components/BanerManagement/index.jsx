import "../../style/scrollbar.css";

import { Button, List, Menu } from "antd";
import Loader from "components/Loader/Loader";
import BannerModal from "components/Modals/Banner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBanner } from "redux/reducer/bannerSlice";

import BannerItem from "./BannerItem";

export default function BannerManagement({ history }) {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const { isLoading } = useSelector((state) => state.loader);

  //Lam 1 cai get Banner slice

  useEffect(() => {
    dispatch(getBanner({}));
    console.log("get all banners", banners);
  }, []);

  const menu = (banner) => (
    <Menu>
      <Menu.Item
        key="remove"
        danger
        onClick={() => {
          if (
            confirm(
              "Hành động xóa của bạn sẽ không thể khôi phục. Bạn có chắc chắn chưa"
            )
          ) {
            dispatch(deleteBanner(banner.id));
          }
        }}
      >
        {" "}
        Xoá banner
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="w-5/6 m-auto">
      <div className="mb-5">
        <div className="text-2xl font-semibold mb-1">Quản lý banner</div>
        <div>Thêm, xóa và sửa thông tin banner</div>
      </div>

      <div className="border bg-white p-4 overflow-y-hidden">
        <div className="flex justify-between items-center mb-4 border-b pb-3 px-4">
          <div>
            <BannerModal />
          </div>
          <Button
            type="primary "
            onClick={() => {
              history.push("/home/banner-editor/");
            }}
          >
            Tạo banner mới
          </Button>
        </div>

        <List
          loading={isLoading}
          dataSource={banners}
          renderItem={(banner) => (
            <BannerItem key={banner.id} item={banner} menu={menu} />
          )}
        ></List>
      </div>
    </div>
  );
}

/**
 *
 */
