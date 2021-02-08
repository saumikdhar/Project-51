import "./App.css";
import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

const App = (props) => {

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/logout" component={Logout}/>
      <Redirect to="/"/>
    </Switch>
  );

  return (
    <>
      <Layout/>
      {routes}
    </>
  );
};

export default withRouter(App);
