import { Select } from "antd";
import React, { useEffect, useState } from "react";

import { get, post } from "../../../../api/index";


export default function Tag() {
  //GET
  //Kiểm tra tag nhập vào có trong mảng tag hay ko. Nếu ko có trong mảng tag thì Post tag lên khi "nhập+enter"
  const [children, setChildren] = useState([]);
  async function getTag() {
    let newChildren = [];
    get("/tag")
      .then((res) => {
        let n = res.data.length;
        for (let i = 0; i < n; i++) {
          let ten = res.data[i].name;
          newChildren.push({ value: res.data[i].id, label: ten });
        }
        setChildren(newChildren);
      })
      .catch((err) => console.log("loi roi", err));
  }
  useEffect(() => {
    getTag();
  }, []);
  //POST
  const [selected, setSelect] = useState([]);

  const handleChange = async (value) => {
    setSelect([...value]);
  };
  const [searchValue, setSearch] = useState("");
  const createTag = async (name) => {
    await post("/tag/create", { name })
      .then(async (res) => {
        const newTagData = res.data;
        setChildren([
          ...children,
          { value: newTagData.id, label: newTagData.name },
        ]);
        setSelect([...selected, newTagData.id]);
        setSearch("");
      })
      .catch((err) => console.log("loi roi", err));
  };
  console.log(selected);
  return (
    <div className="max-w-md max-h-96 m-auto ">
      <>
        <Select
          mode="multiple"
          searchValue={searchValue}
          options={children}
          value={selected}
          onSearch={(value) => setSearch(value)}
          notFoundContent={
            <div
              className="bg-white hover:bg-gray-200 cursor-pointer px-2 py-1 hover:text-black"
              onClick={() => {
                createTag(searchValue);
              }}
            >{`Thêm "${searchValue}"`}</div>
          }
          optionFilterProp="label"
          style={{ width: "100%" }}
          placeholder="Tags Mode"
          onChange={handleChange}
          onInputKeyDown={(a) => {
            if (a.keyCode === 13) {
              createTag(searchValue);
            }
          }}
        ></Select>
      </>
    </div>
  );
}
