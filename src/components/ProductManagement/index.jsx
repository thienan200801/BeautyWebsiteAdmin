import { Checkbox } from "antd";
import { Button, List, Select } from "antd";
import Search from "antd/lib/input/Search";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getProductCategories,
  getProducts,
  initProduct,
  setListImages,
  setProductEditing,
  setProductID,
  setProductVariant,
  setThumbnail,
} from "redux/reducer/productSlice";

import ProductCard from "./ProductCard";
const { Option } = Select;

function ProductManagement(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { products, productCategories } = useSelector((state) => state.product);
  const { isLoading } = useSelector((state) => state.loader);
  const [listProducts, setListProducts] = useState([]);
  const typingTimeoutRef = useRef(null);
  const [productsByCategory, setPproductsByCategory] = useState(products);
  const [productsByStock, setProductsByStock] = useState(products);
  const [productsBySearch, setProductsBySearch] = useState(products);

  const handleFilterCategory = (value) => {
    if (value === "all") {
      setPproductsByCategory(products);
    } else {
      const newListProducts = products.filter(
        (product) => product?.category?.name === value
      );
      setPproductsByCategory(newListProducts);
    }
  };

  const handleFilterStock = (value) => {
    if (value === "all") {
      setProductsByStock(products);
    } else if (value === "outStock") {
      const newListProducts = products.filter(
        (product) => product.is_in_stock === false
      );
      setProductsByStock(newListProducts);
    } else {
      const newListProducts = products.filter(
        (product) => product.is_in_stock === true
      );
      setProductsByStock(newListProducts);
    }
  };

  const handleSearching = (searchTerm) => {
    // console.log("value search ne", searchTerm);
    if (!searchTerm) {
      setProductsBySearch(products);
      return;
    }
    const newListProducts = products.filter((product) => {
      const productNameLowerCase = product.name.toLowerCase();
      if (productNameLowerCase.search(searchTerm) >= 0) {
        return product;
      }
    });
    setProductsBySearch(newListProducts);
  };

  const handleOnSearch = (searchTerm) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleSearching(searchTerm.target.value);
    }, 300);
  };

  const handleAddNewProduct = () => {
    history.push("/home/product-editor");
    dispatch(initProduct());
    dispatch(setThumbnail(null));
    dispatch(setListImages([]));
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductCategories());

    //Product ID dung trong viec tao variant. Reset lại giá trị để tránh vô tình dùng phải giá trị trước đó
    dispatch(setProductID(0));

    //Tương tự product ID ở trên.
    dispatch(setProductVariant(null));
    dispatch(initProduct());
  }, []);

  useEffect(() => {
    setListProducts(products);
    setPproductsByCategory(products);
    setProductsByStock(products);
    setProductsBySearch(products);
  }, [products]);

  useEffect(() => {
    //intersection of 3 arrays
    const productsByStockAndCategory = productsByStock.filter((product1) =>
      productsByCategory.some((product2) => product1.id === product2.id)
    );

    const result = productsByStockAndCategory.filter((product1) =>
      productsBySearch.some((product2) => product1.id === product2.id)
    );

    // console.log(result);
    setListProducts(result);
  }, [productsByCategory, productsBySearch, productsByStock]);

  return (
    <div className="w-5/6 m-auto">
      {/**title */}
      <div className="mb-5 flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <span className="mr-2">Tất cả sản phẩm</span>
          <span className="text-blue-500">{products?.length || "0"}</span>
        </div>
        {/* <div
          className="bg-blue-500 p-1 px-2 cursor-pointer text-white hover:bg-blue-800 hover:ring-blue-800  transition rounded duration-150"
        >
        </div> */}

        <Button
          type="primary"
          loading={isLoading}
          onClick={handleAddNewProduct}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <div className="border bg-white text-xs md:text-sm">
        {/*Header */}
        <div className="flex justify-between items-center p-4 font-medium">
          <div>Số lượng: {`${listProducts.length}`}</div>
          <div className="flex items-center w-56">
            <div className="mr-2 whitespace-nowrap">Danh mục:</div>
            <Select
              defaultValue="all"
              style={{ width: "100%" }}
              onChange={handleFilterCategory}
            >
              <Option value="all">Tất cả danh mục</Option>
              {(productCategories || []).map((category, index) => (
                <Option key={index} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center w-40">
            <div className="mr-2 whitespace-nowrap">Bộ lọc:</div>
            <Select
              defaultValue="all"
              style={{ width: "100%" }}
              onChange={handleFilterStock}
            >
              <Option value="all">Tất cả</Option>
              <Option value="outStock">Hết hàng</Option>
              <Option value="stock">Còn hàng</Option>
            </Select>
          </div>
          <div className="flex items-center w-56">
            <div className="mr-2">Search: </div>
            <Search
              onChange={handleOnSearch}
              placeholder="Tên sản phẩm"
              allowClear
              style={{ width: "100%" }}
            />
          </div>
        </div>
        {/**End header */}

        {/**sub header */}
        <div className="grid grid-cols-8 bg-blue-200 w-full p-1 text-gray-700 font-medium">
          <div className="col-span-3 mx-auto">Tên sản phẩm</div>
          <div className="col-span-2 mx-auto">Giá</div>
          <div className="col-span-3 mx-auto">Tình trạng</div>
        </div>
        {/**sub header end here */}

        <div className="bg-white">
          <List
            dataSource={listProducts}
            renderItem={(product) => (
              <ProductCard key={product.id} product={product} />
            )}
          ></List>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
