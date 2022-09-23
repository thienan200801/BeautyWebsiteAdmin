import '../../style/banner.css';

import { MoreOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, List } from "antd";
import confirm from 'components/Modals/ConfirmModal';
import React from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { deleteBanner, setBannerEditing } from 'redux/reducer/bannerSlice';


export default function BannerItem({ item, menu }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRouterChange = () => {
    dispatch(setBannerEditing(item))
    history.push(`/home/banner-editor/${item.id}`)
  }

  const handledeleteBanner = () => {
    dispatch(deleteBanner(item.id))
  }

  const CustomTile = <Link to={`/home/banner-editor/${item.id}`} className="line-clamp-1">
    {item?.title}
  </Link>
  const CustomDescription = <span className="line-clamp-2">
    {item?.content}
  </span>

  return (
    <List.Item actions={[<Button key="banner-item-delete" type="text" danger onClick={() => confirm("Hành động không thể hoàn tác, tiếp tục?", handledeleteBanner, "Xoá banner", "Xoá", "Quay lại")}>Xoá banner</Button>]}>
      <List.Item.Meta
        avatar={
          <Avatar shape="square" size={100} src={item.media?.url}
            alt={item.media?.alt}
          />
        }
        title={CustomTile}
        description={CustomDescription}
      />
    </List.Item>
  );
}
