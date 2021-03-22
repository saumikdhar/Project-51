import React, { useState, useEffect, useRef } from 'react';
import classes from './Scoreboard.module.css';
import Button from '../../Components/UI/Button/Button';
import { Helmet } from 'react-helmet';
import { ResponsiveBar } from '@nivo/bar';
import useOnClickOutside from '../../Components/UI/OnClickOutside/OnClickOutside';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {
  updateActionNarrative,
  updateObjectiveNarrative,
  updateRiskNarrative
} from '../../store/actions/index';
import SavedMessage from '../../Components/UI/SavedMessage/SavedMessage';

const ScoreBoard = props => {
  const [editRiskNarrative, setEditRiskNarrative] = useState(false);
  const [editObjectiveNarrative, setEditObjectiveNarrative] = useState(false);
  const [editActionNarrative, setEditActionNarrative] = useState(false);
  const [actionNarrative, setActionNarrative] = useState(null);
  const [objectiveNarrative, setObjectiveNarrative] = useState(null);
  const [riskNarrative, setRiskNarrative] = useState(null);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const actionRef = useRef(null);
  const objectiveRef = useRef(null);
  const riskRef = useRef(null);
  useOnClickOutside(actionRef, () => saveActionNarrativeHandler());
  useOnClickOutside(objectiveRef, () => saveObjectiveNarrativeHandler());
  useOnClickOutside(riskRef, () => saveRiskNarrativeHandler());

  const {
    getScoreboard,
    updateObjectiveNarrative,
    updateRiskNarrative,
    updateActionNarrative
  } = props;
  const projectId = props.location.pathname.split('/').pop(-1);

  const countHandler = (scoreboardData, processType, narrativeType) => {
    let count;
    {
      narrativeType === 'actions' &&
        scoreboardData.map(scoreboard =>
          scoreboard.actions.map(action => {
            if (action.type === processType) {
              return (count = action.count);
            }
            return count;
          })
        );
    }
    {
      narrativeType === 'objectives' &&
        scoreboardData.map(scoreboard =>
          scoreboard.objectives.map(objective => {
            if (objective.type === processType) {
              return (count = objective.count);
            }
            return count;
          })
        );
    }
    {
      narrativeType === 'risks' &&
        scoreboardData.map(scoreboard =>
          scoreboard.risks.map(risk => {
            if (risk.type === processType) {
              return (count = risk.count);
            }
            return count;
          })
        );
    }
    return count;
  };

  let riskData = [];
  let objectiveData = [];
  let actionData = [];
  let nivoBarData = [];
  const loading = <Spinner />;

  if (props.scoreboard) {
    riskData = [
      {
        tasks: 'Tasks',
        'In Control':
          countHandler(props.scoreboard, 'In Control', 'risks') === undefined
            ? 0
            : countHandler(props.scoreboard, 'In Control', 'risks'),
        'In ControlColor': 'hsl(42, 70%, 50%)',
        'Out of control':
          countHandler(props.scoreboard, 'Out Of Control', 'risks') === undefined
            ? 0
            : countHandler(props.scoreboard, 'Out Of Control', 'risks'),
        'Out of controlColor': 'hsl(85, 70%, 50%)',
        Critical:
          countHandler(props.scoreboard, 'Critical', 'risks') === undefined
            ? 0
            : countHandler(props.scoreboard, 'Critical', 'risks'),
        CriticalColor: 'hsl(164, 70%, 50%)'
      }
    ];

    objectiveData = [
      {
        tasks: 'Tasks',
        'In Progress':
          countHandler(props.scoreboard, 'In Progress', 'objectives') === undefined
            ? 0
            : countHandler(props.scoreboard, 'In Progress', 'objectives'),
        'In ProgressColor': 'hsl(42, 70%, 50%)',
        Met:
          countHandler(props.scoreboard, 'Met', 'objectives') === undefined
            ? 0
            : countHandler(props.scoreboard, 'Met', 'objectives'),
        MetColor: 'hsl(85, 70%, 50%)',
        'Not Met':
          countHandler(props.scoreboard, 'Not Met', 'objectives') === undefined
            ? 0
            : countHandler(props.scoreboard, 'Not Met', 'objectives'),
        'Not MetColor': 'hsl(85, 70%, 50%)'
      }
    ];

    actionData = [
      {
        tasks: 'Tasks',
        'In Progress':
          countHandler(props.scoreboard, 'In Progress', 'actions') === undefined
            ? 0
            : countHandler(props.scoreboard, 'In Progress', 'actions'),
        'In ProgressColor': 'hsl(42, 70%, 50%)',
        Completed:
          countHandler(props.scoreboard, 'Completed', 'actions') === undefined
            ? 0
            : countHandler(props.scoreboard, 'Completed', 'actions'),
        CompletedColor: 'hsl(85, 70%, 50%)',
        Late:
          countHandler(props.scoreboard, 'Late', 'actions') === undefined
            ? 0
            : countHandler(props.scoreboard, 'Late', 'actions'),
        LateColor: 'hsl(32,70%,50%)',
        'Not Started':
          countHandler(props.scoreboard, 'Not Started', 'actions') === undefined
            ? 0
            : countHandler(props.scoreboard, 'Not Started', 'actions'),
        'Not StartedColor': 'hsl(85, 70%, 50%)'
      }
    ];

    nivoBarData = [
      {
        type: actionData,
        Narrative: 'Action Narrative',
        keys: ['In Progress', 'Completed', 'Late', 'Not Started']
      },
      {
        type: riskData,
        Narrative: 'Risk Narrative',
        keys: ['In Control', 'Out of control', 'Critical']
      },
      {
        type: objectiveData,
        Narrative: 'Objective Narrative',
        keys: ['In Progress', 'Met', 'Not Met']
      }
    ];
  }

  useEffect(() => {
    getScoreboard(projectId);
    setActionNarrative(props.actionNarrative);
    setRiskNarrative(props.riskNarrative);
    setObjectiveNarrative(props.objectiveNarrative);
  }, []);

  const showSavedMessageHandler = () => {
    setShowSavedMessage(true);
    setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowSavedMessage(false);
    }, 3000);
  };

  const saveActionNarrativeHandler = () => {
    setEditActionNarrative(false);
    if (actionNarrative && actionNarrative.length !== 0) {
      updateActionNarrative(projectId, actionNarrative);
      showSavedMessageHandler();
    }
  };

  const saveObjectiveNarrativeHandler = () => {
    setEditObjectiveNarrative(false);
    if (objectiveNarrative && objectiveNarrative.length !== 0) {
      updateObjectiveNarrative(projectId, objectiveNarrative);
      showSavedMessageHandler();
    }
  };

  const saveRiskNarrativeHandler = () => {
    setEditRiskNarrative(false);
    if (riskNarrative && riskNarrative.length !== 0) {
      updateRiskNarrative(projectId, riskNarrative);
      showSavedMessageHandler();
    }
  };

  const saveData = <SavedMessage />;

  return (
    <div className={classes.Scoreboard}>
      <Helmet>
        <style>{'body { background-color: rgba(242, 242, 242, 1) }'}</style>
      </Helmet>
      <Button clicked={props.history.goBack} style={{ marginLeft: '30px' }} btnType="Back">
        &lt; Back
      </Button>
      <br />
      <br />
      <h1>Project Scoreboard</h1>
      {showSavedMessage && saveData}
      <div className={classes.Wrapper}>
        <div className={classes.RagChart}>
          {nivoBarData.map(data => (
            <div style={{ height: '230px' }}>
              <h3>{data.Narrative}</h3>
              {console.log(data.type)}
              <ResponsiveBar
                data={data.type}
                keys={data.keys}
                indexBy="tasks"
                margin={{ top: 20, right: 10, bottom: 130, left: 10 }}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                fill={[
                  {
                    match: {
                      id: 'In Control'
                    },
                    id: 'lines'
                  }
                ]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Tasks',
                  legendPosition: 'middle',
                  legendOffset: 32
                }}
                axisLeft={null}
                labelTextColor={{ from: 'color', modifiers: [['darker', '1.6']] }}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 45,
                    translateY: 75,
                    itemsSpacing: 10,
                    itemWidth: 130,
                    itemHeight: 27,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
                animate={false}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={classes.RagChart}>
        <div style={{ height: '230px' }}>
          <h3>Something else</h3>
        </div>
      </div>
      {editActionNarrative ? (
        <textarea
          ref={actionRef}
          className={classes.TextArea}
          spellCheck={true}
          onChange={e => setActionNarrative(e.target.value.trim())}
          defaultValue={props.actionNarrative}
        />
      ) : (
        <div onClick={() => setEditActionNarrative(true)} className={classes.Narrative}>
          <h3>Action Narrative</h3>
          {!props.actionNarrative || (props.actionNarrative.length === 0 && 'Add some text')}
          {props.actionNarrative}
        </div>
      )}
      {editObjectiveNarrative ? (
        <textarea
          ref={objectiveRef}
          className={classes.TextArea}
          spellCheck={true}
          onChange={e => setObjectiveNarrative(e.target.value.trim())}
          defaultValue={props.objectiveNarrative}
        />
      ) : (
        <div onClick={() => setEditObjectiveNarrative(true)} className={classes.Narrative}>
          <h3>Objective Narrative</h3>
          {!props.objectiveNarrative || (props.objectiveNarrative.length === 0 && 'Add some text')}
          {props.objectiveNarrative}
        </div>
      )}
      {editRiskNarrative ? (
        <textarea
          ref={riskRef}
          className={classes.TextArea}
          spellCheck={true}
          onChange={e => setRiskNarrative(e.target.value.trim())}
          defaultValue={props.riskNarrative}
        />
      ) : (
        <div onClick={() => setEditRiskNarrative(true)} className={classes.Narrative}>
          <h3>Risk Narrative</h3>
          {!props.riskNarrative || (props.riskNarrative.length === 0 && 'Add some text')}
          {props.riskNarrative}
        </div>
      )}
      <br />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.scoreboard.loading,
    error: state.scoreboard.error,
    scoreboard: state.scoreboard.scoreboard,
    actionNarrative: state.scoreboard.actionNarrative,
    riskNarrative: state.scoreboard.riskNarrative,
    objectiveNarrative: state.scoreboard.objectiveNarrative
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getScoreboard: projectId => dispatch(actions.getScoreboard(projectId)),
    updateActionNarrative: (projectId, actionNarrative) =>
      dispatch(actions.updateActionNarrative(projectId, actionNarrative)),
    updateRiskNarrative: (projectId, riskNarrative) =>
      dispatch(actions.updateRiskNarrative(projectId, riskNarrative)),
    updateObjectiveNarrative: (projectId, objectiveNarrative) =>
      dispatch(actions.updateObjectiveNarrative(projectId, objectiveNarrative))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);
