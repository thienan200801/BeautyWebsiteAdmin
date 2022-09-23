import { Avatar, Comment, Skeleton } from "antd";
import confirm from "components/Modals/ConfirmModal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentApi,
  updateCommentApi,
} from "redux/reducer/commentSlice";
import getDateTime from "utils/ConvertTime";

import { CommentItemEditor } from "./CommentItemEditor";

export default function CommentItem({ data }) {
  const { name, content, createdAt, is_show, blog_id, id, reply, repliedAt } =
    data;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loader);

  const [replyText, setReplyText] = useState();
  const [repling, setRepling] = useState(false);

  useEffect(() => {
    return () => {
      if (repling) setRepling(false);
    };
  }, []);

  const handleReply = (e) => {
    e.preventDefault();
    dispatch(
      updateCommentApi({
        blogid: blog_id,
        commentid: id,
        changes: { reply: replyText },
      })
    );
    setRepling(false);
  };

  const deleteReply = () => {
    dispatch(
      updateCommentApi({
        blogid: blog_id,
        commentid: id,
        changes: { reply: null },
      })
    );
  };

  const handleDelete = (blogid, commentid) => {
    dispatch(deleteCommentApi({ blogId: blogid, commentId: commentid }));
  };

  const toggleShowStatus = () => {
    dispatch(
      updateCommentApi({
        blogid: blog_id,
        commentid: id,
        changes: { is_show: !is_show },
      })
    );
  };

  return (
    <div style={{ paddingLeft: 22, paddingRight: 22 }}>
      <Skeleton avatar={true} loading={isLoading}>
        <Comment
          actions={[
            <span
              className={!is_show && "hidden"}
              key="comment-nested-reply-to"
              onClick={() => setRepling(!repling)}
            >
              Trả lời
            </span>,
            <span key="comment-basic-action" onClick={toggleShowStatus}>
              {is_show ? "Ẩn" : "Duyệt"}
            </span>,
            <span
              key="comment-basic-declined"
              onClick={() =>
                confirm(
                  "Xoá bình luận của " + name + "?",
                  () => handleDelete(blog_id, id),
                  "Xoá bình luận",
                  "Xoá",
                  "Quay lại"
                )
              }
            >
              Xoá
            </span>,
          ]}
          author={<a>{name}</a>}
          avatar={<Avatar>{name.charAt(0).toUpperCase()}</Avatar>}
          content={<p>{content}</p>}
          datetime={getDateTime(createdAt)}
        >
          {reply && (
            <Comment
              actions={[
                <span key="comment-nested-delete" onClick={deleteReply}>
                  Xoá trả lời
                </span>,
              ]}
              author={<a>ADMIN</a>}
              avatar={<Avatar>A</Avatar>}
              content={<p>{reply}</p>}
              datetime={getDateTime(repliedAt)}
            />
          )}

          {repling && (
            <CommentItemEditor
              onChange={(event) => setReplyText(event.target.value)}
              onSubmit={handleReply}
              onClose={() => setRepling(false)}
              submitting={isLoading}
              value={replyText}
            />
          )}
        </Comment>
      </Skeleton>
    </div>
  );
}
