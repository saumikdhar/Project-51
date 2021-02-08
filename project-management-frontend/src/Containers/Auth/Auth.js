import React, {useState} from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { updateObject } from "../../store/utility";

const Auth = (props) => {
    const [authForm, setAuthForm] = useState({
        email:  {
            type: "email",
            value: "",
            label: "Email Address",
            valid: false
        },
        password:{
            type: "password",
            value: "",
            label: "Password",
            valid: false
        }
    });

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(
                  event.target.value.trim(),
                  authForm[controlName].validation
                )
            })
        });
        setAuthForm(updatedControls);
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map(formElement => {
        return (
          <Input
            style={{display: 'none'}}
            key={formElement.id}
            elementType="input"
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
            changed={event => inputChangedHandler(event, formElement.id)}
            shouldValidate={formElement.config.validation}
          />
        );
    });

    let errorMessage = null;
    if (!authForm.email.valid || !authForm.password.valid) {
        errorMessage = <p>Email and password needs to be filled in</p>;
    }

    const submitHandler = event => {
        event.preventDefault();
    };

    return (
      <>
          <div className={classes.Auth}>
              <h1>Sign in</h1>
              <form onSubmit={submitHandler}>
                  {errorMessage}
                  {form}
                  <Button btnType="Submit">Submit</Button>
              </form>
          </div>
      </>
    );
}

export default Auth;
