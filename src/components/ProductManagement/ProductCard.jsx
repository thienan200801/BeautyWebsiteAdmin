import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Tag, Tooltip } from "antd";
import ConfirmModal from "components/Modals/ConfirmModal";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteProduct,
  setProductEditing,
  setProductID,
} from "redux/reducer/productSlice";
import { HOST_NAME } from "utils/constant";
import { FormatVndCurrency } from "utils/helper";

function ProductCard({ product, ...props }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const ModifyItemClickOnOutlineButton = ({ domEvent }) => {
    domEvent.stopPropagation();
    dispatch(setProductEditing(product));
    dispatch(setProductID(product?.id));
    history.push(`/home/product-editor/${product.id}`);
  };

  const ModifyItemClickOnCard = (e) => {
    e.stopPropagation();
    dispatch(setProductEditing(product));
    dispatch(setProductID(product?.id));
    history.push(`/home/product-editor/${product.id}`);
  };

  const deleteItemCallback = () => {
    dispatch(deleteProduct(product.id));
  };

  const handleDeleteItem = ({ domEvent }) => {
    domEvent.stopPropagation();
    ConfirmModal("", deleteItemCallback, "Xóa sản phẩm");
  };

  const menu = () => (
    <Menu>
      <Menu.Item key="122333" onClick={ModifyItemClickOnOutlineButton}>
        Chỉnh sửa
      </Menu.Item>

      <Menu.Item key="7657" danger onClick={handleDeleteItem}>
        Xoá sản phẩm
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      onClick={ModifyItemClickOnCard}
      className={`p-6 items-center grid grid-cols-8 group border-blue-100 border-b-2 hover:bg-blue-100 cursor-pointer`}
    >
      <div className="flex items-center col-span-3">
        <div className="overflow-hidden rounded-full mr-5 w-14 h-14">
          <img
            src={`${HOST_NAME}${product.thumbnail}`}
            alt="hello"
            className="w-14 h-14 object-cover  rounded-ful"
          />
        </div>
        <div className="break-words whitespace-pre-wrap overflow-hidden">
          {product.name}
        </div>
      </div>

      <div className="col-span-2 mx-auto">
        {FormatVndCurrency(product?.price)}
      </div>
      <div className="col-start-7 mx-auto pl-4">
        {product?.is_in_stock ? (
          <Tag color="green">Còn hàng</Tag>
        ) : (
          <Tag color="magenta">Hết hàng</Tag>
        )}
      </div>

      <div className="flex justify-end items-center mr-2">
        <div className="mr-4">
          {product?.is_publish && (
            <Tooltip title="Đã công khai">
              <EyeOutlined style={{ fontSize: "140%" }} />
            </Tooltip>
          )}
          {!product?.is_publish && (
            <Tooltip title="Chưa công khai">
              <EyeInvisibleOutlined style={{ fontSize: "140%" }} />
            </Tooltip>
          )}
        </div>
        <div className="flex">
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            trigger={["click"]}
            arrow
          >
            <button
              className=" h-full px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreOutlined style={{ fontSize: "160%" }} />
            </button>
            {/* <button
            // className="bg-blue-200 p-1 w-auto h-auto flex hover:bg-blue-400 transform duration-300"
            >
              
              <EllipsisOutlined style={{ fontSize: "160%" }} />
            </button> */}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
