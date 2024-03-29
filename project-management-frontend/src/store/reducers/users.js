import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  user: null,
  users: [],
  error: null
};

const getUserStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const getUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false
  });
};

const getUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false
  });
};

const getUsersStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const getUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users.users,
    loading: false
  });
};

const getUsersFail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false
  });
};

const addUserStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const addUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const addUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false
  });
};

const editUserStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const editUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const editUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false
  });
};

const deleteUserStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const deleteUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const deleteUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_START:
      return getUserStart(state, action);
    case actionTypes.GET_USER_SUCCESS:
      return getUserSuccess(state, action);
    case actionTypes.GET_USER_FAIL:
      return getUserFail(state, action);

    case actionTypes.GET_USERS_START:
      return getUsersStart(state, action);
    case actionTypes.GET_USERS_SUCCESS:
      return getUsersSuccess(state, action);
    case actionTypes.GET_USERS_FAIL:
      return getUsersFail(state, action);

    case actionTypes.ADD_USER_START:
      return addUserStart(state, action);
    case actionTypes.ADD_USER_SUCCESS:
      return addUserSuccess(state, action);
    case actionTypes.ADD_USER_FAIL:
      return addUserFail(state, action);

    case actionTypes.EDIT_USER_START:
      return editUserStart(state, action);
    case actionTypes.EDIT_USER_SUCCESS:
      return editUserSuccess(state, action);
    case actionTypes.EDIT_USER_FAIL:
      return editUserFail(state, action);

    case actionTypes.DELETE_USER_START:
      return deleteUserStart(state, action);
    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAIL:
      return deleteUserFail(state, action);

    default:
      return state;
  }
};

export default reducer;
