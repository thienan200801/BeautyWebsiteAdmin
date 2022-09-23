import { CloseCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import { Avatar, Card } from "antd";
import BannerModal from "components/Modals/Banner";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
const { Meta } = Card;
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchEditingSlide,
  removeBannerFromSlide,
  updateEditingSlide,
} from "redux/reducer/slideSlice";
import { HOST_NAME } from "utils/constant";

export default function SlideEditor() {
  //lấy id của slide trên route
  const { slideId } = useParams();
  //Lấy banner có trong slide i
  const { editingSlide } = useSelector((state) => state.slide) || {};

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  function handleRemoveBanner(id) {
    dispatch(removeBannerFromSlide({ bannerId: id, slideId: editingSlide.id }));
  }

  useEffect(() => {
    //get dữ liệu của slide có id === id
    dispatch(fetchEditingSlide({ slideId: slideId }));
  }, [slideId]);

  return (
    <>
      <div>
        <div className=" md:ml-8">
          <div className="text-2xl font-semibold mb-1">
            {editingSlide?.name}
          </div>
          <div>Thêm bớt các banner trong slide</div>
        </div>
        <div className="md:mx-8 md:mt-6">
          <div className="  shadow-xl m-auto bg-white  ">
            <div className=" h-24 mt-6 bg-white ">
              <div className="py-8 pl-4 grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
                <p className="">DANH SÁCH CÁC BANNER TRONG SLIDE</p>
                <div className="text-right mr-6">
                  {" "}
                  <Button
                    type="primary text-right "
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    Thêm banner
                  </Button>
                  <div>
                    <BannerModal
                      idSlide={editingSlide?.id}
                      visible={visible}
                      setVisible={setVisible}
                      listBanner={
                        editingSlide?.banners ? [...editingSlide.banners] : []
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            {/* /////////card component////////// */}
            <div className="" style={{ minHeight: "65vh" }}>
              {" "}
              {/* List card row*/}
              <div
                className={` w-full md:py-8 md:px-4 grid md:grid-cols-5 grid-cols-2  m-auto gap-2 md:gap-4`}
              >
                {/* ////////MAP//////////// */}
                {(editingSlide?.banners || []).map((banner, index) => {
                  return (
                    <CardItem
                      key={index}
                      handleRemoveBanner={handleRemoveBanner}
                      bannerInfo={banner}
                    />
                  );
                })}
              </div>
              {/*end  List card */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CardItem({ bannerInfo, handleRemoveBanner }) {
  return (
    <>
      {" "}
      {/* card */}
      <div className={` relative  `}>
        <div className="absolute bg-black h-full w-full z-10 bg-opacity-50 opacity-0 transition-all  hover:opacity-100">
          <div
            onClick={() => {
              console.log("BAT SU KIEN", bannerInfo.id);
              handleRemoveBanner(bannerInfo.id);
            }}
          >
            {" "}
            <CloseCircleTwoTone
              twoToneColor="#eb2f96"
              className={`absolute top-0 right-1 text-xl pt-0 mt-0`}
            />
          </div>
        </div>
        <Card
          cover={
            <img
              alt="example"
              style={{ height: "200px" }}
              src={`${HOST_NAME}${bannerInfo.media.url}`}
            />
          }
        >
          <Meta
            title={`${bannerInfo.title}`}
            description={`${bannerInfo.content}`}
          />
        </Card>
      </div>
      {/*end card */}
    </>
  );
}

//nên tách item ra làm một component riêng
