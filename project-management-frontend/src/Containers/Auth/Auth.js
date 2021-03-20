import React, { useState } from 'react';
import classes from './Auth.module.css';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import { updateObject } from '../../store/utility';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address'
      },
      label: 'Email Address',
      valid: false,
      value: ''
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      label: 'Password',
      valid: false,
      value: ''
    }
  });

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value.trim(), authForm[controlName].validation)
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
      isValid = value.trim() !== '' && isValid;
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
        style={{ display: 'none' }}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        label={formElement.config.label}
        changed={event => inputChangedHandler(event, formElement.id)}
        shouldValidate={formElement.config.validation}
      />
    );
  });

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error}</p>;
  }

  let authRedirect = null;

  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  const submitHandler = event => {
    event.preventDefault();
    if (authForm.email.valid && authForm.password.valid) {
      props.onAuth(authForm.email.value, authForm.password.value);
    } else {
      errorMessage = 'One of the fields is blank';
    }
  };

  return (
    <>
      <div className={classes.Auth}>
        {authRedirect}
        <h1>Sign in</h1>
        <form onSubmit={submitHandler}>
          {errorMessage}
          {form}

          {!props.loading && <Button btnType="Submit">Sign In</Button>}
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
