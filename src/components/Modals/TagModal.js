import "../../style/modal.css";

import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

import { createTag, editTag } from "../../redux/reducer/tagSlice";


export default function TagModal({ tag, visible, query, modify, ...props }) {
  const [form] = Form.useForm()
  const { description, id } = tag;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = await form.validateFields()
    if (modify) dispatch(editTag({ id: id, data: value }));
    else
      dispatch(createTag(value));
    props.handleOk();
  };

  return (
    <Modal
      bodyStyle={{ overflowY: "auto" }}
      centered
      visible={visible}
      title={modify ? "Sửa thẻ" : "Thêm thẻ mới"}
      onOk={props.handleOk}
      onCancel={() => {
        props.handleCancel();
      }}
      footer={[
        <Button key="back" className="ant-btn1" onClick={props.handleCancel}>
          Quay lại
        </Button>,
        <Button
          className="btn"
          key="submit"
          type="primary"
          loading={false}
          onClick={handleSubmit}
        >
          {modify ? "Sửa" : "Tạo mới"}
        </Button>,
      ]}
    >

      <Form className="flex flex-col gap-3" form={form}
        initialValues={{ name: modify ? tag?.name : query, description: modify ? description : undefined }}>
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
