import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false,
  scoreboard: null,
  actionNarrative: null,
  objectiveNarrative: null,
  riskNarrative: null
};

const scoreboardStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const editScoreboardStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const scoreboardSuccess = (state, action) => {
  return updateObject(state, {
    scoreboard: action.scoreboard,
    error: null,
    loading: false,
    riskNarrative: action.scoreboard.map(scoreboard => scoreboard.riskNarrative),
    objectiveNarrative: action.scoreboard.map(scoreboard => scoreboard.objectiveNarrative),
    actionNarrative: action.scoreboard.map(scoreboard => scoreboard.actionNarrative)
  });
};

const editObjectiveNarrativeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    objectiveNarrative: action.objectiveNarrative
  });
};

const editRiskNarrativeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    riskNarrative: action.riskNarrative
  });
};

const editActionNarrativeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    actionNarrative: action.actionNarrative
  });
};

const scoreboardFail = (state, action) => {
  return updateObject(state, { error: action.error.message, loading: false });
};

const editScoreboardFail = (state, action) => {
  return updateObject(state, { error: action.error.message, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCOREBOARD_START:
      return scoreboardStart(state, action);
    case actionTypes.GET_SCOREBOARD_SUCCESS:
      return scoreboardSuccess(state, action);
    case actionTypes.GET_SCOREBOARD_FAIL:
      return scoreboardFail(state, action);
    case actionTypes.EDIT_SCOREBOARD_START:
      return editScoreboardStart(state, action);
    case actionTypes.EDIT_ACTION_NARRATIVE_SUCCESS:
      return editActionNarrativeSuccess(state, action);
    case actionTypes.EDIT_OBJECTIVE_NARRATIVE_SUCCESS:
      return editObjectiveNarrativeSuccess(state, action);
    case actionTypes.EDIT_RISK_NARRATIVE_SUCCESS:
      return editRiskNarrativeSuccess(state, action);
    case actionTypes.EDIT_SCOREBOARD_FAIL:
      return editScoreboardFail(state, action);
    default:
      return state;
  }
};

export default reducer;
