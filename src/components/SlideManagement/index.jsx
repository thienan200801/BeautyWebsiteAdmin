import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { List, Switch, Tooltip } from "antd";
import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// import { get, patch, patchVisible } from "../../api/index";
import {
  fetchSlides,
  setSlidesEditing,
  updateSlideStatus,
} from "../../redux/reducer/slideSlice";

export default function SlideManagement() {
  const history = useHistory();
  function onChange(checked) {
    // console.log(`switch to ${checked}`);
  }

  useEffect(() => {
    dispatch(fetchSlides());
  }, []);
  // lay trong store ra
  const slides = useSelector((state) => state.slide.slides);

  //EDIT cái nút đó
  const dispatch = useDispatch();
  async function Edit(status, id) {
    status = !status;
    dispatch(updateSlideStatus({ id, status }));
    dispatch(fetchSlides());
  }

  return (
    <>
      <div className=" p-4 w-full md:max-w-3xl m-auto  ">
        <div className="text-center mb-5">
          <h3 className="text-2xl font-semibold  ">Quản lý slide </h3>

          <p>
            Ẩn, hiện các slide, quản lý danh sách Banner trong Slide
          </p>
        </div>
        <div className="md:mt-6">
          <div className="grid-flow-row w-full  m-auto bg-white ">
            <List dataSource={slides} renderItem={(slide) =>
              <List.Item
                actions={[
                  <Tooltip title={`${slide.is_visible ? "Đã bật" : "Đã tắt"}`}
                    key={`a${slide.id}`}
                  >
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      checked={slide.is_visible}
                      onChange={onChange}
                      onClick={() => {
                        Edit(slide.is_visible, slide.id);
                      }}
                    />

                  </Tooltip>,
                  <Button type="link" key={slide.id} onClick={() => {
                    setSlidesEditing(slide)
                    history.push(`/home/slide-editor/${slide.id}`)
                  }}>
                    xem thông tin
                  </Button>]}>
                <List.Item.Meta
                  className="pl-4"
                  title={slide.name}

                />
              </List.Item>
            }></List>
          </div>
        </div>
      </div>
    </>
  );
}
