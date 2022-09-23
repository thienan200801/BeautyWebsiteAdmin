import { List, Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { COMMENT_STATUS } from "utils/constant";

import SelectBlog from "./components/SelectBlog";
import Wrapper from "./components/Wrapper";

const { TabPane } = Tabs;

export default function Comment() {
  const { comments } = useSelector((state) => state.comment);

  // const dispatch = useDispatch();

  // // useEffect(() => {
  // //   dispatch(getComments());
  // // }, []);
  return (
    <>
      <div className="text-2xl font-semibold mb-4 w-full sm:w-1/2 md:w-3/4 m-auto ">
        Quản lí bình luận
      </div>
      <div className="w-full sm:w-1/2 md:w-3/4 m-auto pb-10 bg-white">
        <div className="px-4 py-3">
          <SelectBlog />
        </div>
        <div className="px-4">
          <Tabs>
            {/* render bộ comment theo từng bài blog theo trạng thái (duyêt/chưa duyệt) */}
            {/* ví dụ: nếu render tab chưa duyệt, nếu bài blog đó toàn là comment đã duyệt thì không render nó ở tab chưa duyệt nữa */}
            {Object.keys(COMMENT_STATUS).map((status, index) => (
              <TabPane tab={status} key={index}>
                <List
                  dataSource={comments?.filter((blog) => {
                    //tìm trong đống commnet của blog, nếu trạng thái phê duyệt của comment giống với trạng thái hiện tại của tab thì chấp nhận render blog đó
                    // ngược lại không cho render
                    // giá trị của match có thể là:
                    // 1 mảng rỗng(khi blog có commnent có trạng thái phê duyệt KHÔNG trùng với trạng thái của tab) hoặc
                    // mảng có phần tử (ngược lại)
                    const match = blog.comments.filter(
                      (c) => c.is_show == COMMENT_STATUS[status]
                    );
                    return Boolean(match.length);
                  })}
                  renderItem={(blog) => {
                    return (
                      <Wrapper
                        approved={COMMENT_STATUS[status]}
                        data={blog}
                        key={12}
                      />
                    );
                  }}
                  itemLayout="vertical"
                />
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
