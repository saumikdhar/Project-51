import * as actionTypes from "../actions/actionTypes";

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START
  };
};

export const getUserSuccess = (users) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    users: users
  };
};

export const getUserFail = error => {
  return {
    type: actionTypes.GET_USER_FAIL,
    error: error
  };
};

export const getUsersStart = () => {
  return {
    type: actionTypes.GET_USERS_START
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    users: users
  };
};

export const getUsersFail = error => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    error: error
  };
};

export const addUserStart = () => {
  return {
    type: actionTypes.GET_USERS_START
  };
};

export const addUserSuccess = (users) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS
  };
};

export const addUserFail = error => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    error: error
  };
};

export const getUser = () => {
  return dispatch => {
    dispatch(getUserStart());

    const url = "http://localhost:8080/users/get";
    const method = "POST";
    const header = {"Content-Type": "application/json"};


    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not retrieve user!");
        }
        return res.json();
      })
      .then(resData => {
        dispatch(getUserSuccess(resData.user));
      })
      .catch(error => {
        dispatch(getUserFail(error));
      });
  };
};

export const getUsers = () => {
  return dispatch => {
    console.log("START getUsers")
    dispatch(getUsersStart());

    const url = "http://localhost:8080/users/getAll";
    const method = "POST";
    const header = {"Content-Type": "application/json"};

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not retrieve users!");
        }
        console.log("res: ", res);
        return res.json();
      })
      .then(resData => {
        dispatch(getUsersSuccess(resData.users));
      })
      .catch(error => {
        dispatch(getUsersFail(error));
      });
  };
};

export const addUser = (firstName, surname, email, password, role) => {
  return dispatch => {
    dispatch(addUserStart());

    const url = "http://localhost:8080/users/add";
    const method = "POST";
    const header = {"Content-Type": "application/json"};


    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        firstName: firstName,
        surname: surname,
        email: email,
        password: password,
        role: role,
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not add user!");
        }
        return res.json();
      })
      .then(resData => {
        dispatch(addUserSuccess());
      })
      .catch(error => {
        dispatch(addUserFail(error));
      });
  };
};
