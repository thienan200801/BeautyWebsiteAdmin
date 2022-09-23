import 'style/blogmanageheader.css'

import { DeleteFilled, MailOutlined, PushpinOutlined } from "@ant-design/icons";
import { Avatar, Button, Collapse, Divider, List, message, Tag } from "antd";
import { patch, post } from "api";
import confirm from "components/Modals/ConfirmModal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlogApi, updateBlog } from "redux/reducer/blogSlice";
import { startLoading, stopLoading } from "redux/reducer/loaderSlice";
import { BLOG_STATUS, CLIENT_URL } from "utils/constant";
import getDateTime from "utils/ConvertTime";

const { Panel } = Collapse;

export default function BlogList({ blog, ...props }) {
  const { isLoading } = useSelector((state) => state.loader);
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteBlogApi(id));
  };

  return (
    <List
      loading={isLoading}
      itemLayout="horizontal"
      dataSource={blog}
      renderItem={(item) => (
        <List.Item>
          <Collapse className="flex-grow" ghost expandIconPosition="right">
            <Panel
              className="nopadding"
              header={
                <BlogItemContent content={item} />
              }
            >
              <ListItemActions item={item} setBlogId={props.setBlogId} handleDelete={handleDelete} />
            </Panel>
          </Collapse>
        </List.Item>



      )}
    />
  );
}

// nội dung thẻ
const BlogItemContent = ({ content }) => {
  return <List.Item.Meta
    // style={{ padding: 0 }}
    avatar={<Avatar>{content.title.charAt(0)}</Avatar>}
    title={
      <Link
        key="list-loadmore-edit"
        to={{
          pathname: `/editor/${content.path}`,
          state: { blogId: content.id },
        }}
      >
        {content.title}
        {content.stick_to_top && (
          <Tag
            style={{ marginLeft: 12 }}
            color="success"
          >
            <PushpinOutlined />
            <span cclassName="hidden lg:inline">
              Đã ghim
            </span>
          </Tag>
        )}
        {content.send_mail &&
          <Tag
            style={{ marginLeft: 12, textAlign: "center" }}
            color="purple"
          >
            <MailOutlined />
            <span className="hidden lg:inline">Đã gửi email
            </span>
          </Tag>
        }
      </Link>
    }
    description={`Thời gian tạo: ${getDateTime(content.createdAt)}`}
  />
}

// các nút chức năng 
const ListItemActions = ({ item, ...props }) => {
  return <div className="flex justify-start items-center">
    <Button type="link"
      style={{ padding: "4px 0" }}
    >
      <a href={`${CLIENT_URL}preview/${item.path}`}
        key="list-loadmore-preview"
        target="_blank" rel="noopener noreferrer" >
        xem trước
      </a>
    </Button>
    <Divider type="vertical" />
    <Button type="link"
      style={{ padding: "4px 0" }}
    >
      <Link
        key="list-loadmore-edit"
        to={{
          pathname: `/editor/${item.path}`,
          state: { blogId: item.id },
        }}
      >
        sửa
      </Link>
    </Button>
    <Divider type="vertical" />
    <Button
      style={{ padding: "4px 0" }}
      type="link"
      key="list-loadmore-more"
      onClick={() => {
        props.setBlogId(item.id);
      }}
    >
      thêm mô tả
    </Button>
    <Divider type="vertical" />

    <ActionButton
      key="list-action-button"
      status={item.status}
      id={item.id}
      sticked={item.stick_to_top}
      mailed={item.send_mail}
    />
    <Divider type="vertical" />

    <Button
      style={{ padding: "4px 0" }}
      icon={<DeleteFilled />}
      type="link"
      danger
      key="list-loadmore-more"
      onClick={() =>
        confirm(null, () => props.handleDelete(item.id), "Xoá bài viết")
      }
    >
      xoá
    </Button>
  </div>
}


// nút công khai/ không công khai tuỳ vào trạng thái bài viết và logic cho chúng
const ActionButton = ({ status, id, sticked, mailed }) => {
  const dispatch = useDispatch()

  const changeBlogStatus = async (id, status) => {
    dispatch(startLoading());

    let url = `blog/${id}`;
    let response;
    try {
      response = await patch(url, { status: status });
      if (response.status == 200) {
        dispatch(updateBlog({ id: id, changes: { status: status } }));
        message.success("Thành công");
        dispatch(stopLoading());
      }
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(stopLoading());
    }
  };

  const toggleBlogPinStatus = async (id, pinned) => {
    dispatch(startLoading());

    let url = `blog/${id}`;
    let response;
    try {
      response = await patch(url, { stick_to_top: !pinned });
      if (response.status == 200) {
        dispatch(updateBlog({ id: id, changes: { stick_to_top: !pinned } }));
        message.success("Thành công");
        dispatch(stopLoading());
      }
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(stopLoading());
    }
  };

  const sendEmail = async (id) => {
    dispatch(startLoading());
    let url = `blog/${id}/send-mail`;
    let response;
    try {
      response = await post(url);
      if (response.status == 200) {
        dispatch(updateBlog({ id: id, changes: { send_mail: true } }));
        message.success("Gửi email thành công");
        dispatch(stopLoading());
      }
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(stopLoading());
    }
  }


  if (status == "publish")
    return (
      <>
        <Button
          style={{ padding: "4px 0" }}
          type="link"
          key="list-loadmore-send-mail"
          onClick={() => sendEmail(id)}
        >
          {mailed ? " gửi lại email " : "gửi email"}
        </Button>
        <Divider type="vertical" />

        <Button
          style={{ padding: "4px 0" }}
          type="link"
          key="list-loadmore-pin"
          onClick={() => toggleBlogPinStatus(id, sticked)}
        >
          {sticked ? "bỏ ghim" : "ghim"}
        </Button>
        <Divider type="vertical" />

        <Button
          style={{ padding: "4px 0" }}
          type="link"
          key="list-loadmore-remove"
          onClick={() =>
            confirm(
              "Bạn có muốn gỡ bài viết? Bài viết sẽ chuyển sang mục Đã lưu",
              () => changeBlogStatus(id, BLOG_STATUS.draft),
              "Gỡ bài viết",
              "Gỡ ",
              "Quay lại"
            )
          }
        >
          gỡ bài viết
        </Button>
      </>
    );
  else
    return (
      <>
        <Button
          style={{ padding: "4px 0" }}
          type="link"
          key="list-loadmore-publish"
          onClick={() =>
            confirm(
              "Bạn có muốn công khai bài viết?",
              () => changeBlogStatus(id, BLOG_STATUS.publish),
              "Công khai bài viết",
              "Có",
              "Không"
            )
          }
        >
          công khai
        </Button>
        <Divider type="vertical" />
      </>

    );
};
