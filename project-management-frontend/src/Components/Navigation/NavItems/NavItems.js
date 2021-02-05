import React from 'react';
import classes from './NavItems.module.css'
import NavItem from "./NavItem/NavItem";

export const NavItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/auth">Login</NavItem>
        </ul>
    );
};

export default NavItems;