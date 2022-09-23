import { MinusCircleTwoTone } from "@ant-design/icons";
import MediaModal from "components/Modals/Media/MediaModal";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setThumbnail } from "redux/reducer/productSlice";
import { HOST_NAME } from "utils/constant";

function Thumbnail({ thumbnail }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(
    `${thumbnail ? HOST_NAME.concat(thumbnail) : ""}`
  );
  const dispatch = useDispatch();

  const handleRemoveImage = () => {
    setImage(null);
    dispatch(setThumbnail(""));
  };

  useEffect(() => {
    // Truong hop ko sua hinh anh thi bien thumbnail redux van co gia tri
    if (thumbnail) {
      dispatch(setThumbnail(thumbnail.replace("/upload/", "")));
    }
  }, []);

  const modalCallback = (img) => {
    //cai set nay danh cho image o local. lay cai url
    setImage(`${HOST_NAME}${img.url}`);
    //cai set nay danh cho image o redux. lay cai name de post len server
    dispatch(setThumbnail(img.filename));
  };

  const defaultImage = (
    <div
      onClick={() => setModalVisible(true)}
      className="w-72 h-36 border cursor-pointer bg-gray-100 flex items-center justify-center"
    >
      <div>Thêm ảnh</div>
    </div>
  );

  return (
    <>
      <div className="bg-white pt-4 px-6 mb-3">
        <div className="font-medium border-b pb-2 flex justify-between items-center">
          <div>Thumbnail</div>
          <div
            onClick={() => setModalVisible(true)}
            className="text-sm text-blue-500 underline hover:text-gray-800 cursor-pointer"
          >
            + Chọn ảnh
          </div>
        </div>

        <div className="flex justify-center overflow-hidden w-full">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="thumnail"
                className="relative object-cover object-center w-72 h-36"
              />
              <div
                onClick={handleRemoveImage}
                className=" absolute right-1 top-0 cursor-pointer transform transition-transform hover:scale-110"
              >
                <MinusCircleTwoTone twoToneColor="#EF4444" />
              </div>
            </div>
          ) : (
            defaultImage
          )}
        </div>
      </div>
      <MediaModal
        visible={modalVisible}
        setVisible={setModalVisible}
        selectImageCb={modalCallback}
      />
    </>
  );
}

export default Thumbnail;
