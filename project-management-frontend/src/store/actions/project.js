import axios from '../../Axios/axios';
import * as actionTypes from '../actions/actionTypes';
import { backendUrl } from '../../shared/utility';
import React from 'react';

const _addProject = project => ({
  type: 'ADD_PROJECT',
  project
});

export const editProjectStart = () => {
  return {
    type: actionTypes.EDIT_PROJECT_START
  };
};

export const editProjectSuccess = projects => {
  return {
    type: actionTypes.EDIT_PROJECT_SUCCESS
  };
};

export const editProjectFail = error => {
  return {
    type: actionTypes.EDIT_PROJECT_FAIL,
    error: error
  };
};

export const createProject = projectData => {
  return dispatch => {
    const project = {
      name: projectData.name,
      managerName: projectData.managerName,
      projectStatus: projectData.projectStatus,
      quickWin: projectData.quickWin,
      projectType: projectData.projectType,
      questions: projectData.questions
    };

    return axios.post('/createProject', project).then(result => {
      dispatch(_addProject(result.data));
    });
  };
};

export const editProject = values => {
  return dispatch => {
    dispatch(editProjectStart());

    const url = 'http://localhost:8080/projects/edit';
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        projectName: values.projectName,
        managerName: values.managerName,
        projectStatus: values.projectStatus,
        projectSize: values.projectSize,
        quickWin: values.quickWin,
        projectType: values.projectType
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not edit the project');
        }
        console.log('edit is working');
        return res.json();
      })
      .then(resData => {
        dispatch(editProjectSuccess());
      })
      .catch(error => {
        dispatch(editProjectFail(error));
      });
  };
};
