import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';
import { connect } from 'react-redux';

export const NavItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthorise && props.role === 'transformationTeam' ? (
        <NavItem link="/adminActiveDash">Project Dashboard</NavItem>
      ) : null}
      {props.isAuthorise && props.role !== 'employee' ? (
        <NavItem link="/assign-projects">Assign Projects</NavItem>
      ) : null}
      {props.isAuthorise && props.role === 'employee' ? (
        <NavItem link="/assign-projects">People on this project</NavItem>
      ) : null}
      {props.isAuthorise && props.role === 'transformationTeam' ? <NavItem link="/users">Users</NavItem> : null}
      {props.isAuthorise ? (
        <NavItem link="/logout">Logout</NavItem>
      ) : (
        <NavItem link="/auth">Login</NavItem>
      )}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    isAuthorise: state.auth.token !== null,
    role: state.auth.role
  };
};

export default connect(mapStateToProps)(NavItems);
