import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

export default function confirm(content, cb, title, okText, cancelText) {
  Modal.confirm({
    title: title ? title : null,
    icon: <ExclamationCircleOutlined />,
    content: content
      ? content
      : "Hành động này không thể hoàn tác, xác nhận tiếp tục?",
    okText: okText ? okText : "Tiếp tục",
    cancelText: cancelText ? cancelText : "Quay lại",
    onOk: () => {
      cb();
    },
  });
}
