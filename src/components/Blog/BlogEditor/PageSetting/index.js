import { Affix, Collapse, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBlogCategory,
  setBlogmedia,
  setBlogTag,
} from "redux/reducer/blogSlice";

import Category from "../Category";
import CoverImage from "../CoverImage/CoverImage";
import Product from "../Product";
import BlogTag from "../Tag/BlogTag";
const { Panel } = Collapse;

export default function PageSetting({ menu, visible, ...props }) {
  const { currentBlog, media } = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();
  return (
    <div className="hidden py-2 px-4 text-white text-left">
      <Drawer
        width={400}
        title="Cài đặt trang"
        placement="right"
        bodyStyle={{ padding: "0", paddingTop: "24px" }}
        onClose={() => props.setVisible(false)}
        visible={visible}
      >
        <Affix>
          <Collapse defaultActiveKey={[1]} expandIconPosition="right">
            <Panel header="Danh mục bài viết" key="1">
              <Category
                selectedCategories={currentBlog?.category}
                onChange={(value) => {
                  dispatch(setBlogCategory(value));
                }}
              />
            </Panel>
            <Panel header="Gắn thẻ cho bài viết" key="2">
              <BlogTag
                selectedTags={currentBlog?.tag || []}
                setSelectedTags={(value) => {
                  dispatch(setBlogTag(value));
                }}
              />
            </Panel>
            <Panel header="Gợi ý sản phẩm" key="3">
              <Product selectedProducts={currentBlog?.product || []} />
            </Panel>
            <Panel header="Ảnh bìa bài viết" key="4">
              {currentBlog && (
                <CoverImage
                  img={media}
                  setCoverImage={(img) => {
                    dispatch(setBlogmedia(img));
                  }}
                />
              )}
            </Panel>
          </Collapse>
        </Affix>
      </Drawer>
    </div>
  );
}
