import { Select } from "antd";

const { Option } = Select;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlog,
  selectPublishedBlogNamesAndIds,
} from "redux/reducer/blogSlice";
import { getComments, getCommentsOfBlog } from "redux/reducer/commentSlice";

export default function SelectBlog() {
  const namesandids = useSelector(selectPublishedBlogNamesAndIds);
  const dispatch = useDispatch();
  const [id, setId] = useState("all"); // blogid
  const { isLoading } = useSelector((state) => state.loader);

  useEffect(() => {
    if (namesandids) dispatch(getBlog());
  }, []);

  useEffect(() => {
    if (id != "all") dispatch(getCommentsOfBlog(id));
    else dispatch(getComments());
  }, [id]);

  return (
    <>
      <span className="font-semibold mr-4 text-base">Bài viết</span>
      <Select
        loading={isLoading}
        showSearch
        optionFilterProp="label"
        optionLabelProp="label"
        style={{ width: 200 }}
        placeholder="Chọn một bài viết"
        value={id}
        onChange={setId}
      >
        <Option value={"all"} label={"Tất cả"}>
          Tất cả
        </Option>
        {namesandids &&
          namesandids.length > 0 &&
          namesandids.map((item) => (
            <Option value={item.id} key={item.id} label={item.name}>
              {item.name}
            </Option>
          ))}
      </Select>
    </>
  );
}
