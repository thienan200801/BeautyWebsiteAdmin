import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

import Loader from "../components/Loader/Loader";
import { adminLogin } from "../redux/reducer/authSlice";

const imgUrl = "/img/login-bg.jpg";

const loginStyle = {
  backgroundImage: " url(" + imgUrl + ")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function Login() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const [state, setState] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };

  const togglePassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(adminLogin({ ...state }))
  }

  if (user)
    return <Redirect to="/home" />


  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 w-screen h-screen ">
      <div className="bg-gray-50 flex flex-col justify-between">
        <div>
          <div className="pt-10 w-full">
            <img width="200px" className="mx-auto" src="/drdongphuong-logo.png" alt="drdongphuong" />
          </div>
          <div className="mt-28 flex flex-col items-start px-6 w-full md:w-2/3 m-auto">
            <div className="flex flex-col  items-start sm:flex-row ">
              <h3 className=" text-3xl font-bold">Đăng nhập</h3>
              <span className="text-sm ml-1">quản trị viên</span>
            </div>
            <div className="w-full py-10">
              <form className=" m-auto mb-4">
                <div className="flex flex-col mb-3 text-sm ">
                  <label
                    htmlFor="username"
                    className="mb-2 text-left  text-gray-600  font-bold"
                  >
                    TÀI KHOẢN
                  </label>
                  <div className="relative">
                    <input
                      name="username"
                      id="username"
                      onChange={handleChange}
                      type="text"
                      placeholder="Tài khoản quản trị viên"
                      className=" relative w-full placeholder-blueGray-300  rounded focus:outline-none focus:ring-2 ring-blue-700 shadow placeholder-gray-400 p-3 border-0 border-gray-200 transition-all duration-200 ease-in-out "
                    />
                  </div>{" "}
                </div>

                <div className="flex flex-col  text-sm">
                  <label
                    htmlFor="password"
                    className="mb-2 text-left  text-gray-600  font-bold"
                  >
                    MẬT KHẨU
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      id="password"
                      type="password"
                      onChange={handleChange}
                      placeholder="Mật khẩu"
                      className=" relative w-full placeholder-blueGray-300  rounded focus:outline-none focus:ring-2 ring-blue-700 shadow placeholder-gray-400 p-3 border-0 border-gray-200 transition-all duration-200 ease-in-out "
                    />
                  </div>{" "}
                </div>
              </form>
              <p className="text-red-600">{error}</p>
              <Checkbox
                onChange={togglePassword}
                style={{ width: "100%", textAlign: "left" }}
              >
                Show password
              </Checkbox>
              {isLoading && <Loader />}
              {!isLoading && (
                <button
                  className="rounded-md w-full bg-blue-600 focus:outline-none border-transparent focus:ring-2 focus:ring-blue-800 focus:bg-blue-800 transition-all duration-200 py-3 mt-4 mb-2 text-white font-bold text-md  "
                  onClick={handleSubmit}
                >
                  Đăng nhập
                </button>
              )}
              <a
                href="#"
                className="text-sm block m-auto focus:text-blue-800 transition-all duration-150"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white w-full text-xs py-4 flex items-center justify-center">
          <span className="text-xs text-gray-400 mr-1 ">Copyright © 2021 </span>

          <a href="#" className="font-bold">
            drdongphuong
          </a>
        </div>
      </div>
      <div className="lg:flex hidden">
        <img
          src="/img/side-view-female-friends-applying-beauty-product (1).jpg"
          className="object-cover bg-no-repeat overflow-hidden w-full max-h-screen"
        />
      </div>
    </div>
  );
}
// style={loginStyle}
