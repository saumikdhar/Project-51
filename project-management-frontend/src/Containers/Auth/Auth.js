import React, {useState} from "react";
import classes from "./Auth.module.css";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";

const Auth = (props) => {
    const [authForm, setAuthForm] = useState({
        email:  {
            type: "email",
            value: ""
        },
        password:{
            type: "password",
            value: ""
        }
    })

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
            // changed={event => inputChangeHandler(event, formElement.id)}
          />
        );
    });

    const submitHandler = event => {
        event.preventDefault();
    };

    return (
      <Auxiliary>
          <div className={classes.Auth}>
              <h1>Sign in</h1>
              <form onSubmit={submitHandler}>
                  {form}
                  <Button btnType="Submit">Submit</Button>
              </form>
          </div>
      </Auxiliary>
    );
}

export default Auth;
