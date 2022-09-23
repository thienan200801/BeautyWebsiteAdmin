import { Checkbox, Row } from "antd";
import React from "react";

function CheckBoxCategoryItem({ category }) {
  let children = null;
  if (category.children) {
    children = category.children.map((child) => (
      <CheckBoxCategoryItem key={child.id} category={child} />
    ));
  }

  return (
    <div className={`${category.parent_id ? "ml-6" : ""}`}>
      <Row key={category.id}>
        <Checkbox value={category.id}>{category.name}</Checkbox>
      </Row>
      {children}
    </div>
  );
}

export default CheckBoxCategoryItem;
