import {
  UploadOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";
import EditMedia from "components/Modals/Media/EditMedia";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage, uploadImage } from "redux/reducer/imageSlice";

import MediaLibraryItem from "./MediaLibraryItem";
// this is container page, rendered in sidebar route
export default function MediaLibrary() {
  const dispatch = useDispatch();
  const { imageSet } = useSelector((state) => state.image);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    dispatch(getImage());
  }, []);

  const handleUpload = (file) => {
    dispatch(uploadImage(file.file));
    true;
  };

  const openEdit = (item) => {
    setSelected(item);
    setVisible(true);
  };

  const closeEdit = () => {
    setVisible(false);
  };

  const validate = (file) => {
    const FIVE_MB = 5242800;
    let check = file["type"].includes("image");
    if (check === false)
      message.error(`Tải lên không thành công, ${file.name} không phải là ảnh`);
    if (file["size"] > FIVE_MB) {
      message.error(`Kích thước file được chọn phải < 5MB`);
      check = false;
    }
    return check ? true : Upload.LIST_IGNORE;
  };

  const uploadprops = {
    beforeUpload: validate,
    customRequest: handleUpload,
    multiple: true,
    // onChange: handleChange,
    fileList: null,
    accept: "image/*",
  };

  const top = (
    <div className="border-gray-300 border-b flex flex-row w-full py-4 gap-1 pl-1">
      <Upload {...uploadprops}>
        <button className="bg-blue-600 py-1 px-2 text-white rounded border border-blue-300 transition duration-200 hover:bg-blue-500 hover:shadow-md text-sm flex items-center justify-center ">
          <UploadOutlined className="mr-1" />
          Chọn ảnh
        </button>
      </Upload>
    </div>
  );
  return (
    <div className=" bg-white px-5 pb-5">
      {top}
      <ul className="list-none grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-3">
        {imageSet &&
          imageSet.length &&
          imageSet.map((img) => (
            <MediaLibraryItem

              key={img.filename}
              file={img}
              openEdit={openEdit}
            />
          ))}
      </ul>
      {selected && (
        <EditMedia
          key={selected.id}
          visible={visible}
          closeModal={closeEdit}
          img={selected}
        />
      )}
    </div>
  );
}
