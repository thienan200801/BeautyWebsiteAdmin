import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";

import ImageBox from "./ImageBox";

const FormBannerEditor = ({ bannerItem, form, id }) => {
  const [bannerTypeButton, setBannerTypeButton] = useState("cta");
  // const [bannerImage, setBannerImage] = useState(bannerItem?.media);

  const onBannerTypeChange = (e) => {
    setBannerTypeButton(e.target.value);
  };

  useEffect(() => {
    form.resetFields();
    // console.log("Banner Item form", bannerItem);
    //Neu co chinh sua thi kiem tra lai button cta xem soa
    if (id) {
      setBannerTypeButton(bannerItem?.type);
    }
  }, [bannerItem]);

  return (
    <Form form={form} layout="vertical">
      <div className="grid grid-cols-2 gap-14">
        <div>
          <Form.Item
            label="Tiêu đề chính"
            name="title"
            initialValue={id ? bannerItem?.title : ""}
            rules={[
              { required: true, message: "Tiêu đề banner không được bỏ trống" },
            ]}
            tooltip={{
              title: "Tiêu đề xuất hiện lớn nhất trên banner.",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder="Tiêu đề banner" />
          </Form.Item>

          <Form.Item
            label="Tiêu đề phụ"
            name="subTitle"
            initialValue={id ? bannerItem?.sub_title : ""}
            rules={[
              { required: true, message: "Tiêu đề phụ không được bỏ trống" },
            ]}
          >
            <Input placeholder="Tiêu đề phụ" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            initialValue={id ? bannerItem?.content : ""}
            rules={[{ required: true, message: "Mô tả không được bỏ trống" }]}
          >
            <Input.TextArea
              autoSize={{ minRows: 7, maxRows: 7 }}
              placeholder="Mô tả banner của bạn"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            label="Đường dẫn trang"
            name="url"
            initialValue={id ? bannerItem?.button_url : "Tìm hiểu ngay"}
            tooltip={{
              title: "Đường dẫn đến trang khi khách hàng nhấp vào nút CTA",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              disabled={bannerTypeButton === "cta" ? false : true}
              placeholder="https://"
            />
          </Form.Item>
          <div className="flex justify-between gap-10">
            <Form.Item
              className="flex-grow"
              label="Nội dung CTA"
              name="ctaContent"
              initialValue={id ? bannerItem?.button_text : "Tìm hiểu ngay"}
              tooltip={{
                title: "Nút call-to-action.",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                disabled={bannerTypeButton === "cta" ? false : true}
                placeholder="Vd: Tìm hiểu ngay, bấm để xem bài viết,.."
              />
            </Form.Item>

            <Form.Item
              label="CTA"
              name="bannerType"
              initialValue={bannerTypeButton}
            >
              <Radio.Group
                name="radioCTA"
                value="cta"
                onChange={onBannerTypeChange}
              >
                <Radio value="cta">Có</Radio>
                <Radio value="image">Không</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <Form.Item
            label="Ảnh banner"
            name="bannerImage"
            rules={[{ required: true, message: "Ảnh không được bỏ trống" }]}
            tooltip={{
              title: "Kích thước tiêu chuẩn: xxx xx",
              icon: <InfoCircleOutlined />,
            }}
            initialValue={id ? bannerItem?.media?.url : ""}
          >
            <ImageBox />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default FormBannerEditor;
