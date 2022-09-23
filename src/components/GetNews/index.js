import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "redux/reducer/getNews";

import NewsItem from "./NewsItem";

export default function GetNews() {
    const dispatch = useDispatch();
    const { news } = useSelector((state) => state.news);


    //Lấy người subscribe

    useEffect(() => {
        dispatch(fetchNews());
        // console.log("get all news", news);
    }, []);
    console.log("get all news 2222", news);
    return (
        <div className="w-5/6 m-auto">
            <div className="mb-5">
                <div className="text-2xl font-semibold mb-1">Danh sách người dùng đăng ký nhận tin</div>
                <div>Hệ thống sẽ gửi email thông báo bài viết mới nhất cho các tài khoản dưới đây</div>
            </div>
            <div className="border bg-white p-4 overflow-y-hidden">
                <div className="flex justify-between items-center mb-4 border-b pb-3 px-4">
                    <div className="mb-0">Danh sách người dùng đăng ký nhận tin</div>
                    <div>
                        { }
                    </div>

                </div>
                {/* item */}
                <div className=" border cursor-pointer" >
                    <div className="grid grid-cols-2 ">

                        <div className="text-black pl-10 overflow-hidden py-4 text-sm pr-6 shorten-word font-bold">
                            Tên
                        </div>


                        <div className="text-black pl-0 overflow-hidden py-4 text-sm pr-6 shorten-word  font-bold ">
                            Email
                        </div>

                    </div>
                </div>
                {news.map((item, i) => (<NewsItem key={i} id={item.id} name={item.name} email={item.email} />))}




            </div>
        </div>
    )
}
