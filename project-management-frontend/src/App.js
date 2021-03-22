import './App.css';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import CreateProject from './Containers/CreateProject/CreateProject';
import Users from './Containers/Users/Users';
import AssignProjects from './Containers/AssignUsers/AssignUsers';
import Projects from './Containers/Projects/Projects';
import ProjectInfo from './Containers/ProjectInfo/ProjectInfo';
import ScoreBoard from './Containers/Scoreboard/Scoreboard';
import BusinessCase from './Containers/BusinessCase/BusinessCase';
import AdminActiveDash from './Containers/projectDash/project_dash.component';
import AdminPendingDash from './Containers/projectDash/project_dash_pending.component';
import AdminPendingReview from './Containers/projectDash/project_review.component';
import Layout from './hoc/Layout/Layout';
import ProjectSubmission from './Containers/CreateProject/ProjectSubmission/ProjectSubmission';


const App = props => {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/create-project/success" component={ProjectSubmission} />
      <Route path="/create-project" component={CreateProject} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthorise) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/create-project/success" component={ProjectSubmission} />
        <Route path="/create-project" component={CreateProject} />
        <Route path="/projects" component={Projects} />
        <Route path="/assign-projects" component={AssignProjects} />
        <Route path="/projectinfo/:id" component={ProjectInfo} />
        <Route path="/scoreboard/:id" component={ScoreBoard} />
        <Route path="/businessCase/:id" component={BusinessCase} />
        <Route path="/adminPendingDash" component={AdminPendingDash} />
        <Route path="/adminActiveDash" component={AdminActiveDash} />
        <Route path="/adminReviewProject/:id" component={AdminPendingReview} />
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
