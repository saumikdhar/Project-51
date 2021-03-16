import React, { useState, useEffect } from 'react';
import { backendUrl } from '../../store/utility';
import classes from './Scoreboard.module.css';
import Button from '../../Components/UI/Button/Button';
import { Helmet } from 'react-helmet';
import { ResponsiveBar } from '@nivo/bar';

const ScoreBoard = props => {
  const [scoreboards, setScoreBoards] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const data = [
    // {
    //   country: 'AD',
    //   'hot dog': 164,
    //   'hot dogColor': 'hsl(123, 70%, 50%)',
    //   outOfContrl: 119,
    //   burgerColor: 'hsl(335, 70%, 50%)',
    //   sandwich: 167,
    //   sandwichColor: 'hsl(116, 70%, 50%)',
    //   kebab: 144,
    //   kebabColor: 'hsl(29, 70%, 50%)',
    //   fries: 100,
    //   friesColor: 'hsl(117, 70%, 50%)',
    //   donut: 197,
    //   donutColor: 'hsl(178, 70%, 50%)'
    // },
    {
      tasks: 'Tasks',
      'hot dog': 38,
      'hot dogColor': 'hsl(32, 70%, 50%)',
      'Out Of Control': 13,
      'Out Of ControlColor': 'hsl(85, 70%, 50%)',
      'In Control': 8,
      'In ControlColor': 'hsl(42, 70%, 50%)',
      Critical: 12,
      CriticalColor: 'hsl(164, 70%, 50%)'
    }
  ];
  useEffect(() => {
    const getScoreboardData = () => {
      const projectId = props.location.pathname.split('/').pop(-1);
      const url = `${backendUrl()}/scoreboards/getScoreBoard`;
      const method = 'POST';
      const header = { 'Content-Type': 'application/json' };

      fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({ projectId: projectId })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Error');
          }
          return res.json();
        })
        .then(resData => {
          setScoreBoards(resData.data);
          setIsLoaded(true);
        })
        .catch(error => {
          console.log('error occur', error);
        });
    };
    getScoreboardData();
  }, []);
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
      <div className={classes.RagCharts}>
        <div style={{ height: '230px' }} className={classes.RagChart}>
          <h3>Risks</h3>
          <ResponsiveBar
            data={data}
            keys={['Critical', 'Out Of Control', 'In Control', 'fries']}
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
                translateX: 19,
                translateY: 75,
                itemsSpacing: 10,
                itemWidth: 90,
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
        </div>
        <div style={{ height: '230px' }} className={classes.RagChart}>
          <h3>Objectives</h3>
          <ResponsiveBar
            data={data}
            keys={['Critical', 'Out Of Control', 'In Control', 'fries']}
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
                translateX: 19,
                translateY: 75,
                itemsSpacing: 10,
                itemWidth: 90,
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
        </div>
      </div>
      <div className={classes.RagCharts}>
        <div style={{ height: '230px' }} className={classes.RagChart}>
          <h3>Actions</h3>
          <ResponsiveBar
            data={data}
            keys={['Critical', 'Out Of Control', 'In Control', 'fries']}
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
                translateX: 19,
                translateY: 75,
                itemsSpacing: 10,
                itemWidth: 90,
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
        </div>
        <div style={{ height: '230px' }} className={classes.RagChart}>
          <h3>Something else</h3>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Action Narrative </th>
            <th>Objective Narrative</th>
            <th>Risk Narrative</th>
          </tr>
        </thead>
        <tbody>
          {isLoaded ? (
            scoreboards.map(scoreboard => {
              return (
                <tr key={scoreboard.id}>
                  <td>{scoreboard.actionNarrative}</td>
                  <td>{scoreboard.objectiveNarrative}</td>
                  <td>{scoreboard.riskNarrative}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ScoreBoard;
