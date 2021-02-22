import "./App.css";
import { withRouter, Switch, Route, Redirect } from "react-router";
import Layout from "./hoc/Layout/Layout";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
import Users from "./Containers/Users/Users";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import * as actions from "./store/actions";
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

const App = (props) => {
  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/users" component={Users}/>
      <Redirect to="/"/>
    </Switch>
  );

  if (props.isAuthorise) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout}/>
        <Route path="/users" component={Users}/>
        {/*  all other possible ROUTES HERE*/}
        <Redirect to="/projects"/>
      </Switch>
    );
  }

  return (
    <>
      <Layout/>
      {routes}
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthorise: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
