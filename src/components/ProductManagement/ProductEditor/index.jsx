// import Category from "components/Blog/BlogEditor/Category";
import { Button, Checkbox, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductCategories,
  getSpecificProduct,
  initProduct,
} from "redux/reducer/productSlice";

import ProductCategory from "./ProductCategory";
import ProductImages from "./ProductImage";
import ProductInformation from "./ProductInformation";
import ProductVariants from "./ProductVariants";
import Thumbnail from "./Thumbnail";

export default function ProductEdtior({ history }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading } = useSelector((state) => state.loader);

  const {
    productEditing,
    productCategories,
    productThumbnail,
    productImages,
    productID,
  } = useSelector((state) => state.product);

  // dung cho publish san pham
  const [isPublish, setIsPublish] = useState(productEditing?.is_publish);

  const [productCategory, setProductCategory] = useState(
    productEditing?.category_id
  );

  const [variantVisiblity, setVariantVisiblity] = useState(
    productEditing?.variants
  );

  //Khi an save, thi sate nay bang true. Dung kiem tra khi an cancel.
  const [isSaved, setIsSaved] = useState(false);

  const GenerateAllData = () => {
    const productInformation = form.getFieldsValue();
    // console.log(productInformation);

    let dataToServer = {
      name: productInformation.productName,
      description: productInformation.shortDescription,
      category_id: productCategory,
      media: productImages,
      thumbnail: productThumbnail,
      price: productInformation.ordinaryPrice,
      is_on_sale: productInformation.isOnSale,
      //discount from 0 -> 1 only
      discount: productInformation.isOnSale
        ? productInformation.discount / 100
        : 0,
      maxDiscount: productInformation.isOnSale
        ? productInformation.maxDiscount
        : 0,
      SKU: "string",
      is_track_inventory: true,
      is_in_stock: productInformation.isInStock,
      is_publish: isPublish,
      brand: "",
      shipping_infor: "string",
      return_infor: "string",
      manual_infor: productInformation.manualInfor,
      content: productInformation.content,
      brand_infor: productInformation.brandInfor,
      deal_of_week: productInformation.isDealOfTheWeek,
    };

    return dataToServer;
  };

  function ValidatingData(data) {
    return new Promise(function (resolve, reject) {
      if (!data.name) {
        reject("Vui lòng điền tên sản phẩm");
      }
      if (!data.thumbnail) {
        reject("Vui lòng thêm thumbnail");
      }
      if (!data.price) {
        reject("Vui lòng thêm giá sản phẩm");
      }
      if (!data.description) {
        reject("Vui lòng thêm mô tả sản phẩm");
      }

      resolve(data);
    });
  }

  const CreateOrModifyData = (data) => {
    if (id || productID) {
      dispatch(editProduct({ id: productID, state: data }));
      // console.log("edit ne", productID);
    } else {
      dispatch(createProduct(data));
      // console.log("tao moi ne");
    }
  };

  const handleOnSaveData = () => {
    const data = GenerateAllData();
    console.log("data ne", data);
    setIsSaved(true);
    const validatation = ValidatingData(data);
    validatation
      .then((data) => {
        CreateOrModifyData(data);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  //Cai nay ko co push route ne. Danh cho viec tao variant
  const CreateDataWhenCreateVariant = () => {
    const data = GenerateAllData();
    const validatation = ValidatingData(data);
    validatation
      .then((data) => {
        CreateOrModifyData(data);
        setVariantVisiblity(true);
        console.log(data);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleOnClickCanceling = () => {
    history.push("/home/product");
    //Khong co ID tu route la tao moi
    if (!id) {
      // Khi chua click save thi co the bi xoa data.
      if (!isSaved) {
        // Tao bien the san pham se sinh ra productID. Neu cancel trong khi tao moi san pham thi xoa luon san pham do
        if (productID) {
          dispatch(deleteProduct(productID));
        }
      }
    }
  };

  const handleCreateVariantBox = () => {
    if (!id) {
      CreateDataWhenCreateVariant();
    }
  };

  useEffect(() => {
    dispatch(getProductCategories());

    if (id) {
      dispatch(getSpecificProduct(id));
    } else {
      dispatch(initProduct());
    }
  }, []);

  useEffect(() => {
    setIsPublish(productEditing?.is_publish);
    //Neu chua co variant thi hien thi kieu khac, neu co variant roi thi hien thi khac.
    setVariantVisiblity(productEditing?.variants);

    setProductCategory(
      productEditing?.category_id
        ? productEditing?.category_id
        : productCategories[0]?.id
    );
  }, [productEditing, productCategories]);

  if (!productEditing) {
    return null;
  }

  return (
    <div className="w-5/6 m-auto">
      <div className="mx-2">
        <Link to="/home/product/" className="underline">
          Tất cả sản phẩm
        </Link>
        {` > `}
        {id ? productEditing?.name : "Untitle product"}
      </div>

      <div className="flex justify-between mb-4 mx-2">
        <div className="text-2xl font-semibold">
          {id ? productEditing?.name : "Untitle product"}
        </div>
        <div className="flex gap-3">
          {/* Khi tao moi thi ko co ID. Tao moi thi cancel */}
          {!id && (
            <Button loading={isLoading} onClick={handleOnClickCanceling}>
              Quay lại
            </Button>
          )}

          {/* Khi chinh sua thi co ID. Chinh sua thi back */}
          {id && (
            <Button loading={isLoading} onClick={handleOnClickCanceling}>
              Quay lại
            </Button>
          )}
          <Button loading={isLoading} onClick={handleOnSaveData} type="primary">
            Lưu thông tin
          </Button>
        </div>
      </div>

      <div className="flex">
        <div className="w-3/4 text-base">
          <Thumbnail thumbnail={productEditing?.thumbnail} />
          <ProductImages images={productEditing?.media} />
          <ProductInformation productInfor={productEditing} form={form} />
          {!variantVisiblity && (
            <div className="bg-white px-5 py-3  ">
              <div
                onClick={handleCreateVariantBox}
                className="text-sm font-semibold text-blue-500 underline hover:text-gray-800 cursor-pointer inline-block"
              >
                Quản lý biến thể sản phẩm
              </div>
              <div className="text-xs italic text-gray-500">
                Nên điền các thông tin trên trước khi tạo biến thể
              </div>
            </div>
          )}
          {variantVisiblity && (
            <ProductVariants variants={productEditing?.variants} />
          )}{" "}
        </div>
        <div className="w-1/4 text-base ml-3">
          <div className="bg-white py-4 px-6 mb-3 font-medium justify-center flex">
            <Checkbox
              checked={isPublish}
              onChange={(e) => {
                console.log();
                setIsPublish(e.target.checked);
              }}
            >
              Hiển thị sản phẩm
            </Checkbox>
          </div>
          <ProductCategory
            productCategory={productCategory}
            setProductCategory={setProductCategory}
            basedCategories={productCategories}
          />
        </div>
      </div>
    </div>
  );
}
