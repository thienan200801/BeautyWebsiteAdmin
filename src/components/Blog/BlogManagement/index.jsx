import {
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Spin, Tabs } from "antd";
import DescriptionModal from "components/Modals/DescriptionModal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getBlog, selectBlogs } from "redux/reducer/blogSlice";
import { BLOG_STATUS_TRANS } from "utils/constant";
import useDebounce from "utils/useDebounce";

import BlogList from "./BlogList";
const { TabPane } = Tabs;

export default function BlogManagement() {
  const history = useHistory();
  const blogs = useSelector(selectBlogs);
  const { isLoading } = useSelector((state) => state.loader);

  const [query, setQuery] = useState(null);
  const [blogId, setBlogId] = useState();
  const [visible, setVisible] = useState(false); // description modal visibility
  const handleSearch = useDebounce((searchValue) => dispatch(getBlog({ query: searchValue })))

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId) setVisible(true);
  }, [blogId]);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleCloseModal = () => {
    setVisible(false);
    setBlogId(null);
  };

  const AddNewBlogButton = (
    <Button
      type="primary"
      onClick={() => {
        history.push("/editor/create", { blogId: null });
      }}
    >
      Bài viết mới
    </Button>
  );

  // cagory type like publish/draft
  const tabheader = (list) => {
    if (list) {
      const key = Object.keys(list)[0];
      const length = Object.values(list)[0].length;

      return (
        <span className="px-2">
          {BLOG_STATUS_TRANS[key]}
          <span
            style={{ paddingLeft: "6px", paddingRight: "6px" }}
            className="ml-2 text-gray-600 border border-gray-500 rounded-full text-xs"
          >
            {length}
          </span>
        </span>
      );
    }
  };

  const spin = (
    <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
  );

  return (
    <div className="w-full sm:w-1/2 md:w-3/4 m-auto pb-10">
      <div className="text-2xl font-semibold mb-5">Danh sách bài viết</div>
      <div className="relative flex items-center flex-wrap mb-2 ">
        {" "}
        <div className="absolute top-0 left-0 z-10  flex items-center h-full w-10 justify-center overflow-hidden rounded-tl rounded-bl  bg-blue-600">
          {isLoading && <Spin indicator={spin} />}
          {!isLoading && (
            <SearchOutlined style={{ fontSize: "18px", color: "white" }} />
          )}
        </div>
        <input
          value={query}
          type="text"
          placeholder="Tìm kiếm bài viết"
          onChange={(e) => setQuery(e.target.value)}
          className=" relative pr-2 py-2 w-1/3 focus:w-full transition-width outline-none  rounded-tr round-br border  border-gray-300 focus:border-blue-600 duration-300 pl-12"
        />{" "}
      </div>
      <div className="bg-white px-4">
        <Tabs
          tabBarExtraContent={AddNewBlogButton}
          className="pb-2 bg-white"
          style={{ padding: "0 12px" }}
        >
          {blogs &&
            blogs.map((item, index) => (
              <TabPane tab={tabheader(item)} key={index}>
                <BlogList
                  blog={Object.values(item)[0]}
                  key={index}
                  setBlogId={setBlogId}
                />
              </TabPane>
            ))}
        </Tabs>
      </div>
      <DescriptionModal
        id={blogId}
        visible={visible}
        closeModal={handleCloseModal}
      />
    </div>
  );
}
