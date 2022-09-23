import { FolderFilled, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { relativeTime } from "dayjs/locale/vi";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SortableElement } from "react-sortable-hoc";

import { changeProductCategoryOrder, deleteProductCategory, moveProductChildCategoryIndex } from "../../../redux/reducer/productCategorySlice";
import showConfirm from "../../Modals/ConfirmModal";
import { modalStatus } from "./Categories";
import { ProductCategorySortableList } from "./productCategory";

const ProductItem = SortableElement(({ product, setModalState }) => {
  const dispatch = useDispatch();
  let children = null;
  if (product.children && product.children.length) {
    /**
    * 
    * @param {number} oldIndex vị trí ban đầu
    * @param {number} newIndex vị trí mới
    * @return gọi api update sau đó cập nhật lại index mới
    */
    const onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex != newIndex) {
        const oldId = product.children[oldIndex].id

        const categoryNumber = product.children.length - 1
        switch (newIndex) {
          // move to first
          case 0:
            dispatch(changeProductCategoryOrder({ id: oldId, changes: { afterId: product.children[0].id } }))
            break;
          // move to last
          case categoryNumber:
            dispatch(changeProductCategoryOrder({ id: oldId, changes: { beforeId: product.children[categoryNumber].id } }))
            break;
          default:
            //move up to middle of 2 items
            if (newIndex - oldIndex < 0)
              dispatch(changeProductCategoryOrder({ id: oldId, changes: { beforeId: product.children[newIndex - 1].id, afterId: product.children[newIndex].id } }))

            else
              //move down to middle of 2 items
              dispatch(changeProductCategoryOrder({ id: oldId, changes: { beforeId: product.children[newIndex].id, afterId: product.children[newIndex + 1].id } }))
            break;
        }
        dispatch(moveProductChildCategoryIndex({ oldIndex, newIndex, parentId: product.id }))
      }
    };

    children = <ProductCategorySortableList items={product.children} onSortEnd={onSortEnd} handleSetModalState={setModalState} lockAxis="y" />

  }


  const menu = (item) => (
    <Menu>
      <Menu.Item
        key="1233"
        onClick={() => {
          setModalState({
            product: item,
            status: modalStatus.edit
          });
        }}
      >
        Sửa danh mục sản phẩm
      </Menu.Item>
      <Menu.Item
        key="434"
        onClick={() => {
          setModalState({
            product: item,
            status: modalStatus.child
          });
        }}
      >
        Thêm danh mục con
      </Menu.Item>
      <Menu.Item
        key="7657"
        danger
        onClick={() => {
          const content =
            "Xoá category sẽ xoá tất cả các category thứ cấp, tiếp tục?";
          showConfirm(
            content,
            () => dispatch(deleteProductCategory(product.id)),
            null
          );
        }}
      >
        Xoá danh mục
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={product.parent_id ? "ml-8" : ""}>
      <div className="py-4 flex w-full justify-between items-center border bg-white">
        <div className="flex items-center">
          <FolderFilled style={{ fontSize: "160%", color: "gray" }} className="px-4 " />
          {product.name}
        </div>
        <Dropdown.Button type="link" trigger={["click"]} overlay={menu(product)} placement="bottomCenter" icon={<MoreOutlined style={{ fontSize: "160%", color: "black" }} />} />
      </div>
      {children}
    </div >
  );
})

export default ProductItem