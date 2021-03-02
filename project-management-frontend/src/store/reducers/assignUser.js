import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  error: null,
  loading: false,
  users: []
};

const projectUsersStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const projectUsersSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    users: action.users
  });
};

const setProjectUsersSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    user: action.users
  });
};

const projectUsersFail = (state, action) => {
  return updateObject(state, { error: action.error.message, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT_USER_START:
      return projectUsersStart(state, action);
    case actionTypes.REMOVE_PROJECT_USER_START:
      return projectUsersStart(state, action);
    case actionTypes.GET_PROJECT_USER_START:
      return projectUsersStart(state, action);

    case actionTypes.ADD_PROJECT_USER_SUCCESS:
      return projectUsersSuccess(state, action);
    case actionTypes.GET_PROJECT_USER_SUCCESS:
      return projectUsersSuccess(state, action);
    case actionTypes.REMOVE_PROJECT_USER_SUCCESS:
      return projectUsersSuccess(state, action);

    case actionTypes.ADD_PROJECT_USER_FAIL:
      return projectUsersFail(state, action);
    case actionTypes.REMOVE_PROJECT_USER_FAIL:
      return projectUsersFail(state, action);
    case actionTypes.GET_PROJECT_USER_FAIL:
      return projectUsersFail(state, action);

    case actionTypes.SET_PROJECT_USER:
      return setProjectUsersSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
