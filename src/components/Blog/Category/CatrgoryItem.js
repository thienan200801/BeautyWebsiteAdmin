import { FolderFilled, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { SortableElement } from "react-sortable-hoc";
import { changeCategoryOrder, deleteCategory, moveChildCategoryIndex, swapCategoryOrder } from "redux/reducer/categorySlice";

import showConfirm from "../../Modals/ConfirmModal";
import { CategorySortableList, modalStatus } from "./Categories";


const CategoryItem = SortableElement(({ category, setModalState }) => {
  const dispatch = useDispatch();
  let children = null;
  if (category.children?.length > 0) {
    /**
    * 
    * @param {number} oldIndex vị trí ban đầu
    * @param {number} newIndex vị trí mới
    * @return gọi api update sau đó cập nhật lại index mới
    */
    const onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex != newIndex) {
        const oldId = category.children[oldIndex].id

        const categoryNumber = category.children.length - 1
        switch (newIndex) {
          // move to first
          case 0:
            dispatch(changeCategoryOrder({ id: oldId, changes: { afterId: category.children[0].id } }))
            break;
          // move to last
          case categoryNumber:
            dispatch(changeCategoryOrder({ id: oldId, changes: { beforeId: category.children[categoryNumber].id } }))
            break;
          default:
            //move up to middle of 2 items
            if (newIndex - oldIndex < 0)
              dispatch(changeCategoryOrder({ id: oldId, changes: { beforeId: category.children[newIndex - 1].id, afterId: category.children[newIndex].id } }))

            else
              //move down to middle of 2 items
              dispatch(changeCategoryOrder({ id: oldId, changes: { beforeId: category.children[newIndex].id, afterId: category.children[newIndex + 1].id } }))
            break;
        }
        dispatch(moveChildCategoryIndex({ oldIndex, newIndex, parentId: category.id }))
      }
    };

    children = <CategorySortableList items={category.children} onSortEnd={onSortEnd} handleSetModalState={setModalState} lockAxis="y" />
  }

  const menu = (item) => (
    <Menu>
      <Menu.Item
        key={"1233" + item.id}
        onClick={() => {
          setModalState({
            category: item,
            status: modalStatus.edit,
          });
        }}
      >
        Sửa danh mục bài viết
      </Menu.Item>
      <Menu.Item
        key={"434" + item.id}
        onClick={() => {
          setModalState({
            category: item,
            status: modalStatus.child,
          });
        }}
      >
        Thêm danh mục con
      </Menu.Item>
      <Menu.Item
        key={"2321" + item.id}
        danger
        onClick={() => {

          const content =
            "Xoá category này sẽ xoá tất cả các category thứ cấp, tiếp tục?";
          showConfirm(
            content,
            () => dispatch(deleteCategory(item.id)),
            null
          );
        }}
      >
        Xoá danh mục bài viết
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={category.parent_id ? "ml-8" : ""}>
      <div className="py-4 flex w-full justify-between items-center border bg-white">
        <div className="flex items-center" >
          <FolderFilled style={{ fontSize: "160%", color: "gray" }} className="px-4 " />
          {category.name}
        </div>
        <Dropdown.Button type="link" trigger={["click"]} overlay={menu(category)} placement="bottomCenter" icon={<MoreOutlined style={{ fontSize: "160%", color: "black" }} />} />
      </div>
      {children}
    </div >
  );
})

export default CategoryItem