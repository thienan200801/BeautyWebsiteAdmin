import ProductVariantModal from "components/Modals/ProductVariant/";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductVariant,
  getSpecificProduct,
  initProduct,
} from "redux/reducer/productSlice";

import ProductVariantCard from "./ProductVariantCard";

function ProductVariants({ variants }) {
  //productID co duoc khi tao variant hoac modify.
  const { productID } = useSelector((state) => state.product);

  //state quan li visible cua variant modal
  const [visible, setVisible] = useState(false);

  //Truyen data tu variant component den variant modal.
  const [productVariantState, setProductVariantState] = useState(null);

  const dispatch = useDispatch();

  const handleAddNewVariant = () => {
    setVisible(true);
    setProductVariantState({
      id: 0,
      name: "",
      description: "",
      price: 0,
    });
  };

  const handleModifyingVariant = (variant) => {
    setVisible(true);
    setProductVariantState({
      id: variant.id,
      name: variant.name,
      description: variant.description,
      price: variant.price,
    });
  };

  const handleDeleteVariant = (variant) => {
    dispatch(deleteProductVariant({ id: variant.id, productID: productID }));
  };

  return (
    <>
      <div className="bg-white ">
        <div className="font-medium  pb-2 pt-4 px-6 flex justify-between items-center">
          <div>Các biến thể sản phẩm</div>
          <div
            onClick={handleAddNewVariant}
            className="text-sm text-blue-500 underline hover:text-gray-800 cursor-pointer"
          >
            + Thêm mới
          </div>
        </div>

        <div className="grid grid-cols-4 text-sm bg-blue-200 px-6 py-1 font-medium">
          <div className="justify-self-center">Biến thể</div>
          <div className="justify-self-center">Giá</div>
          <div className="justify-self-center">Mô tả</div>
          <div className="justify-self-center">Chỉnh sửa</div>
        </div>

        <div>
          {Array.isArray(variants) &&
            variants.length !== 0 &&
            variants.map((variant) => (
              <ProductVariantCard
                key={variant.id}
                variant={variant}
                eventHandler={{ handleModifyingVariant, handleDeleteVariant }}
              />
            ))}
          {(!Array.isArray(variants) || variants.length === 0) && (
            <div className="p-6 text-sm border-b text-center text-gray-500">
              Chưa có biến thể nào
            </div>
          )}
        </div>
      </div>
      <ProductVariantModal
        visible={visible}
        setVisible={setVisible}
        variantState={productVariantState}
        //Variant modal nhan ID de tao moi variant va rerender.
        id={productID}
      />
    </>
  );
}

export default ProductVariants;
