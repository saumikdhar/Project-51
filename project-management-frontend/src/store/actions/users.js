import * as actionTypes from '../actions/actionTypes';
import { backendUrl } from '../../shared/utility';

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START
  };
};

export const getUserSuccess = users => {
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

export const getUsersSuccess = users => {
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
    type: actionTypes.ADD_USER_START
  };
};

export const addUserSuccess = users => {
  return {
    type: actionTypes.ADD_USER_SUCCESS
  };
};

export const addUserFail = error => {
  return {
    type: actionTypes.ADD_USER_FAIL,
    error: error
  };
};

export const editUserStart = () => {
  return {
    type: actionTypes.EDIT_USER_START
  };
};

export const editUserSuccess = users => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS
  };
};

export const editUserFail = error => {
  return {
    type: actionTypes.EDIT_USER_FAIL,
    error: error
  };
};

export const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START
  };
};

export const deleteUserSuccess = users => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS
  };
};

export const deleteUserFail = error => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error
  };
};

export const getUser = () => {
  return dispatch => {
    dispatch(getUserStart());

    const url = `${backendUrl()}/users/get`;
    const token = localStorage.getItem('token');
    const method = 'POST';
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not retrieve user!');
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
    dispatch(getUsersStart());

    const url = `${backendUrl()}/users/getAll`;
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token };

    fetch(url, {
      method: method,
      headers: header
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not retrieve users!');
        }
        return res.json();
      })
      .then(resData => {
        dispatch(getUsersSuccess(resData));
      })
      .catch(error => {
        dispatch(getUsersFail(error));
      });
  };
};

export const addUser = values => {
  return dispatch => {
    dispatch(addUserStart());

    const url = `${backendUrl()}/users/add`;
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not add user!');
        }
        return res.json();
      })
      .then(resData => {
        dispatch(getUsers());
        dispatch(addUserSuccess());
      })
      .catch(error => {
        dispatch(addUserFail(error));
      });
  };
};

export const editUser = values => {
  return dispatch => {
    dispatch(editUserStart());

    const url = 'http://localhost:8080/users/edit';
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not edit user!');
        }
        return res.json();
      })
      .then(resData => {
        dispatch(getUsers());
        dispatch(editUserSuccess());
      })
      .catch(error => {
        dispatch(editUserFail(error));
      });
  };
};

export const deleteUser = values => {
  return dispatch => {
    dispatch(deleteUserStart());

    const url = 'http://localhost:8080/users/delete';
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };
    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not edit user!');
        }
        return res.json();
      })
      .then(resData => {
        dispatch(getUsers());
        dispatch(deleteUserSuccess());
      })
      .catch(error => {
        dispatch(deleteUserFail(error));
      });
  };
};
