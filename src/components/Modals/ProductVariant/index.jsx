import { Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createProductVariant,
  editProductVariant,
  getSpecificProduct,
  setProductVariant,
} from "redux/reducer/productSlice";

function ProductVariantModal({ visible, setVisible, id, variantState }) {
  const dispatch = useDispatch();
  const [form] = useForm();
  const handleCancel = () => {
    CloseForm();
  };

  const CloseForm = () => {
    setVisible(false);
    dispatch(setProductVariant(null));
    form.resetFields();
  };

  const GenerateData = (data) => {
    let dataToServer;
    //Khong co id nghia la tao moi
    if (!variantState.id) {
      dataToServer = {
        name: data.variantName,
        description: data.variantDescription,
        product_id: id,
        price: data.variantPrice,
      };
      //Co id tuc la chinh sua
    } else {
      dataToServer = {
        name: data.variantName,
        description: data.variantDescription,
        price: data.variantPrice,
      };
    }

    return dataToServer;
  };

  const handleCreateOrModifyVariant = (data) => {
    const dataToServer = GenerateData(data);
    if (data && !variantState.id) {
      dispatch(createProductVariant({ data: dataToServer, productID: id }));
      // console.log("tao moi", dataToServer);
    } else if (data && variantState.id) {
      // console.log("chinh sua", dataToServer);
      dispatch(
        editProductVariant({
          id: variantState.id,
          state: dataToServer,
          productID: id,
        })
      );
    }
    CloseForm();
    //Goi thang nay de rerender lai du lieu
    useDispatch(getSpecificProduct(id));
  };

  const handleOk = () => {
    const validation = form.validateFields();
    validation
      .then((data) => {
        handleCreateOrModifyVariant(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    console.log(variantState);
    form.resetFields();
  }, [variantState]);

  return (
    <>
      <Modal
        title="Chỉnh sửa biến thể"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            variantName: variantState?.name,
            variantDescription: variantState?.description,
            variantPrice: variantState?.price,
          }}
        >
          <div className="flex">
            <div className="w-1/2 mr-20">
              <div>
                <Form.Item
                  label="Tên biến thể"
                  name="variantName"
                  rules={[{ required: true, message: "Không được bỏ trống" }]}
                >
                  <Input placeholder="input placeholder" />
                </Form.Item>
              </div>
              <div className="">
                <Form.Item
                  label="Mô tả"
                  name="variantDescription"
                  rules={[{ required: true, message: "Không được bỏ trống" }]}
                >
                  <Input placeholder="Mô tả" />
                </Form.Item>
              </div>
            </div>

            <div className="w-1/2">
              <div></div>
              <div className="">
                <Form.Item
                  label="Giá (VND)"
                  name="variantPrice"
                  rules={[{ required: true, message: "Không được bỏ trống" }]}
                >
                  <InputNumber
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    min={0}
                    step={1000}
                    style={{ width: "50%" }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default ProductVariantModal;
