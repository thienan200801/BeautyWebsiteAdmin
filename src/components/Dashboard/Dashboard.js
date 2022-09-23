import { CommentOutlined, MedicineBoxOutlined, ReadOutlined, ShopOutlined } from '@ant-design/icons'
import { Badge, Card, Divider, message, } from 'antd'
import { get } from 'api'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { stopLoading } from 'redux/reducer/loaderSlice'
import { getOrder } from 'redux/reducer/orderSlice'
import { thisMonthAndYear, toDay } from 'utils/ConvertTime'

const style = {
    card_big: "flex flex-col items-center justify-center font-semibold text-grey gap-8",
    card_small: "flex flex-col items-center justify-center font-semibold text-grey gap-3",
    actions: "flex flex-col items-center gap-2"
}


export default function Dashboard() {
    const { listOrder } = useSelector((state) => state.order);

    // analytic in all time
    const [allTime, setAllTime] = useState()
    // analytic in this month
    const [currentMonth, setCurrentMonth] = useState()

    const callAnalytic = () => {
        const url = "admin/analytics"
        get(url).then(res => {
            const { countBlog, countComment, countOrder, countSubscribe, countProduct, countPendingComment } = res.data
            setAllTime({ countBlog, countComment, countSubscribe, countProduct, countPendingComment })
            setCurrentMonth({ ...countOrder })
        }).catch(err => message.error(err.response.data.error)).finally(dispatch(stopLoading))
    }


    const today = toDay()

    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        callAnalytic()
        dispatch(getOrder());
    }, [])
    return (
        <>
            <h3 className="text-2xl font-semibold mb-5 h-full">Trang chủ </h3>
            <div className="xl:grid xl:grid-cols-2 gap-8" >
                <div className="grid grid-cols-2 grid-rows-2 gap-10 mb-8 xl:mb-0">
                    <div className=" h-full w-full">
                        <Card hoverable bordered={false} >
                            <div className={style.card_big} >
                                <p className="m-0">Tổng số đơn hàng</p>
                                <p className="text-4xl font-bold text-grey-dark m-0" >{listOrder.length}</p>
                                <p className="m-0">{`Tính đến ${today}`}</p>
                            </div>

                        </Card>
                    </div>
                    <div className=" h-full w-full">
                        <Card hoverable bordered={false}>
                            <div className={style.card_big}>
                                <p className="m-0">Số lươt đăng kí</p>
                                <p className="text-4xl m-0 font-bold text-grey-dark">{allTime?.countSubscribe}</p>
                                <p className="m-0">{`Tính đến ${today}`}</p>
                            </div>

                        </Card>
                    </div>
                    <div className=" h-full w-full">
                        <Card hoverable bordered={false}>
                            <div className={style.card_big}>
                                <p className="m-0">Số lượng bài viết</p>
                                <p className="text-4xl m-0 font-bold text-grey-dark">{allTime?.countBlog}</p>
                                <p className="m-0">Hiện có</p>
                            </div>
                        </Card >
                    </div>
                    <div className=" h-full w-full">
                        <Card hoverable bordered={false} >
                            <div className={style.card_big}>
                                <p className="m-0">Số bình luận</p>
                                <p className="text-4xl m-0 font-bold text-grey-dark">{allTime?.countComment}</p>
                                <p className="m-0">{`Tính đến ${today}`}</p>
                            </div>
                        </Card>
                    </div>

                </div>
                <div className=" h-full">
                    <Card title={`Trong tháng ${thisMonthAndYear()} `} headStyle={{ fontSize: "1.25rem", lineHeight: "1.75rem" }} style={{ height: "100%" }}>
                        <div className="grid grid-cols-3 grid-rows-2 gap-10">
                            <div className=" h-full w-full">
                                <Card bordered={false} hoverable={true} bodyStyle={{ background: "#f3f4f6" }}>
                                    <div className={style.card_small}>
                                        <p className="text-5xl m-0 text-grey-dark">{currentMonth?.all}</p>
                                        <p className="m-0 text-center">Tổng số đơn hàng</p>
                                    </div>
                                </Card>
                            </div>
                            <div className=" h-full w-full">
                                <Card bordered={false} hoverable={true} bodyStyle={{ background: "#f3f4f6" }}>
                                    <div className={style.card_small} >
                                        <p className="text-5xl m-0 text-grey-dark" style={{ color: "#fadb14" }}>{currentMonth?.pending}</p>
                                        <p className="m-0 text-center"> Chờ xác nhận</p>
                                    </div>
                                </Card>
                            </div>
                            <div className=" h-full w-full">
                                <Card bordered={false} hoverable={true} bodyStyle={{ background: "#f3f4f6" }}>
                                    <div className={style.card_small}>
                                        <p className="text-5xl m-0" style={{ color: "#d48806" }}>{currentMonth?.confirm}</p>
                                        <p className="m-0 text-center">Đã xác nhận</p>
                                    </div>
                                </Card>
                            </div>
                            <div className=" h-full w-full">
                                <Card bordered={false} hoverable={true} bodyStyle={{ background: "#f3f4f6" }}>
                                    <div className={style.card_small}>
                                        <p className="text-5xl m-0 text-primary">{currentMonth?.shipping}</p>
                                        <p className="m-0 text-center">Đang vận chuyển</p>
                                    </div>
                                </Card>
                            </div>
                            <div className=" h-full w-full">
                                <Card bordered={false} hoverable={true} bodyStyle={{ background: "#f3f4f6" }}>
                                    <div className={style.card_small}>
                                        <p className="text-5xl m-0" style={{ color: "#52c41a" }}>{currentMonth?.success}</p>
                                        <p className="m-0 text-center">Thành công</p>
                                    </div>
                                </Card>
                            </div>
                            <div className=" h-full w-full">
                                <Card bordered={false} hoverable={true} bodyStyle={{ background: "#f3f4f6" }}>
                                    <div className={style.card_small}>
                                        <p className="text-5xl m-0" style={{ color: "#ff4d4f" }}>{currentMonth?.cancel}</p>
                                        <p className="m-0 text-center">Từ chối</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-span-2">
                    <div className=" bg-white p-4">
                        <Divider ><span className="text-xl">Truy cập nhanh</span></Divider>
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 max-w-lg m-auto h-full">
                            <Card hoverable onClick={() => history.push("/home/order")} >
                                <div className={style.actions}>
                                    <ShopOutlined style={{ fontSize: "160%", color: "#1890ff" }} />
                                    Xem đơn hàng
                                </div>
                            </Card >
                            <Card hoverable onClick={() => history.push("/editor/create")} >
                                <div className={style.actions} >
                                    <ReadOutlined style={{ fontSize: "160%", color: "#1890ff" }} />
                                    Tạo bài viết mới
                                </div>
                            </Card >
                            <Card hoverable onClick={() => history.push("/home/comments")} >
                                <div className={style.actions} >
                                    <Badge count={allTime?.countPendingComment}>

                                        <CommentOutlined style={{ fontSize: "160%", color: "#1890ff" }} />
                                    </Badge>
                                    Duyệt bình luận
                                </div>
                            </Card >
                            <Card hoverable onClick={() => history.push("/home/product-editor")}>
                                <div className={style.actions}  >
                                    <MedicineBoxOutlined style={{ fontSize: "160%", color: "#1890ff" }} />
                                    Thêm sản phẩm
                                </div>
                            </Card ></div>
                    </div>
                </div>
            </div>
        </>
    )
}
