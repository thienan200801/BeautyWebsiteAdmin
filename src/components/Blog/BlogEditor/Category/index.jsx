import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "redux/reducer/categorySlice";

import CheckBoxCategoryItem from "./CheckBoxCategoryItem";

export default function Category({ selectedCategories, ...props }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div className="max-w-xs">
      <Checkbox.Group
        className="w-full"
        onChange={props.onChange}
        defaultValue={selectedCategories}
      >
        {categories &&
          categories.length > 0 &&
          categories.map((option) => (
            <CheckBoxCategoryItem key={option.id} category={option} />
          ))}
      </Checkbox.Group>
    </div>
  );
}
