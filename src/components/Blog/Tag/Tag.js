import "../../../style/scrollbar.css";

import { Button, Input, List, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTag, getTag } from "redux/reducer/tagSlice";
import { generateKey } from "utils/helper";
import useDebounce from "utils/useDebounce";

import ModifyTagModal from "../../Modals/TagModal";
import TagItem from "./TagItem";

export default function TagModal() {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tag);
  const { isLoading } = useSelector((state) => state.loader);
  const [query, setQuery] = useState("");
  const handleSearch = useDebounce((searchValue) => dispatch(getTag({ query: searchValue })))


  const [modalState, setmodalState] = useState({
    visible: false,
    tag: {},
    modify: false,
  });

  const handleOk = () => {
    setmodalState({ ...modalState, visible: false, tag: {} });
  };

  const handleCancel = () => {
    setmodalState({ ...modalState, visible: false });
  };

  useEffect(() => {
    handleSearch(query)
  }, [query]);

  const menu = (tag) => (
    <Menu>
      <Menu.Item
        key="modify"
        onClick={() => {
          setmodalState({
            visible: true,
            tag: tag,
            modify: true,
          });
        }}
      >
        Sửa thẻ
      </Menu.Item>
      <Menu.Item
        key="remove"
        danger
        onClick={() => dispatch(deleteTag(tag.id))}
      >
        {" "}
        Xoá thẻ
      </Menu.Item>
    </Menu>
  );

  return (
    <div className=" p-4 w-full md:max-w-3xl m-auto ">
      <h3 className="text-2xl font-semibold mb-5 text-center">Danh mục thẻ  </h3>
      <div className="flex justify-between items-center w-full mb-4 bg-white">
        <Input size="large" name="query"
          type="text"
          placeholder="Tìm kiếm thẻ"
          allowClear
          onChange={(e) => setQuery(e.target.value)} />
        <Button
          size="large" type="primary" loading={isLoading}
          onClick={() => {
            setmodalState({
              ...modalState,
              tag: {},
              modify: false,
              visible: true,
            });
          }}>

          Tạo mới

        </Button>
      </div>
      <div className="bg-white">

        <List dataSource={tags}
          renderItem={(tag) => <TagItem item={tag} menu={menu} />}
        ></List>
      </div>

      <ModifyTagModal
        key={generateKey("tag-modal")}
        tag={modalState.tag}
        query={query}
        title={modalState.title}
        visible={modalState.visible}
        modify={modalState.modify}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
}
