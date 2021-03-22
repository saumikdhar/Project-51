import * as actionTypes from '../actions/actionTypes';
import { backendUrl } from '../../shared/utility';

export const scoreboardStart = () => {
  return {
    type: actionTypes.GET_SCOREBOARD_START
  };
};

export const scoreboardSuccess = scoreboard => {
  return {
    type: actionTypes.GET_SCOREBOARD_SUCCESS,
    scoreboard: scoreboard
  };
};

export const scoreboardFail = error => {
  return {
    type: actionTypes.GET_SCOREBOARD_FAIL,
    error: error
  };
};

export const editScoreboardStart = () => {
  return {
    type: actionTypes.EDIT_SCOREBOARD_START
  };
};

export const editActionNarrativeSuccess = actionNarrative => {
  return {
    type: actionTypes.EDIT_ACTION_NARRATIVE_SUCCESS,
    actionNarrative: actionNarrative
  };
};

export const editObjectiveNarrativeSuccess = objectiveNarrative => {
  return {
    type: actionTypes.EDIT_OBJECTIVE_NARRATIVE_SUCCESS,
    objectiveNarrative: objectiveNarrative
  };
};

export const editRiskNarrativeSuccess = riskNarrative => {
  return {
    type: actionTypes.EDIT_RISK_NARRATIVE_SUCCESS,
    riskNarrative: riskNarrative
  };
};

export const editScoreboardFail = error => {
  return {
    type: actionTypes.EDIT_SCOREBOARD_FAIL,
    error: error
  };
};

export const getScoreboard = projectId => {
  return async dispatch => {
    dispatch(scoreboardStart());

    const url = `${backendUrl()}/scoreboards/getScoreBoard`;
    const method = 'POST';
    const header = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({ projectId: projectId })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(response.message || 'No scoreboard data found');
      }
      dispatch(scoreboardSuccess(resData.data));
    } catch (error) {
      dispatch(scoreboardFail(error));
    }
  };
};

export const updateObjectiveNarrative = (projectId, objectiveNarrative) => {
  return async dispatch => {
    dispatch(editScoreboardStart());

    const url = `${backendUrl()}/scoreboards/saveObjectiveNarrative`;
    const method = 'PATCH';
    const header = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({ objectiveNarrative: objectiveNarrative, projectId: projectId })
      });

      if (!response.ok) {
        throw new Error(response.message || 'Failed to update objective');
      }

      dispatch(editObjectiveNarrativeSuccess(objectiveNarrative));
    } catch (error) {
      dispatch(editScoreboardFail(error));
    }
  };
};

export const updateRiskNarrative = (projectId, riskNarrative) => {
  return async dispatch => {
    dispatch(editScoreboardStart());
    const url = `${backendUrl()}/scoreboards/saveRiskNarrative`;
    const method = 'PATCH';
    const header = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({ riskNarrative: riskNarrative, projectId: projectId })
      });

      if (!response.ok) {
        throw new Error(response.message || 'Failed to update risk');
      }

      dispatch(editRiskNarrativeSuccess(riskNarrative));
    } catch (error) {
      dispatch(editScoreboardFail(error));
    }
  };
};

export const updateActionNarrative = (projectId, actionNarrative) => {
  return async dispatch => {
    dispatch(editScoreboardStart());
    const url = `${backendUrl()}/scoreboards/saveActionNarrative`;
    const method = 'PATCH';
    const header = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({ actionNarrative: actionNarrative, projectId: projectId })
      });

      if (!response.ok) {
        throw new Error(response.message || 'Failed to update action narrative');
      }

      dispatch(editActionNarrativeSuccess(actionNarrative));
    } catch (error) {
      dispatch(editScoreboardFail(error));
    }
  };
};
