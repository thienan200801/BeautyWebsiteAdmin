import { Checkbox, Radio, Row } from "antd";
import React from "react";

function ProductCategoryItem({ category, eventHandler }) {
  let children = null;
  if (category.children) {
    children = category.children.map((child) => (
      <ProductCategoryItem key={child.id} category={child} />
    ));
  }

  return (
    <div className={`${category.parent_id ? "ml-6" : ""} mb-1`}>
      <Row key={category.id}>
        <Radio value={category.id}>{category.name}</Radio>
      </Row>
      {children}
    </div>
  );
}

export default ProductCategoryItem;
