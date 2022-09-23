import "../../../style/scrollbar.css";

import { Button, Empty, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortableContainer } from "react-sortable-hoc";

import { changeProductCategoryOrder, fetchProductCategory, moveProductCategoryIndex } from "../../../redux/reducer/productCategorySlice";
import { generateKey } from "../../../utils/helper";
import ProductCategoryModal from "../../Modals/productCategoryModal";
import { modalStatus } from "./Categories";
import ProductItem from "./productItem";

export default function productCategory() {
  const dispatch = useDispatch();
  const { productCategory } = useSelector((state) => state.productCategory);
  const { isLoading } = useSelector((state) => state.loader);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);

  const [modalState, setModalState] = useState({
    product: {},
    status: modalStatus.createnew,
  });

  const handleSetModalState = (data) => {
    setModalState({ ...data });
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setModalState(Object.assign(modalState, { visible: false, category: {} }));
  };
  useEffect(() => {
    dispatch(fetchProductCategory());
  }, []);

  useEffect(() => {
    dispatch(fetchProductCategory({ query: query }));
  }, [query, dispatch]);

  /**
    * 
    * @param {number} oldIndex vị trí ban đầu
    * @param {number} newIndex vị trí mới
    * @return gọi api update sau đó cập nhật lại index mới
    */
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex != newIndex) {
      const oldId = productCategory[oldIndex].id
      const categoryNumber = productCategory.length - 1
      switch (newIndex) {
        // move to first
        case 0:
          dispatch(changeProductCategoryOrder({ id: oldId, changes: { afterId: productCategory[0].id } }))
          break;
        // move to last
        case categoryNumber:
          dispatch(changeProductCategoryOrder({ id: oldId, changes: { beforeId: productCategory[categoryNumber].id } }))
          break;
        default:
          //move up to middle of 2 items
          if (newIndex - oldIndex < 0)
            dispatch(changeProductCategoryOrder({ id: oldId, changes: { beforeId: productCategory[newIndex - 1].id, afterId: productCategory[newIndex].id } }))

          else
            //move down to middle of 2 items
            dispatch(changeProductCategoryOrder({ id: oldId, changes: { beforeId: productCategory[newIndex].id, afterId: productCategory[newIndex + 1].id } }))
          break;
      }
      dispatch(moveProductCategoryIndex({ oldIndex, newIndex }))
    }
  };

  return (
    <div className=" p-4 w-full md:max-w-3xl m-auto ">
      <h3 className="text-2xl font-semibold mb-5 text-center">Danh mục sản phẩm </h3>
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
        <Button size="large" type="primary" loading={isLoading} onClick={() => { setModalState({ status: modalStatus.createnew, product: {} }); setVisible(true) }}>Tạo mới</Button>
      </div>


      <div className={`border  ${productCategory.length == 0 && "bg-white"}`}>
        {productCategory && <ProductCategorySortableList items={productCategory} onSortEnd={onSortEnd} handleSetModalState={handleSetModalState} lockAxis="y" />}
        {!productCategory || productCategory.length == 0 && <Empty />}
      </div>
      {modalState && (
        <ProductCategoryModal
          query={query}
          visible={visible}
          product={modalState.product}
          status={modalState.status}
          key={generateKey("category-modal")}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export const ProductCategorySortableList = SortableContainer(({ items, handleSetModalState }) => {
  return (
    <ul>
      {items.map((productCategory, index) => (
        <ProductItem
          index={index}
          key={productCategory.id}
          product={productCategory}
          setModalState={handleSetModalState}
        />
      ))}
    </ul>
  );
});