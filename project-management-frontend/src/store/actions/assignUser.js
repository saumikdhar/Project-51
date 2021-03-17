import * as actionTypes from '../actions/actionTypes';

export const addProjectUserStart = () => {
  return {
    type: actionTypes.ADD_PROJECT_USER_START
  };
};

export const getProjectUserStart = () => {
  return {
    type: actionTypes.GET_PROJECT_USER_START
  };
};

export const removeProjectUserStart = () => {
  return {
    type: actionTypes.REMOVE_PROJECT_USER_START
  };
};

export const addProjectUserSuccess = users => {
  return {
    type: actionTypes.ADD_PROJECT_USER_SUCCESS,
    users: users
  };
};

export const getProjectUserSuccess = users => {
  return {
    type: actionTypes.GET_PROJECT_USER_SUCCESS,
    users: users
  };
};

export const setProjectUsers = users => {
  return {
    type: actionTypes.SET_PROJECT_USER,
    users: users
  };
};

export const removeProjectUserSuccess = users => {
  return {
    type: actionTypes.REMOVE_PROJECT_USER_SUCCESS,
    users: users
  };
};

export const addProjectUserFail = error => {
  return {
    type: actionTypes.ADD_PROJECT_USER_FAIL,
    error: error
  };
};

export const getProjectUserFail = error => {
  return {
    type: actionTypes.GET_PROJECT_USER_FAIL,
    error: error
  };
};

export const removeProjectUserFail = error => {
  return {
    type: actionTypes.REMOVE_PROJECT_USER_FAIL,
    error: error
  };
};

export const removeUserFromProject = (userId, projectId) => {
  return async dispatch => {
    dispatch(removeProjectUserStart());
    const url = 'http://localhost:8080/users/removeUserFromProject';
    const method = 'PATCH';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({
          projectId: projectId,
          userId: userId
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'unable to remove user');
      } else {
        // dispatch(getProjectUserSuccess(resData.users));
      }
    } catch (error) {
      dispatch(removeProjectUserFail(error));
    }
  };
};

export const getProjectUsers = projectId => {
  return async dispatch => {
    dispatch(getProjectUserStart());
    const url = 'http://localhost:8080/users/projectUsers';
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({
          projectId: projectId
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'unable to fetch');
      } else {
        dispatch(getProjectUserSuccess(resData.users));
      }
    } catch (error) {
      dispatch(getProjectUserFail(error.message));
    }
  };
};

export const addUserToProject = (listOfUserId, projectId) => {
  return async dispatch => {
    dispatch(addProjectUserStart());
    const url = 'http://localhost:8080/users/addUserToProject';
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({
          projectId: projectId,
          userId: listOfUserId
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to add users to project');
      } else {
        // dispatch(addProjectUserSuccess(resData.users));
      }
    } catch (error) {
      dispatch(addProjectUserFail(error));
    }
  };
};
