import React from 'react';
import classes from './Toolbar.module.css'
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            {/*<DrawerToggle clicked={props.drawerToggleClicked}/>*/}
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <div className={classes.AppTitle}>
                Project Management
            </div>
            <nav className={classes.DesktopOnly}>
                <NavItems/>
            </nav>
        </header>
    );
};

export default Toolbar;