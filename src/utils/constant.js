/* eslint-disable no-undef */
export const HOST_NAME = process.env.REACT_APP_HOSTNAME;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT;

export const BLOG_STATUS = {
  publish: "publish",
  draft: "draft",
};
export const BLOG_STATUS_TRANS = {
  draft: "Đã lưu",
  publish: "Công khai",

};
export const Order_STATUS_TRANS = {
  publish: "Tất cả",
  pending: "Đang chờ",
  confirm: "Xác nhận",
  shipping: "Đang giao hàng",
  success: "Đã giao hàng",
  cancel: "Từ chối",
};
export const Order_STATUS = {
  publish: "publish",
  pending: "pending",
  confirm: "confirm",
  shipping: "shipping",
  success: "success",
  cancel: "cancel",
};
export const COMMENT_STATUS = {
  "Chưa duyệt": false,
  "Đã duyệt": true,
};

// DRAG TYPES

export const ItemTypes = {
  PRODUCT_CATEGORY: 'product_category',
  TAG: 'tag'
}