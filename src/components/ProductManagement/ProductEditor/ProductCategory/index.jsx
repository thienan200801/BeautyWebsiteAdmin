import { Radio } from "antd";
import React from "react";

import ProductCategoryItem from "./ProductCategoryItem";

function ProductCategories({
  basedCategories,
  productCategory,
  setProductCategory,
}) {
  const handleOnCategoryChange = (checkedValues) => {
    setProductCategory(checkedValues.target.value);
    // console.log(basedCategories);
  };

  return (
    <>
      <div className="bg-white py-4 px-6 mb-3">
        <div className="font-medium border-b pb-1  mb-5 flex justify-center items-center">
          <div>Danh mục sản phẩm</div>
        </div>

        <div>
          <Radio.Group
            className="w-full"
            value={productCategory}
            onChange={handleOnCategoryChange}
          >
            {basedCategories &&
              basedCategories.length > 0 &&
              basedCategories.map((option) => (
                <ProductCategoryItem key={option.id} category={option} />
              ))}
          </Radio.Group>
        </div>
      </div>
    </>
  );
}

export default ProductCategories;
