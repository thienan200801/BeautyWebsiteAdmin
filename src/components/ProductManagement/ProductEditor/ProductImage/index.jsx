import {
  MinusCircleTwoTone,
} from "@ant-design/icons";
import MediaModal from "components/Modals/Media/MediaModal";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setListImages } from "redux/reducer/productSlice";
import { HOST_NAME } from "utils/constant";

function ProductImages({ images }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [listImages, setlistImages] = useState(images || []);
  const dispatch = useDispatch();

  const modalCallback = (img) => {
    const newListImages = [...listImages];

    const isExist = newListImages.find((image) => image.id === img.id);

    if (!isExist) {
      newListImages.push(img);
      //cai set nay danh cho state o local. vi images tra ve array object media
      setlistImages(newListImages);
      //cai set nay danh cho redux. vi post data la array id cua media.
      const newListImageIDs = newListImages.map((image) => image.id);
      dispatch(setListImages(newListImageIDs));
    }
  };

  const handleRemoveImage = (e) => {
    const target = e.currentTarget.id;
    const newListImages = listImages.filter((image) => image.id != target);
    //cai set nay danh cho state o local. vi images tra ve array object media
    setlistImages(newListImages);
    //cai set nay danh cho redux. vi post data la array id cua media.
    const newListImageIDs = newListImages.map((image) => image.id);
    dispatch(setListImages(newListImageIDs));
  };

  useEffect(() => {
    // Truong hop ko sua hinh anh thi bien images redux van co gia tri
    if (images) {
      const newListImageIDs = images.map((image) => image.id);
      dispatch(setListImages(newListImageIDs));
    }
  }, []);

  const defaultImage = (
    <div
      onClick={() => setModalVisible(true)}
      className="border py-10 px-3 text-sm cursor-pointer bg-gray-100 flex items-center justify-center"
    >
      <div>Thêm ảnh</div>
    </div>
  );

  return (
    <>
      <div className="bg-white py-4 px-6 mb-3">
        <div className="font-medium border-b pb-2 flex justify-between items-center">
          <div>Hình ảnh</div>
          <div
            onClick={() => setModalVisible(true)}
            className="text-sm text-blue-500 underline hover:text-gray-800 cursor-pointer"
          >
            + Thêm ảnh
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {listImages.map((image, index) => {
            //Hinh dau tien no to hon binh thuong
            if (index === 0) {
              return (
                <div
                  key={image.id}
                  className="col-span-2 row-span-2 overflow-hidden relative flex items-center justify-center"
                >
                  <img
                    src={`${HOST_NAME}${image.url}`}
                    className=" object-cover min-w-full min-h-full"
                  />
                  {image && (
                    <div
                      onClick={handleRemoveImage}
                      id={image.id}
                      className="absolute top-0.5 right-1 cursor-pointer transform transition-transform hover:scale-110"
                    >
                      <MinusCircleTwoTone
                        style={{ fontSize: "20px" }}
                        twoToneColor="#EF4444"
                      />
                    </div>
                  )}
                </div>
              );
            }
            //Cac hinh sau
            return (
              <div
                key={image.id}
                className="overflow-hidden relative flex items-center justify-center "
              >
                <div className="">
                  <img
                    src={`${HOST_NAME}${image.url}`}
                    className="object-cover min-w-full min-h-full"
                  />
                </div>
                <div
                  onClick={handleRemoveImage}
                  id={image.id}
                  className="absolute top-0 right-1 cursor-pointer transform transition-transform hover:scale-110 "
                >
                  <MinusCircleTwoTone twoToneColor="#EF4444" />
                </div>
              </div>
            );
          })}
          {defaultImage}
        </div>

        <MediaModal
          visible={modalVisible}
          setVisible={setModalVisible}
          selectImageCb={modalCallback}
        />
      </div>
    </>
  );
}

export default ProductImages;
