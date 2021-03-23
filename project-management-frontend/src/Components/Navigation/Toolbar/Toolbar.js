import React from 'react';
import classes from './Toolbar.module.css'
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import {connect} from "react-redux";

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            {/*<DrawerToggle clicked={props.drawerToggleClicked}/>*/}
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <div className={classes.AppTitle}>
              {!props.role ? 'Project Management' : props.role}
            </div>
            <nav className={classes.DesktopOnly}>
                <NavItems/>
            </nav>
        </header>
    );
};
const mapStateToProps = state => {
  return {
    role: state.auth.role
  };
};
export default connect(mapStateToProps)(Toolbar);