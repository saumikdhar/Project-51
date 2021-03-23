import React from 'react';
import classes from './Layout.module.css'
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";

const Layout = (props) => {
    return (
        <>
            {/*sidebar here if needed*/}
            <Toolbar/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    )
}

export default Layout;