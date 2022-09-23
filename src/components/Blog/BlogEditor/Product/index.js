import { Empty, List, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBlog } from "redux/reducer/blogSlice";
import {
  getProducts,
  selectNomalizedProducts,
} from "redux/reducer/productSlice";

import ProductItem from "./ProductItem";

const { Option } = Select;

export default function Product({ selectedProducts }) {
  const nomalizedProducts = useSelector((state) =>
    selectNomalizedProducts(state)
  );
  const dispatch = useDispatch();

  const onSelectProduct = (id) => {
    const productSet = new Set([...selectedProducts, id]);
    dispatch(updateCurrentBlog({ product: [...productSet] }));
  };

  const onDeselectProduct = (id) => {
    dispatch(
      updateCurrentBlog({
        product: selectedProducts.filter(
          (selectedProductId) => selectedProductId != id
        ),
      })
    );
  };

  useEffect(() => {
    if (!nomalizedProducts) dispatch(getProducts());
  }, []);

  return (
    <>
      {nomalizedProducts && (
        <>
          <Select
            defaultValue={selectedProducts}
            showSearch={true}
            mode="multiple"
            maxTagTextLength={10}
            placeholder="Tên một sản phẩm"
            optionLabelProp="label"
            optionFilterProp="label"
            onDeselect={onDeselectProduct}
            onSelect={onSelectProduct}
            style={{ width: "100%" }}
          >
            {Object.values(nomalizedProducts).map((item) => {
              return (
                <Option key={item.id} label={item.name} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>

          {selectedProducts?.length > 0 && (
            <List
              dataSource={selectedProducts.map((id) => nomalizedProducts[id])}
              renderItem={(item) => (
                <ProductItem
                  thumbnail={item.thumbnail}
                  description={item.description}
                  name={item.name}
                />
              )}
            />
          )}

          {selectedProducts?.length == 0 && (
            <Empty
              style={{ marginTop: 4 }}
              description="Gợi ý sản phẩm cho khách hàng"
            ></Empty>
          )}
        </>
      )}
      {!nomalizedProducts && (
        <Empty description="Ban chưa có sản phẩm nào, trước tiên, hãy thêm một sản phẩm"></Empty>
      )}
    </>
  );
}
