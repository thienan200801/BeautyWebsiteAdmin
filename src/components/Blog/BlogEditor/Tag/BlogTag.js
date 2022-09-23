import { Empty, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBlog } from "redux/reducer/blogSlice";
import { createTag, getTag, selectNomalizedTag } from "redux/reducer/tagSlice";

const { Option } = Select;

export default function BlogTag({ selectedTags }) {
  const normalizedTags = useSelector(selectNomalizedTag);
  // const { tags } = useSelector((state) => state.tag);
  const dispatch = useDispatch();
  const [inputVisible, _setInputVisible] = useState(false);
  const inputRef = useRef();

  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    if (inputVisible) inputRef.current.focus();
  }, [inputVisible]);

  useEffect(() => {
    if (!normalizedTags) dispatch(getTag());
  }, []);

  const onSelectTag = (id) => {
    dispatch(updateCurrentBlog({ tag: [...selectedTags, id] }));
  };
  const onDeselectTag = (id) => {
    dispatch(
      updateCurrentBlog({ tag: selectedTags.filter((tagId) => tagId != id) })
    );
  };

  return (
    <>
      {normalizedTags && (
        <>
          <Select
            mode="multiple"
            value={selectedTags}
            notFoundContent={
              <div
                className="bg-white hover:bg-gray-200 cursor-pointer px-2 py-1 hover:text-black"
                onClick={() => {
                  dispatch(createTag({ name: searchValue }));
                }}
              >{`Không tìm thấy ${searchValue}, chọn để thêm`}</div>
            }
            showSearch={true}
            optionFilterProp="label"
            optionLabelProp="label"
            style={{ width: "100%" }}
            placeholder="Nhập tên thẻ"
            onSearch={(value) => setSearchValue(value)}
            onSelect={onSelectTag}
            onDeselect={onDeselectTag}
          >
            {Object.keys(normalizedTags).map((id) => (
              <Option
                key={id}
                label={normalizedTags[id].name}
                value={Number(id)}
              >
                {normalizedTags[id].name}
              </Option>
            ))}
          </Select>
        </>
      )}
      {!normalizedTags && (
        <Empty description="Bạn chưa có thẻ nào, trước tiên, hãy thêm một thẻ"></Empty>
      )}
    </>
  );
}
