import { Input, message, Modal } from "antd";
import { patch } from "api";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBlogById,
  updateBlogDescription,
} from "redux/reducer/blogSlice";
import { startLoading, stopLoading } from "redux/reducer/loaderSlice";

const { TextArea } = Input;

// when current blog is set by click "thêm mô tả" button this modal will open
export default function DescriptionModal({ id, visible, ...props }) {
  const blog = useSelector((state) => selectBlogById(state, id));
  const dispatch = useDispatch();

  //add blog description
  const handleAddDes = async () => {
    dispatch(startLoading());
    try {
      const response = await patch(`blog/${id}`, {
        description: blog.description,
      });
      if (response.status == 200) {
        message.success("Sửa mô tả thành công");
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
    dispatch(stopLoading());
    props.closeModal();
  };

  return (
    <Modal
      visible={visible}
      title="Thêm mô tả cho bài viết"
      okText="Thêm"
      cancelText="Quay lại"
      onOk={handleAddDes}
      onCancel={() => props.closeModal()}
    >
      <TextArea
        placeholder="Mô tả"
        value={blog ? blog.description : ""}
        rows="5"
        onChange={(e) =>
          dispatch(
            updateBlogDescription({
              id: id,
              description: e.target.value,
            })
          )
        }
      ></TextArea>
    </Modal>
  );
}
