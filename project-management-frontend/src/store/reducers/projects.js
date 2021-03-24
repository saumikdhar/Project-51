import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const projectsReducerDefaultState = [];

const editProjectStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const editProjectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const editProjectFail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false
  });
};

export default (state = projectsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.project];

    case actionTypes.EDIT_PROJECT_START:
      return editProjectStart(state, action);
    case actionTypes.EDIT_PROJECT_SUCCESS:
      return editProjectSuccess(state, action);
    case actionTypes.EDIT_PROJECT_FAIL:
      return editProjectFail(state, action);

    default:
      return state;
  }
};
