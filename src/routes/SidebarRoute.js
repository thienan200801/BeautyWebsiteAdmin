import BannerManagement from "components/BanerManagement";
import BannerEditor from "components/BanerManagement/BannerEditor";
import productCategory from "components/Blog/Category/productCategory";
import Comment from "components/Comment";
import Dashboard from "components/Dashboard/Dashboard";
import GetNews from "components/GetNews";
import OrderList from "components/OrderManagement/index";
import OrderDetail from "components/OrderManagement/OrderDetail";
import Personal from "components/PersonalPage";
import ProductManagement from "components/ProductManagement";
import ProductEdtior from "components/ProductManagement/ProductEditor";
import SlideManagement from "components/SlideManagement";
import SlideEditor from "components/SlideManagement/SlideEditor";
import Testpage from "components/testpage";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import BlogManagement from "../components/Blog/BlogManagement/index";
import Categories from "../components/Blog/Category/Categories";
import Tag from "../components/Blog/Tag/Tag";
import MediaLibrary from "../components/Media/MediaLibrary";
import PrivateRoute from "./PrivateRoute";
export default function SidebarRoute() {

  return (
    <div>
      <Switch>
        <PrivateRoute path="/home/categories" component={Categories} />
        <PrivateRoute path="/home/comments" component={Comment} />
        <PrivateRoute path="/home/blogs" component={BlogManagement} />
        <PrivateRoute path="/home/tags" component={Tag} />
        <PrivateRoute path="/home/media-library" component={MediaLibrary} />
        <PrivateRoute exact path="/home/banner" component={BannerManagement} />
        <PrivateRoute path="/home/banner-editor/:id" component={BannerEditor} />
        <PrivateRoute path="/home/banner-editor/" component={BannerEditor} />
        <PrivateRoute path="/home/slide-editor/:slideId" component={SlideEditor} />
        <PrivateRoute path="/home/slide/" component={SlideManagement} />
        <PrivateRoute path="/home/product/category" component={productCategory} />
        <PrivateRoute path="/home/personal/" component={Personal} />
        <PrivateRoute path="/home/product" component={ProductManagement} />
        <PrivateRoute path="/home/product-editor/:id" component={ProductEdtior} />
        <PrivateRoute path="/home/product-editor/" component={ProductEdtior} />
        <PrivateRoute path="/home/test" component={Testpage} />
        <PrivateRoute exact path="/home/subscribe" component={GetNews} />
        <PrivateRoute path="/home/order/editor/:id" component={OrderDetail} />
        <PrivateRoute path="/home/order/editor" component={OrderDetail} />
        <PrivateRoute exact path="/home/order" component={OrderList} />
        <PrivateRoute exact path={["/", "/home"]} component={Dashboard} />
      </Switch>
    </div>
  );
}
