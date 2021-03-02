import './App.css';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import Users from './Containers/Users/Users';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import * as actions from './store/actions';
import AssignProjects from './Containers/AssignUsers/AssignUsers';
import Projects from './Containers/Projects/Projects';
import ProjectInfo from './Containers/ProjectInfo/ProjectInfo';
import ScoreBoard from './Containers/Scoreboard/Scoreboard';
import BusinessCase from './Containers/BusinessCase/BusinessCase';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

const App = props => {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthorise) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        {/*  all other possible ROUTES HERE*/}
        <Route path="/projects" component={Projects} />
        <Route path="/assign-projects" component={AssignProjects} />
        <Route exact path="/projectinfo/:id" component={ProjectInfo} />
        <Route exact path="/scoreboard/:id" component={ScoreBoard} />
        <Route exact path="/businessCase/:id" component={BusinessCase} />
        <Route path="/users" component={Users} />
        <Redirect to="/projects" />
      </Switch>
    );
  }

  return (
    <>
      <Layout />
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
