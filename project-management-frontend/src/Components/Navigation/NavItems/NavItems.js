import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";
import { connect } from "react-redux";

export const NavItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthorise ? <NavItem link="/logout">Logout</NavItem>: <NavItem link="/auth">Login</NavItem>}

      {/*follow the example below for employees, managers, Transformation Team and It Dep*/}
      {/*{props.role === 'employee' ? 'Nav item all the employee links' :null}*/}
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