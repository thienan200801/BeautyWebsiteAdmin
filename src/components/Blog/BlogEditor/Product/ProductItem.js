import { Avatar, List } from "antd";
import React from "react";
export default function ProductItem({ thumbnail, name, description }) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={thumbnail} />}
        title={name}
        description={<span className="line-clamp-2">{description}</span>}
      />
    </List.Item>
  );
}
