import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button, Form,
  Input
} from "antd";
import CoverImage from "components/Blog/BlogEditor/CoverImage/CoverImage";
import ReactEditor from "components/Common/Editor/ReactEditor";
import { default as React, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutMeSlice,
  updateAboutMeSlice
} from "redux/reducer/aboutMeSlice";


export default function Personal() {
  //Lấy thông tin cá nhân từ store
  const { personal } = useSelector((state) => state.personal);

  const dispatch = useDispatch();

  const [coverImg, setCoverImg] = useState(null);

  useEffect(() => {
    dispatch(getAboutMeSlice());
  }, []);

  useEffect(() => {
    if (personal) {
      let param = personal.avatar;
      setCoverImg({ url: `${param}` });
    }
  }, [personal]);

  //Lưu img

  //form
  const [form, setform] = useState([]);

  async function onFinishForm(values) {
    const editorContent = await editorRef.current.getData();
    values.avatar = coverImg?.filename;
    dispatch(updateAboutMeSlice({ ...values, about: editorContent }));

  }
  function onChange(hi) {
    // console.log("onChange", hi);
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //route

  const { TextArea } = Input;
  //uploadfile
  const [state, setState] = useState({
    loading: false,
  });

  const { loading, imageavatar } = state;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const editorRef = useRef(null);

  // console.log("COVER Img", coverImg);

  return (
    <>
      {personal && (
        <Form
          name="basic"
          onFinish={onFinishForm}
          onFinishFailed={onFinishFailed}
          onChange={onChange}
        // getFieldsValue={getFieldsValue}
        >
          <div className="md:mx-8 py-8">
            {/* <div >
              <div className="text-2xl font-semibold mb-1">Quản lý banner</div>
              <div>Thêm, xóa và quản lý các banner trên homepage</div>
            </div> */}
            <div className="mb-5">
              <div className="flex items-center">
                {" "}
                {/* <PageHeader
                  // className="site-page-header"
                  title="Thông tin cá nhân"
                  description="Quản lý thông tin cá nhân"
                /> */}
                <div ><div className="text-2xl font-semibold mb-1">Cập nhật thông tin cá nhân</div>
                  <div>Thêm, xóa, sửa thông tin cá nhân </div></div>

                <Button
                  className="ml-auto mt-2 mb-1"
                  type="primary"
                  htmlType="submit"
                >
                  Cập nhật
                </Button>
              </div>
              {/* <p className="md:mx-2">Quản lý thông tin cá nhân</p> */}
            </div>

            <div>
              <div className="border bg-white p-4 overflow-y-hidden ">
                {/* <div className="flex justify-between items-center mb-4 border-b pb-3 px-8">
                  <div className="mb-0">Danh sách banner </div>
                </div> */}
                <div className=" md:px-4 md:py-4 grid grid-cols-2 gap-10">
                  <div>
                    <div className="py-2">Tên</div>
                    <Form.Item name="name">
                      <Input
                        placeholder="Nhập họ và tên"
                        defaultValue={personal.name}
                      />
                    </Form.Item>

                    <div className="py-2">Mô tả</div>
                    <Form.Item name="description">
                      <Input
                        placeholder=""
                        defaultValue={personal.description}
                      />
                    </Form.Item>

                    <div className="py-2">Về tôi</div>
                    <ReactEditor
                      editorRef={editorRef}
                      data={personal ? personal.about : null}
                    />
                    {/* <Form.Item name="about">
                      <TextArea rows={8} defaultValue={personal.about} />
                    </Form.Item> */}
                  </div>
                  <div>
                    <div className="py-2">Avatar</div>
                    <Form.Item name="avatar">
                      <CoverImage
                        img={coverImg}
                        setCoverImage={(img) => setCoverImg(img)}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}
