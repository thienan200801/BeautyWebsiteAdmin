import "style/editor.css";

import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import {
  clearBlogData,
  createBlog,
  editBlog,
  getBlogWithId,
  initBlog,
  setBlogId,
  setBlogPath,
} from "redux/reducer/blogSlice";

import PageSetting from "./PageSetting";
import TextEditor from "./TextEditor/index";

export default function BlogEditor() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading } = useSelector((state) => state.loader);
  const { currentBlog, media, blogId, blogPath } = useSelector(
    (state) => state.blog
  );
  const didmount = useRef(false);
  const [collapsed, setCollapsed] = useState(false);
  const ejInstance = useRef(); //editor ref for getting blog data

  const saveBlog = async () => {
    const editorContent = await ejInstance.current.save();
    return editorContent;
  };

  const isTitleEmpty = (value) => {
    if (!value) {
      message.error("Tiêu đề không được trống");
      return true;
    }
    return false;
  };

  const blog_create = (title, content) => {
    dispatch(
      createBlog({
        blog: {
          ...currentBlog,
          content: JSON.stringify(content),
          feature_image: media ? media.filename : undefined,
          title: title,
          status: "draft",
        },
      })
    );
  };

  const blog_edit = (title, content) => {
    dispatch(
      editBlog({
        blog: {
          ...currentBlog,
          content: JSON.stringify(content),
          feature_image: media ? media.filename : null,
          title: title,
        },
        id: location.state.blogId,
      })
    );
  };

  // (save or create) and upload
  const genericSave = async () => {
    const blogtitle = document.getElementById("blog-title").innerText;

    if (!isTitleEmpty(blogtitle)) {
      const content = await saveBlog();

      // kiểm tra xem cố id không=> có-> edit, không->create
      if (location.state?.blogId) blog_edit(blogtitle, content);
      else blog_create(blogtitle, content);
    }
  };

  useEffect(() => {
    if (blogId && blogPath)
      history.replace(`/editor/${blogPath}`, { blogId: blogId });
  }, [blogId, blogPath]);

  useEffect(() => {
    if (location.state?.blogId) {
      dispatch(getBlogWithId({ id: location.state.blogId }));
    } else {
      if (!didmount.current) {
        dispatch(initBlog());
        didmount.current = true;
      }
    }
    return () => {
      dispatch(clearBlogData());
      dispatch(setBlogPath(null));
      dispatch(setBlogId(null));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 h-full flex flex-col">
      <div className="flex items-center bg-white mb-2 py-2 lg:py-3 px-2 lg:px-10 justify-between">
        <div className="gap-2 flex ">
          <Tooltip placement="bottom" title={"Quay lại trang quản lí bài viết"}>
            <Button
              onClick={() => {
                history.push("/home/blogs");
              }}
              type="primary"
              style={{ height: "auto", padding: "12px 13px" }}
            >
              <HomeOutlined style={{ fontSize: 22 }} />
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" title={"Undo"}>
            <button
              className="w-min"
              icon=""
              type="text"
              onClick={() => {
                document.execCommand("undo", false, null);
              }}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"></path>
              </svg>
            </button>
          </Tooltip>
          <Tooltip placement="bottom" title={"Redo"}>
            <button
              type="text"
              onClick={() => document.execCommand("redo", false, null)}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"></path>
              </svg>
            </button>
          </Tooltip>
        </div>
        <div className="flex gap-2">
          <Tooltip placement="bottom" title={"Cài đặt trang"}>
            <Button
              icon={<SettingOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Tooltip>
          <Button
            type="primary"
            loading={isLoading}
            onClick={(e) => {
              e.preventDefault();
              genericSave();
            }}
          >
            {" "}
            Lưu bài viết
          </Button>
        </div>
      </div>
      {currentBlog && (
        <div className="px-2 lg:py-4 w-full md:w-6xl shadow h-full lg:px-10 flex-grow bg-white m-auto ">
          <div
            contentEditable
            id="blog-title"
            data-text="Nhấn để thêm tiêu đề cho đề bài viết"
            className="outline-none px-4 py-2 text-2xl font-medium text-center"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                event.preventDefault();
                return false;
              }
            }}
          >
            {currentBlog.title}
          </div>

          <TextEditor data={currentBlog.content} editorRef={ejInstance} />
        </div>
      )}

      <PageSetting visible={collapsed} setVisible={setCollapsed} />
    </div>
  );
}
