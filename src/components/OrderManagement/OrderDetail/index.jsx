import "../../../style/dropdown.css";

import { MailOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  confirmOrder,
  confirmPaymentOrder,
  editOrder,
  getInvoice,
  getSpecificOrder,
} from "redux/reducer/orderDetailSlice";
import ScrollToTop from "utils/ScrollToTop";

import OrderInformation from "./OrderInformation";
import ProductList from "./ProductList";

const { Option } = Select;
const { TextArea } = Input;

export default function OrderDetail() {
  const ORDER_CONFIRM_TEXT = "Xác nhận đơn hàng và gửi Email cho khách hàng?";
  const SHIPPING_CONFIRM_TEXT =
    "Xác nhận thanh toán thành công và gửi Email cho khách hàng?";
  const EMAIL_CONFIRM_AGAIN = "Gửi lại Email xác nhận đơn hàng?";
  const EMAIL_SHIPPING_AGAIN = "Gửi lại Email xác nhận thanh toán?";

  const listStatus = {
    pending: { id: 0, value: "pending", bgColor: "#9CA3AF", label: "Đang chờ" },
    confirm: { id: 1, value: "confirm", bgColor: "#60A5FA", label: "Xác nhận" },
    shipping: {
      id: 2,
      value: "shipping",
      bgColor: "#FCD34D",
      label: "Đang giao",
    },
    success: {
      id: 3,
      value: "success",
      bgColor: "#10B981",
      label: "Hoàn thành",
    },
    cancel: { id: 4, value: "cancel", bgColor: "#F87171", label: "Từ chối" },
  };

  let listOptions = [];
  for (const status in listStatus) {
    listOptions.push(
      <Option
        key={listStatus[status].id}
        style={{ background: listStatus[status].bgColor, color: "white" }}
        value={status}
      >
        {listStatus[status].label}
      </Option>
    );
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const clickingTimeoutRef = useRef(null);

  const { id } = useParams();

  const { orderEditing, invoice } = useSelector((state) => state.orderDetail);

  const [note, setNote] = useState("");
  const [orderStatus, setOrderStatus] = useState(orderEditing?.status);
  const [enableSendConfirmEmail, setEnableSendConfirmEmail] = useState(true);
  const [enableSendShippingEmail, setEnableSendShippingEmail] = useState(true);

  const handleNoteChange = (noteChanged) => {
    setNote(noteChanged.target.value);
  };

  function handleStatusChange(status) {
    setOrderStatus(status);
    console.log(status);
  }

  const HandleNote = (data) => (
    <div className="w-80">
      <div className="font-semibold text-base mb-2">
        Ghi chú của quản trị viên
      </div>
      <TextArea
        value={data}
        rows={5}
        onChange={handleNoteChange}
        bordered
        allowClear
        className="resize-none"
        style={{ marginBottom: "2px" }}
      />
      {/* Chi xuat hien khi da gui email roi. Can gui lai */}
      <div className="flex flex-col justify-end items-end">
        {orderEditing.mail_confirm && (
          <div
            onClick={() =>
              ConfirmModal(
                SendEmail,
                listStatus.confirm.value,
                EMAIL_CONFIRM_AGAIN
              )
            }
            className={`text-gray-500 ${
              enableSendConfirmEmail &&
              "cursor-pointer hover:text-gray-700 text-blue-600  underline"
            } `}
          >
            Gửi lại email xác nhận đơn hàng
          </div>
        )}
        {orderEditing.mail_shipping && (
          <div
            onClick={() =>
              ConfirmModal(
                SendEmail,
                listStatus.shipping.value,
                EMAIL_SHIPPING_AGAIN
              )
            }
            className={`text-gray-500 ${
              enableSendShippingEmail &&
              "cursor-pointer hover:text-gray-700 text-blue-600  underline"
            } `}
          >
            Gửi lại email xác nhận thanh toán
          </div>
        )}
      </div>
    </div>
  );

  // Su dung debound tranh click send lien tuc
  const SendEmail = (orderStatus) => {
    if (clickingTimeoutRef.current) {
      clearTimeout(clickingTimeoutRef.current);
      setEnableSendConfirmEmail(false);
      setEnableSendShippingEmail(false);
    }

    clickingTimeoutRef.current = setTimeout(() => {
      if (orderStatus === listStatus.confirm.value) {
        dispatch(confirmOrder(id));
      } else if (orderStatus === listStatus.shipping.value) {
        dispatch(confirmPaymentOrder(id));
      }
      setEnableSendConfirmEmail(true);
      setEnableSendShippingEmail(true);
    }, 1000);
  };

  const handleOnClickCanceling = () => {
    history.push("/home/order");
  };

  //Goi api save data
  const handleOnSaveData = () => {
    let dataToServer = {
      status: orderStatus,
      handle_note: note,
    };
    dispatch(editOrder({ id: id, state: dataToServer }));
  };

  const handleExportData = () => {
    window.open(invoice);
  };

  //Truyen vao call back bat buoc phai co SendEmail, Orderstatus de xac nhan loai mail gui, noi dung thong bao
  function ConfirmModal(callBack, orderStatus, confirmText) {
    let confirmModalContent = {
      title: confirmText,
      icon: (
        <MailOutlined
          style={{ color: "#60a5fa ", fontSize: "30px", marginBottom: "10px" }}
        />
      ),
      width: "400px",
      closable: true,
      bodyStyle: {
        display: "flex",
        flexFlow: "column",
        placeItems: "center",
        textAlign: "center",
      },
      onOk: () => {
        if (callBack) {
          callBack(orderStatus);
        }
      },
      okText: "Gửi",
      cancelText: "Quay lại",
    };
    Modal.confirm(confirmModalContent);
  }

  const SaveAndEmail = (orderStatus) => {
    handleOnSaveData();
    SendEmail(orderStatus);
  };

  const handleClickSaveData = () => {
    if (
      orderStatus === listStatus.confirm.value &&
      orderEditing?.mail_confirm === false
    ) {
      ConfirmModal(SaveAndEmail, orderStatus, ORDER_CONFIRM_TEXT);
    } else if (
      orderStatus === listStatus.shipping.value &&
      orderEditing?.mail_shipping === false
    ) {
      ConfirmModal(SaveAndEmail, orderStatus, SHIPPING_CONFIRM_TEXT);
    } else {
      handleOnSaveData();
    }
  };

  useEffect(() => {
    dispatch(getSpecificOrder(id));
    dispatch(getInvoice(id));
  }, []);

  useEffect(() => {
    setOrderStatus(orderEditing?.status);
    setNote(orderEditing?.handle_note);
    console.log("index page", orderEditing);
  }, [orderEditing]);

  if (!orderEditing) {
    return null;
  }

  return (
    <ScrollToTop>
      <div className="w-11/12 mx-auto ">
        <div className="px-6">
          <div className="mb-4">
            <Link to="/home/order/" className="underline">
              Tất cả đơn hàng
            </Link>
            {` > `}
            {"Đơn hàng "}
            {orderEditing?.customer_name}
          </div>
          <div className="flex justify-between mb-6 ">
            <div className="text-2xl font-semibold ">
              {"Đơn hàng "}
              {orderEditing?.customer_name}
            </div>

            <div className="flex items-center">
              <div className="text-base mr-4 font-medium">Trạng thái:</div>
              <Select
                // defaultValue={orderEditing?.status}
                value={orderStatus}
                onChange={handleStatusChange}
                className={`${orderStatus}`}
                style={{ width: "120px", color: "white", fontWeight: "550" }}
              >
                {listOptions}
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 flex flex-col">
          <div className="mb-4 flex justify-between">
            <OrderInformation orderInformation={orderEditing} />
            {HandleNote(note)}
          </div>
          <div className="mb-4">
            <ProductList order={orderEditing} />
          </div>
          <div className="flex justify-end gap-2">
            <Button className="mr-2" onClick={handleExportData}>
              In hoá đơn
            </Button>
            <Button type="primary" ghost onClick={handleOnClickCanceling}>
              Quay lại
            </Button>
            <Button type="primary" onClick={handleClickSaveData}>
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </ScrollToTop>
  );
}
