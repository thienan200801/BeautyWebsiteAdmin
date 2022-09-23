import { Button } from "antd";
import MediaModal from "components/Modals/Media/MediaModal";
import React, { useState } from "react";
import { HOST_NAME } from "utils/constant";

export default function CoverImage({ img, ...props }) {
  const [modalVisible, setModalVisible] = useState(false);
  const url = img ? img.url : null;
  // console.log("URL", url);
  const modalCallback = (img) => {
    console.log("modalCallback", img);
    props.setCoverImage(img);
  };
  if (!url)
    return (
      <>
        <button
          onClick={() => setModalVisible(true)}
          className="bg-gray-400 h-20 w-full text-center text-gray-800"
        >
          Chọn ảnh bìa cho bài viết
        </button>
        <MediaModal
          visible={modalVisible}
          setVisible={setModalVisible}
          selectImageCb={modalCallback}
        />
      </>
    );
  return (
    <>
      {url && (
        <img
          src={`${HOST_NAME}${url}`}
          style={{ maxHeight: 200 }}
          className="w-auto h-full object-cover m-auto"
        />
      )}
      <div className="flex flex-col text-left mt-8">
        <Button className="w-min" onClick={() => setModalVisible(true)}>
          {" "}
          Thay đổi{" "}
        </Button>
        <Button
          type="text"
          className="w-min"
          style={{ paddingLeft: 0 }}
          danger
          onClick={() => props.setCoverImage(null)}
        >
          Huỷ bỏ ảnh đã chọn
        </Button>
      </div>
      <MediaModal
        visible={modalVisible}
        setVisible={setModalVisible}
        selectImageCb={modalCallback}
      />
    </>
  );
}
