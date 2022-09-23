import Categories from "components/Blog/Category/Categories";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import BlogEditor from "../components/Blog/BlogEditor/index";
import Home from "../pages/index";
import Login from "../pages/login";
import PrivateRoute from "./PrivateRoute";



export default function AppRouter() {
  console.log("change route");
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/editor/:blogPath">
          <BlogEditor />
        </PrivateRoute>
        <Route path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
        <Route path="/test" component={Categories} />
      </Switch>
    </Router>
  )
}
