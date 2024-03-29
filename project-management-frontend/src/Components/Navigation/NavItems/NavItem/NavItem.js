import React from 'react';
import classes from './NgnItem.module.css'
import {NavLink} from "react-router-dom";

const NavItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.link} exact activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavItem;