import "./App.css";
import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router";
import Auxiliary from "./hoc/Auxiliary/Auxiliary";
import Layout from "./hoc/Layout/Layout";
import Auth from "./Containers/Auth/Auth";

const App = (props) => {

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}/>
      <Redirect to="/"/>
    </Switch>
  );

  return (
    <Auxiliary>
      <Layout/>
      {routes}
    </Auxiliary>
  );
};

export default withRouter(App);
