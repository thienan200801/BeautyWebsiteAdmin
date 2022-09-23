import "../../../style/scrollbar.css";

import { Button, Empty, Input } from 'antd'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortableContainer } from "react-sortable-hoc";
import { changeCategoryOrder, getCategory, moveCategoryIndex, selectAllCategory } from "redux/reducer/categorySlice";
import { generateKey } from "utils/helper";
import useDebounce from "utils/useDebounce";

import ModifyCategoryModal from "../../Modals/CategoryModal";
import CategoryItem from "./CatrgoryItem";

export const modalStatus = { edit: "edit", createnew: "new", child: "child" }



export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategory);
  const { isLoading } = useSelector((state) => state.loader);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const handleSearch = useDebounce(searchValue => dispatch(getCategory({ query: searchValue })))

  const [modalState, setmodalState] = useState({
    category: {},
    status: modalStatus.createnew,
  });

  const handleSetModalState = (data) => {
    setmodalState({ ...data });
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
    setmodalState({});
  };

  useEffect(() => {
    handleSearch(query)
  }, [query]);

  /**
   * 
   * @param {number} oldIndex vị trí ban đầu
   * @param {number} newIndex vị trí mới
   * @return gọi api update sau đó cập nhật lại index mới
   */
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex != newIndex) {
      const oldId = categories[oldIndex].id
      const categoryNumber = categories.length - 1
      switch (newIndex) {
        // move to first
        case 0:
          dispatch(changeCategoryOrder({ id: oldId, changes: { afterId: categories[0].id } }))
          break;
        // move to last
        case categoryNumber:
          dispatch(changeCategoryOrder({ id: oldId, changes: { beforeId: categories[categoryNumber].id } }))
          break;
        default:
          //move up to middle of 2 items
          if (newIndex - oldIndex < 0)
            dispatch(changeCategoryOrder({ id: oldId, changes: { beforeId: categories[newIndex - 1].id, afterId: categories[newIndex].id } }))

          else
            //move down to middle of 2 items
            dispatch(changeCategoryOrder({ id: oldId, changes: { beforeId: categories[newIndex].id, afterId: categories[newIndex + 1].id } }))
          break;
      }
      dispatch(moveCategoryIndex({ oldIndex, newIndex }))
    }
  };



  return (
    <div className=" p-4 w-full md:max-w-3xl m-auto ">
      <h3 className="text-2xl font-semibold mb-5 text-center">Danh mục bài viết </h3>
      <div className="flex justify-between items-center w-full mb-4 bg-white">
        <Input
          allowClear
          loading={isLoading}
          placeholder="Tìm kiếm danh mục bài viết"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          size="large"
          value={query}
        />
        <Button size="large" type="primary" loading={isLoading} onClick={() => { setmodalState({ status: modalStatus.createnew, category: {} }); setVisible(true) }}>Tạo mới</Button>
      </div>

      <div className={`border  ${categories?.length == 0 && "bg-white"}`}>
        {categories && <CategorySortableList items={categories} onSortEnd={onSortEnd} handleSetModalState={handleSetModalState} lockAxis="y" />}
        {!categories || categories.length == 0 && <Empty />}
      </div>

      <ModifyCategoryModal
        query={query}
        visible={visible}
        category={modalState.category}
        status={modalState.status}
        key={generateKey("category-modal")}
        closeModal={closeModal}
      />
    </div>

  );
}


export const CategorySortableList = SortableContainer(({ items, handleSetModalState }) => {
  return (
    <ul>
      {items.map((category, index) => (
        <CategoryItem key={category.id} index={index} category={category} setModalState={handleSetModalState} />
      ))}
    </ul>
  );
});