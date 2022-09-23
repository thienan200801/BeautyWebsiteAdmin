import { List } from "antd";
import React from "react";

import CommentItem from "./CommentItem";

// render blog name and group of blog comment
export default function Wrapper({ data, approved }) {
  return (
    <>
      <div className="relative border pt-2 mt-2 mb-9 ">
        <div className="absolute left-4 -top-4 bg-white px-2 font-medium text-lg">
          {data.title}
        </div>
        <List
          className="comment-listm"
          header={
            <span
              style={{ paddingLeft: 22 }}
            >{`${data.comments.length} trả lời`}</span>
          }
          itemLayout="horizontal"
          dataSource={data.comments.filter((cmt) => cmt.is_show == approved)}
          renderItem={(item) => <CommentItem data={item} />}
        />
      </div>
    </>
  );
}
