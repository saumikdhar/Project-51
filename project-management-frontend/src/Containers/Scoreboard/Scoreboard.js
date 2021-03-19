import React, { useState, useEffect, useRef } from 'react';
import { backendUrl } from '../../store/utility';
import classes from './Scoreboard.module.css';
import Button from '../../Components/UI/Button/Button';
import { Helmet } from 'react-helmet';
import { ResponsiveBar } from '@nivo/bar';
import useOnClickOutside from '../../Components/UI/OnClickOutside/OnClickOutside';

const ScoreBoard = props => {
  const [scoreboard, setScoreBoard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [riskData, setRiskData] = useState([]);
  const [objectiveData, setObjectiveData] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [editRiskNarrative, setEditRiskNarrative] = useState(false);
  const [editObjectiveNarrative, setEditObjectiveNarrative] = useState(false);
  const [editActionNarrative, setEditActionNarrative] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => saveActionNarrativeHandler());
  useOnClickOutside(ref, () => saveObjectiveNarrativeHandler());
  useOnClickOutside(ref, () => saveRiskNarrativeHandler());

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

  const setUpScoreboardData = scoreboardData => {
    const riskData = {
      tasks: 'Tasks',
      'In Control': scoreboardData.map(scoreboard =>
        scoreboard.risks.map(risk => risk.type === 'In Control' && risk.count)
      ),
      'In ControlColor': 'hsl(42, 70%, 50%)',
      'Out of control': scoreboardData.map(scoreboard =>
        scoreboard.risks.map(risk => risk.type === 'Out of control' && risk.count)
      ),
      'Out of controlColor': 'hsl(85, 70%, 50%)',
      Critical: scoreboardData.map(scoreboard =>
        scoreboard.risks.map(risk => risk.type === 'Critical' && risk.count)
      ),
      CriticalColor: 'hsl(164, 70%, 50%)'
    };

    const objectiveData = {
      tasks: 'Tasks',
      'In Progress': countHandler(scoreboardData, 'In Progress', 'objectives'),
      'In ProgressColor': 'hsl(42, 70%, 50%)',
      Met: countHandler(scoreboardData, 'Met', 'objectives'),
      MetColor: 'hsl(85, 70%, 50%)',
      'Not Met': countHandler(scoreboardData, 'Not Met', 'objectives'),
      'Not MetColor': 'hsl(85, 70%, 50%)'
    };

    const actionData = {
      tasks: 'Tasks',
      'In Progress': countHandler(scoreboardData, 'In Progress', 'actions'),
      'In ProgressColor': 'hsl(42, 70%, 50%)',
      Completed: countHandler(scoreboardData, 'Completed', 'actions'),
      CompletedColor: 'hsl(85, 70%, 50%)',
      Late: countHandler(scoreboardData, 'Late', 'actions'),
      LateColor: 'hsl(32,70%,50%)',
      'Not Started': countHandler(scoreboardData, 'Not Started', 'actions'),
      'Not StartedColor': 'hsl(85, 70%, 50%)'
    };

    setObjectiveData([objectiveData]);
    setRiskData([riskData]);
    setActionData([actionData]);

    scoreboardData.map(scoreboard => scoreboard.actions.map(action => console.log(action)));
  };

  useEffect(() => {
    const getScoreboardData = async () => {
      const projectId = props.location.pathname.split('/').pop(-1);
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
          throw new Error('No scoreboard data found');
        }

        setScoreBoard(resData.data);
        setIsLoaded(true);
        setUpScoreboardData(resData.data);
      } catch (error) {
        console.log('error occur', error);
      }
    };
    getScoreboardData();
  }, []);

  const saveActionNarrativeHandler = () => {
    setEditActionNarrative(false);
  };

  const saveObjectiveNarrativeHandler = () => {
    setEditObjectiveNarrative(false);
  };

  const saveRiskNarrativeHandler = () => {
    setEditRiskNarrative(false);
  };

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
      <div className={classes.Wrapper}>
        <div className={classes.RagChart}>
          <div style={{ height: '230px' }}>
            <h3>Risks</h3>
            {riskData && (
              <ResponsiveBar
                data={riskData}
                keys={['In Progress', 'Completed', 'Late', 'Not Started']}
                indexBy="tasks"
                margin={{ top: 20, right: 10, bottom: 130, left: 10 }}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
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
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            )}
          </div>
          <div style={{ height: '230px' }}>
            <h3>Objectives</h3>
            {objectiveData && (
              <ResponsiveBar
                data={objectiveData}
                keys={['In Progress', 'Met', 'Not Met']}
                indexBy="tasks"
                margin={{ top: 20, right: 10, bottom: 130, left: 10 }}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
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
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            )}
          </div>
          <div style={{ height: '230px' }}>
            <h3>Actions</h3>
            {actionData && (
              <ResponsiveBar
                data={actionData}
                keys={['In Progress', 'Completed', 'Late', 'Not Started']}
                indexBy="tasks"
                margin={{ top: 20, right: 10, bottom: 130, left: 10 }}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
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
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            )}
          </div>
          <div style={{ height: '230px' }}>
            <h3>Something else</h3>
          </div>
        </div>
      </div>
      {editActionNarrative ? (
        <textarea
          ref={ref}
          className={classes.TextArea}
          spellCheck={true}
          defaultValue={scoreboard.map(scoreboard => scoreboard.actionNarrative)}
        />
      ) : (
        <div onClick={() => setEditActionNarrative(true)} className={classes.Narrative}>
          <h3>Action Narrative</h3>
          {scoreboard.map(scoreboard => scoreboard.actionNarrative)}
        </div>
      )}
      {editObjectiveNarrative ? (
        <textarea
          ref={ref}
          className={classes.TextArea}
          spellCheck={true}
          defaultValue={scoreboard.map(scoreboard => scoreboard.objectiveNarrative)}
        />
      ) : (
        <div onClick={() => setEditObjectiveNarrative(true)} className={classes.Narrative}>
          <h3>Objective Narrative</h3>
          {scoreboard.map(scoreboard => scoreboard.objectiveNarrative)}
        </div>
      )}
      {editRiskNarrative ? (
        <textarea
          ref={ref}
          className={classes.TextArea}
          spellCheck={true}
          defaultValue={scoreboard.map(scoreboard => scoreboard.riskNarrative)}
        />
      ) : (
        <div onClick={() => setEditRiskNarrative(true)} className={classes.Narrative}>
          <h3>Risk Narrative</h3>
          {scoreboard.map(scoreboard => scoreboard.riskNarrative)}
        </div>
      )}
      <br />
    </div>
  );
};
export default ScoreBoard;
