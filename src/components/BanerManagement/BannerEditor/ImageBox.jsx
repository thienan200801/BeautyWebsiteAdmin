
import { Button, } from "antd";
import MediaModal from "components/Modals/Media/MediaModal";
import React, { useState } from "react";
import { HOST_NAME } from "utils/constant";

function ImageBox({ value = {}, onChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [testMedia, setTestMedia] = useState(value);

  const triggerChange = (changedValue) => {
    console.log("on change value", changedValue);
    if (Object.keys(changedValue).length === 0) {
      console.log("null", changedValue);
      onChange?.(null);
    } else {
      onChange?.({
        ...value,
        ...changedValue,
      });
    }
  };

  const onBannerImageChange = (newMedia) => {
    setTestMedia(newMedia);
    if (newMedia) {
      triggerChange({
        ...newMedia,
      });
    } else {
      triggerChange(null);
    }
  };

  // console.log("value truyen vao", testMedia);
  // const url = testMedia ? testMedia.url : null;
  const modalCallback = (img) => {
    // console.log(img);
    onBannerImageChange({ ...img });
    if (img) {
      console.log(HOST_NAME.concat(img.url));
      setTestMedia(HOST_NAME.concat(img.url));
    } else {
      setTestMedia(null);
    }
  };

  return (
    <div onChange={onBannerImageChange}>
      {!testMedia && (
        <button
          onClick={() => setModalVisible(true)}
          className="bg-gray-300 h-32 w-full text-center text-gray-800"
        >
          Chọn ảnh bìa cho bài viết
        </button>
      )}

      {testMedia && (
        <div>
          <img
            src={`${testMedia}`}
            style={{ maxHeight: 200 }}
            className="w-auto h-full object-cover m-auto"
          />
          <div className="flex flex-col mt-2">
            <Button className="w-min" onClick={() => setModalVisible(true)}>
              {" "}
              Thay đổi{" "}
            </Button>
            <Button
              type="text"
              className="w-min"
              style={{ paddingLeft: 0 }}
              danger
              onClick={() => modalCallback(null)}
            >
              Huỷ bỏ ảnh đã chọn
            </Button>
          </div>
        </div>
      )}

      <MediaModal
        visible={modalVisible}
        setVisible={setModalVisible}
        selectImageCb={modalCallback}
      />
    </div>
  );
}

export default ImageBox;
