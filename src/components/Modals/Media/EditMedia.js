import { Button, Image } from 'antd'
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, modifyImage } from "redux/reducer/imageSlice";
import { HOST_NAME } from "utils/constant";
import getDateTime from "utils/ConvertTime";

import showConfirm from "../ConfirmModal";


export default function EditMedia({ img, ...props }) {
  const { visible } = props;
  const { alt, title, filesize, filename, filetype, url, createdAt, uploadBy } =
    img;
  const { isLoading } = useSelector(state => state.loader)
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    alt: alt,
    title: title,
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setstate({ ...state, [name]: value });
  };

  const hanldeDelete = () => {
    dispatch(deleteImage(img));
    props.closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyImage({ filename: filename, info: state }));
  };

  const footer = (
    <div className="flex justify-between items-center h-full px-5">
      <Button
        type="primary"
        danger
        loading={isLoading}
        onClick={() => showConfirm("Xác nhận xoá?", hanldeDelete)}
      >
        Xoá ảnh
      </Button>
      <div>
        <Button
          onClick={props.closeModal}
        >
          Quay lại
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
        >

          Lưu
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      width="100vw"
      footer={footer}
      onCancel={props.closeModal}
      bodyStyle={{ overflowY: "auto", maxHeight: "90vh" }}
    >
      <div className="w-full sm:grid sm:grid-cols-sidebar flex flex-col px-3 pt-2 bg-white">
        <div className="bg-gray-100">
          <img
            data-src={`${HOST_NAME}${url}`}
            className="w-full min-h-80vh sm:min-h-0 sm:max-h-650 object-contain lazyload"
            alt={alt}
          />

        </div>
        <div className="flex justify-between flex-col items-center sm:ml-3 mt-5 sm:mt-0 ">
          <form className="w-full">
            <label htmlFor="title" className="capitalize text-base ">
              title
            </label>
            <textarea
              id="title"
              name="title"
              onChange={handleChange}
              style={{ resize: "none" }}
              value={state.title}
              className="w-full block p-2 mt-1 mb-3 border ring-2 ring-transparent rounded transition duration-150 border-gray-300 focus:border-transparent focus:ring-blue-600 outline-none"
              rows="2"
            />
            <label htmlFor="alt" className="capitalize text-base">
              alt
            </label>
            <textarea
              id="alt"
              name="alt"
              onChange={handleChange}
              style={{ resize: "none" }}
              value={state.alt}
              className="w-full block p-2 mt-1 mb-3 border ring-2 ring-transparent rounded transition duration-150 border-gray-300 focus:border-transparent focus:ring-blue-600 outline-none"
              rows="1"
            />
            <label htmlFor="url" className="capitalize text-base">
              url
            </label>

            <input
              disabled="disabled"
              id="url"
              name="url"
              style={{ resize: "none" }}
              value={url}
              className="w-full block p-2 mt-1 mb-3 border rounded  border-gray-300  outline-none"
              rows="1"
            />
          </form>
          <div className="text-base text-left w-full ">
            <h3 className="uppercase mb-0 text-gray-500 text-xs font-semibold tracking-wide mt-12 sm:mt-0">
              filename
            </h3>
            <p>{filename}</p>
            <div className="grid grid-cols-2 auto-rows-min grid-rows-2 gap-3 sm:mt-12">
              <div>
                <h3 className="uppercase mb-0 text-gray-500 text-xs font-semibold tracking-wide">
                  filetype
                </h3>
                <p className="mb-0">{filetype}</p>
              </div>
              <div>
                <h3 className="uppercase mb-0 text-gray-500 text-xs font-semibold tracking-wide">
                  filesize
                </h3>
                <p className="mb-0">{filesize}</p>
              </div>
              <div>
                <h3 className="uppercase mb-0 text-gray-500 text-xs font-semibold tracking-wide">
                  upload by
                </h3>
                <p className="mb-0">{uploadBy}</p>
              </div>
              <div>
                <h3 className="uppercase mb-0 text-gray-500 text-xs font-semibold tracking-wide">
                  upload date
                </h3>
                <p className="mb-0">{getDateTime(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
