import "../../style/modal.css";

import { Button, Input, Modal } from "antd";
import { Form } from 'antd'
import { modalStatus } from "components/Blog/Category/Categories";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createProductCategory,
  editProductCategory,
} from "../../redux/reducer/productCategorySlice";
export default function ProductCategoryModal({ visible, product, status, query, ...props }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  const [modalText, setModalText] = useState()
  console.log("ca", status)

  const handleSubmit = async () => {
    const value = await form.validateFields()
    if (status == modalStatus.edit) dispatch(editProductCategory({ id: product.id, data: value }));
    else if (status == modalStatus.child)
      dispatch(
        createProductCategory({
          ...value,
          parent_id: product.id,
        })
      );
    else
      dispatch(
        createProductCategory(value)
      );
    props.closeModal();
  };

  useEffect(() => {
    if (status == modalStatus.createnew)
      setModalText({ title: "Tạo loại sản phẩm mới", okText: "Tạo" })
    else if (status == modalStatus.edit)
      setModalText({ title: "Sửa loại sản phẩm", okText: "Sửa" })
    else setModalText({ title: "Thêm loại sản phẩm thứ cấp", okText: "Thêm" })

  }, [status])
  return (
    <Modal
      bodyStyle={{ overflowY: "auto" }}
      centered
      visible={visible}
      title={modalText?.title}
      onCancel={props.closeModal}
      footer={[
        <Button key="back" className="ant-btn1" onClick={props.closeModal}>
          Quay lại
        </Button>,
        <Button
          className="btn"
          key="submit"
          type="primary"
          loading={false}
          onClick={handleSubmit}
        >
          {modalText?.okText}
        </Button>,
      ]}
    >
      <Form className="flex flex-col gap-3" form={form}
        initialValues={{ name: (status == modalStatus.edit) ? product?.name || query : query, description: (status == modalStatus.edit) ? product?.description : undefined }}  >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Tên không được bỏ trống',
            },
          ]}
        >
          <Input
            size="large"
            autoFocus={true}
            type="text"
            placeholder="Tên"
          />
        </Form.Item>
        <Form.Item
          name="description"
        >
          <Input.TextArea
            className="resize-none"
            placeholder="Mô tả (tuỳ chọn)"
            rows="5"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
