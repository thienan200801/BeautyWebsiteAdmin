import { Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";

import CustomSwitch from "./CustomSwitch";
import TextEditor from "./TextEditor";

function ProductInformation({ productInfor, form }) {
  const [isOnSale, setIsOnSale] = useState(productInfor?.is_on_sale);

  const [finalPrice, setFinalPrice] = useState(0);

  const handleFormChange = (fieldChange) => {
    if (
      fieldChange[0].name == "ordinaryPrice" ||
      fieldChange[0].name == "discount" ||
      fieldChange[0].name == "maxDiscount"
    ) {
      calculateFinalPrice();
      // console.log(finalPrice);
    }
  };

  const calculateFinalPrice = () => {
    const oridnaryPrice = form.getFieldValue("ordinaryPrice");
    const discount = form.getFieldValue("discount");
    const maxDiscount = form.getFieldValue("maxDiscount");
    const saleAmount = oridnaryPrice * (discount / 100.0);
    const finalDiscount = saleAmount >= maxDiscount ? maxDiscount : saleAmount;
    const finalPrice = oridnaryPrice - finalDiscount;
    setFinalPrice(finalPrice);
  };

  useEffect(() => {
    calculateFinalPrice();
  }, [productInfor]);

  if (!productInfor) {
    return null;
  }

  return (
    <>
      <div className="bg-white py-4 px-6 mb-3">
        <div className="font-medium border-b pb-2">
          <div>Thông tin sản phẩm</div>
        </div>

        <Form
          onFieldsChange={handleFormChange}
          form={form}
          layout="vertical"
          className="py-2"
          style={{ paddingTop: "10px" }}
        >
          <div className="flex">
            <Form.Item
              initialValue={productInfor?.name}
              label="Tên sản phẩm"
              name="productName"
              required
              style={{ width: "65%" }}
            >
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>

            <div className="ml-10">
              <Form.Item
                name="isInStock"
                label={<div className="hidden">Con hang</div>}
                initialValue={productInfor?.is_in_stock}
              >
                <CustomSwitch title={"Còn hàng"} />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            required
            initialValue={productInfor?.description}
            label="Mô tả ngắn"
            name="shortDescription"
            style={{ width: "65%" }}
          >
            <Input.TextArea placeholder="Mô tả sản phẩm" rows={4} />
          </Form.Item>

          <Form.Item
            label="Giá (VND)"
            name="ordinaryPrice"
            required
            initialValue={productInfor?.price}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="1.000"
              style={{ width: "120px", marginRight: "10px" }}
              min={0}
              step={1000}
            />
          </Form.Item>

          <div className="flex w-3/5 justify-between">
            <Form.Item name="isOnSale" initialValue={productInfor?.is_on_sale}>
              <CustomSwitch setNewChange={setIsOnSale} title={"Khuyến mãi"} />
            </Form.Item>

            <Form.Item
              name="isDealOfTheWeek"
              initialValue={productInfor?.deal_of_week}
            >
              <CustomSwitch title={"Deal of the week"} />
            </Form.Item>
          </div>

          {isOnSale && (
            <div className="flex justify-between">
              <Form.Item
                name="discount"
                label="Giảm giá (%)"
                required
                //Vi discount get ve co gia tri tu 0->1
                initialValue={productInfor?.discount * 100 || 0}
              >
                <InputNumber
                  min={0}
                  max={100}
                  step={1}
                  placeholder="10"
                  style={{ width: "120px", marginRight: "10px" }}
                />
              </Form.Item>

              <Form.Item
                name="maxDiscount"
                label="Tối đa (VND)"
                initialValue={productInfor?.maxDiscount || 0}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="1.000"
                  style={{ width: "120px", marginRight: "10px" }}
                  min={0}
                  step={1000}
                />
              </Form.Item>

              <Form.Item label="Giá mới (VND)">
                <InputNumber
                  value={finalPrice}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="1.000"
                  style={{ width: "120px", marginRight: "10px" }}
                  step={1000}
                />
              </Form.Item>
            </div>
          )}
          <Form.Item
            name="content"
            label="Nội dung sản phẩm"
            initialValue={productInfor?.content}
          >
            <TextEditor />
          </Form.Item>
          <Form.Item
            name="manualInfor"
            label="Hướng dẫn sử dụng"
            initialValue={productInfor?.manual_infor}
          >
            <TextEditor />
          </Form.Item>
          <Form.Item
            name="brandInfor"
            label="Về thương hiệu"
            initialValue={productInfor?.brand_infor}
          >
            <TextEditor />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default ProductInformation;
