import { Button, Form, Input } from "antd";
import React from "react";

const { TextArea } = Input;

export const CommentItemEditor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  ...props
}) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Trả lời
      </Button>
      <Button loading={submitting} onClick={props.onClose}>
        Đóng
      </Button>
    </Form.Item>
  </>
);
