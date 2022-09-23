import "../../../style/banner.css";

import { CheckCircleFilled } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { HOST_NAME } from "utils/constant";
const { Meta } = Card;

function BannerCard({ banner, onClickCard, isActive }) {
  // const [selectedCard, setSelectedCard] = useState(banner.checked);

  const handleToggle = () => {
    // setSelectedCard(!selectedCard);
    // console.log(banner);
    onClickCard(banner);
  };

  // let selectedCard = banner.checked;

  return (
    <div
      className={`w-full ${isActive && "border border-green-400"} relative`}
      onClick={handleToggle}
    >
      <Card
        className=""
        hoverable={!isActive}
        cover={
          <img
            style={{ height: "200px" }}
            alt="example"
            src={`${HOST_NAME}${banner.media.url}`}
          />
        }
      >
        <Meta
          title={banner.title}
          description={<div className="shorten-word-4">{banner.content}</div>}
        />
      </Card>
      {isActive && (
        <CheckCircleFilled
          className="absolute -top-1 -right-1 text-green-400"
          style={{ fontSize: "24px" }}
        />
      )}
    </div>
  );
}

export default BannerCard;
