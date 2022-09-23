import { Button, Form } from "antd";
import { callNotification } from "App";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createBanner,
  editBanner,
  getSpecificBanner,
  setBannerEditing,
  setBanners,
} from "redux/reducer/bannerSlice";

import FormBannerEditor from "./FormEditer";

export default function BannerEditor({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bannerEditing } = useSelector((state) => state.banner);
  const { isLoading } = useSelector(state => state.loader)

  const [form] = Form.useForm();

  const handleCreateOrModifyBanner = (data) => {
    let dataToServer = {
      type: data.bannerType === "cta" ? "cta" : "image",
      title: data.title,
      sub_title: data.subTitle,
      content: data.description,
      button_text: data.bannerType === "cta" ? data.ctaContent : "",
      button_url: data.url,
      media_name: data.bannerImage.filename,
    };

    if (!id) {
      dispatch(createBanner(dataToServer));
      console.log("new data create 😂", dataToServer);
    } else {
      dispatch(editBanner({ id, state: dataToServer }));
      console.log("data modify😍😍", dataToServer);
    }
    history.push("/home/banner/");
  };

  const handleOnClickSaveData = () => {
    const validatingFields = form.validateFields();
    validatingFields
      .then((data) => {
        console.log("validate ne", data);
        handleCreateOrModifyBanner(data);
      })
      .catch((data) => {
        console.log("Please fullfill all data");
      });
  };

  const handleOnClickCanceling = () => {
    history.push("/home/banner/");
  };

  // console.log('❤❤', bannerEditing);

  useEffect(() => {
    if (id) {
      dispatch(getSpecificBanner(id));
    } else {
      dispatch(setBannerEditing(null));
    }
  }, [id]);

  return (
    <div className="w-5/6 m-auto">
      <div className="mx-2">
        <Link to="/home/banner/" className="underline">
          Quản lý banner
        </Link>
        {` > `}
        {id ? bannerEditing?.title : "Untitle banner"}
      </div>

      <div className="flex justify-between mb-5 mx-2">
        <div className="text-2xl font-semibold">
          {id ? bannerEditing?.title : "Untitle banner"}
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleOnClickCanceling}
          >
            Quay lại
          </Button>
          <Button
            loading={isLoading}
            type="primary"
            onClick={handleOnClickSaveData}
          >
            Lưu
          </Button>
        </div>
      </div>

      <div className="bg-white py-4 px-6">
        <div className="text-lg font-medium border-b pb-3 mb-4">
          Chỉnh sửa banner
        </div>
        <FormBannerEditor bannerItem={bannerEditing} form={form} id={id} />
      </div>
    </div>
  );
}
