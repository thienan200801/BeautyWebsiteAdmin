import { Button, Modal } from "antd";
import { configConsumerProps } from "antd/lib/config-provider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEditingSlide,
} from "redux/reducer/slideSlice";

import { get, post } from "../../../api/index";
import BannerCard from "./BannerCard";

function BannerModal({
  idSlide,
  bannerItems,
  visible,
  setVisible,
  listBanner,
}) {
  //chua banner của 1 slide
  const { editingSlide } = useSelector((state) => state.slide);
  const [bannerState, setBanner] = useState(new Set());
  useEffect(() => {
    if (editingSlide && editingSlide.banners) {
      const newbanner = new Set();
      if (editingSlide.banners.length > 0) {
        editingSlide.banners.forEach((item, i) => {
          console.log(item.id);
          //setBanner(new Set(bannerState.add(item.id)));
          newbanner.add(item.id);
        });
        setBanner(newbanner);
      }
    }
  }, [editingSlide?.banners]);

  //chua tat ca cac banner
  const [allBanner, setAllBanner] = useState([]);
  //temp banner
  const [bannerId, setbannerId] = useState([]);
  //dispatch
  const dispatch = useDispatch();
  //GET
  async function getBanner() {
    let newbanner = [];
    get("/banner")
      .then((res) => {
        setAllBanner(res.data);
      })
      .catch((err) => console.log("loi roi", err));
  }

  useEffect(() => {
    getBanner();
  }, []);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    const listNewBannerId = Array.from(bannerState);
    dispatch(
      updateEditingSlide({ idSlide: idSlide, bannerId: listNewBannerId })
    );
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 200);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const renderCard = (item) => {
    for (let i in bannerState) {
      if (bannerState[i].id == item.id) {
        bannerState[i].checked = true;
        break;
      }
    }
  };
  const handleOnClickCard = (item) => {
    ModifyBannerStatus(item);
  };

  const [pushStateChecked, setStateChecked] = useState([]);
  const ModifyBannerStatus = (banner) => {
    if (bannerState.has(banner?.id)) {
      const newSet = bannerState;
      newSet.delete(banner?.id);
      setBanner(new Set(newSet));
    } else {
      setBanner(new Set(bannerState.add(banner?.id)));
    }
  };

  const header = (
    <div className="flex justify-between items-center">
      <div>
        <h3>Tất cả banner</h3>
      </div>
      <div>
        <Button key="submit" type="primary" onClick={handleOk} className="mr-4">
          Lưu thay đổi
        </Button>
        <Button key="back" onClick={handleCancel}>
          Trở lại
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        title={header}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={960}
        closable={false}
        footer={[]}
      >
        <div className="grid grid-cols-4 gap-6">
          {(allBanner || []).map(function (item, i) {
            return (
              <div key={item?.id}>
                <BannerCard
                  banner={item}
                  isActive={bannerState?.has(item?.id)}
                  onClickCard={handleOnClickCard}
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export default BannerModal;
