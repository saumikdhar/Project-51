import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";
import { connect } from "react-redux";

export const NavItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthorise ? <NavItem link="/logout">Logout</NavItem>: <NavItem link="/auth">Login</NavItem>}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    isAuthorise: state.auth.token !== null
  };
};


export default connect(mapStateToProps)(NavItems);