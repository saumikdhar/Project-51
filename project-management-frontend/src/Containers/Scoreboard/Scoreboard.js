import React, { useState, useEffect } from 'react';
import { backendUrl } from '../../store/utility';
import classes from './../Projects/Projects.module.css';
const ScoreBoard = props => {
  const [id, setId] = useState('');
  const [scoreboards, setScoreBoards] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let infoId = props.match.params.id;
    setId(infoId);
    const url = `${backendUrl()}/scoreboards/getScoreBoard/` + infoId;
    const method = 'GET';
    const header = { 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Error');
        } else if (res.status !== 200 && res.status !== 201) {
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
  }, []);
  return (
    <div className={classes.Projects}>
      <h1>All ScoreBoards </h1>
      <table className={classes.Table}>
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
