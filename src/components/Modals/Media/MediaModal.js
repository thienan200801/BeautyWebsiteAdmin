import "../../../style/mediawraper.css";

import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import showConfirm from "components/Modals/ConfirmModal";
import MediaItem from "components/Modals/Media/MediaModaltem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImage,
  getImage,
  uploadImage,
} from "redux/reducer/imageSlice";

import EditMedia from "./EditMedia";

export default function MediaModal({ visible, ...props }) {
  const { imageSet } = useSelector((state) => state.image);
  const { isLoading } = useSelector((s) => s.loader);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  // const [alt, setAlt] = useState("");

  const handleSelect = (item) => {
    setSelectedItem(item);
    // setAlt(item.alt);
  };
  const handleChange = (fileList) => {
    console.log("handle change", fileList.length);
  };

  const handleUpload = (file) => {
    dispatch(uploadImage(file.file));
    if (isLoading) message.success("Tải lên thành công");
    true;
  };

  const validate = (file) => {
    const check = file["type"].includes("image");
    if (check === false) message.error(`${file.name} không phải là ảnh`);
    return check ? true : Upload.LIST_IGNORE;
  };

  const handleDelete = () => {
    dispatch(deleteImage(selectedItem));
  };

  const handleInsertImage = () => {
    if (selectedItem) {
      props.selectImageCb(selectedItem);

      props.setVisible(false);
    } else message.error("Hãy chọn một hình!");
  };

  const uploadprops = {
    beforeUpload: validate,
    customRequest: handleUpload,
    onChange: handleChange,
    fileList: null,
    accept: "image/*",
  };

  useEffect(() => {
    if (!imageSet) dispatch(getImage());
  }, [imageSet, dispatch]);

  return (
    <Modal
      width={1152}
      visible={visible}
      onCancel={() => props.setVisible(false)}
      bodyStyle={{ height: "90vh" }}
      footer={
        <Button
          disabled={selectedItem == null}
          type="primary"
          // className="px-3 py-2 hover:bg-pink-600 text-white hover:shadow-md transition duration-300 rounded"
          onClick={() => {
            handleInsertImage();
          }}
        >
          Chọn
        </Button>
      }
    >
      <div className="flex flex-col max-w-6xl grid-flow-col m-auto w-full bg-white">
        <div className="border-gray-300 border-b flex flex-row w-full py-4 gap-1 pl-1">
          <Upload {...uploadprops}>
            <Button icon={<UploadOutlined />}>
              Tải lên
            </Button>
          </Upload>

          {selectedItem && (
            <Button
              onClick={() => setEditVisible(true)}
            >
              <EditOutlined />
              Xem thông tin
            </Button>
          )}
          {selectedItem && (
            <Button
              danger
              onClick={() => {
                showConfirm("Xác nhận xoá?", handleDelete);
              }}
            >
              <DeleteOutlined />
              Xoá
            </Button>
          )}
        </div>
        <div>
          <div className="flex justify-center items-center">
            <div className=" list-scroll w-full grid grid-cols-2 md:grid-cols-5 gap-4 overflow-y-scroll overflow-x-auto auto-rows-min h-full sm:px-3 p-2 ">
              {imageSet &&
                imageSet.length &&
                imageSet.map((img) => (
                  <MediaItem
                    key={img.filename}
                    file={img}
                    handleSelect={handleSelect}
                    selectedItem={selectedItem}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* edit media info modal */}
        {selectedItem && (
          <EditMedia
            key={selectedItem.createdAt}
            img={selectedItem}
            visible={editVisible}
            closeModal={() => setEditVisible(false)}
          />
        )}
      </div>
    </Modal>
  );
}
