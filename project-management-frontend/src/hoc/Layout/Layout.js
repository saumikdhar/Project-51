import React from 'react';
import classes from './Layout.module.css'
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";

const Layout = (props) => {
    return (
        <Auxiliary>
            {/*sidebar here if needed*/}
            <Toolbar/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )
}

export default Layout;