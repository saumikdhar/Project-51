//----------------------------------------------------------------------------------------------------------------------
// Import frontend functionality
import './App.css';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

//----------------------------------------------------------------------------------------------------------------------
// Import container classes
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import Users from './Containers/Users/Users';
import AssignProjects from './Containers/AssignUsers/AssignUsers';
import Projects from './Containers/Projects/Projects';
import ProjectInfo from './Containers/ProjectInfo/ProjectInfo';
import ScoreBoard from './Containers/Scoreboard/Scoreboard';
import BusinessCase from './Containers/BusinessCase/BusinessCase';
import AdminActiveDash from './Containers/projectDash/project_dash.component';
import AdminPendingDash from './Containers/projectDash/project_dash_pending.component';
import AdminPendingReview from './Containers/projectDash/project_review.component';

//----------------------------------------------------------------------------------------------------------------------
// Import layout and styling options
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

//----------------------------------------------------------------------------------------------------------------------
// Primary application
const App = props => {
  //--------------------------------------------------------------------------------------------------------------------
  // Tries automatic sign in on application load
  const { onTryAutoSignUp } = props;
  console.log('props', props);
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  //--------------------------------------------------------------------------------------------------------------------
  // Sets the application routes for non signed in users
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );

  //--------------------------------------------------------------------------------------------------------------------
  // Sets the application routes for authorised users
  if (props.isAuthorise) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
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

  // Return route options
  return (
    <>
      <Layout />
      {routes}
    </>
  );
};

//----------------------------------------------------------------------------------------------------------------------
// Set prop if user is authorised
const mapStateToProps = state => {
  return {
    isAuthorise: state.auth.token !== null
  };
};

//----------------------------------------------------------------------------------------------------------------------
// Attempts to sign user in automatically
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

// Exports application with props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
