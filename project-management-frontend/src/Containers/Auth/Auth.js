import React, {useState} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from "./Auth.module.css";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

const Auth = (props) => {
    const [userForm, setUserForm] = useState({
        email: "",
        password: ""
    })

    const submitHandler = event => {
        event.preventDefault();
    };

    return (
        <Auxiliary>
            <div className={classes.Auth}>
                <h1>Login page</h1>
            </div>
        </Auxiliary>
    );
}

export default (Auth);
