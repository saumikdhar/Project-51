import * as actionTypes from "../actions/actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, role) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    role: role
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    const url = "http://localhost:8080/auth/login";
    const method = "POST";
    const header = {"Content-Type": "application/json"};


    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        } else if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        dispatch(authSuccess(resData.token, resData.userId, resData.role));
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("role", resData.role);
        console.log("resData: ", resData);
        console.log("token is now", localStorage.getItem("token"));
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        dispatch(checkAuthTimeout(remainingMilliseconds));
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expiryDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("role");
        dispatch(authSuccess(token, userId, userRole));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime())
          )
        );
      }
    }
  };
};
