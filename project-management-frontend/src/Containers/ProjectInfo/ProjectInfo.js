import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backendUrl } from '../../store/utility';

const ProjectInfo = props => {
  const [id, setId] = useState('');
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let infoId = props.match.params.id;
    setId(infoId);
    const url = `${backendUrl()}/projects/projectDetails/` + infoId;
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
        console.log('res data project info', resData);
        setProject(resData.data);
        setIsLoaded(true);
      })
      .catch(error => {
        console.log('error occur', error);
      });
  }, []);
  return (
    <div>
      <h1>Project Details</h1>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Manager Name</th>
            <th>Proect Status</th>
            <th>Project Size</th>
            <th>Quick Win</th>
            <th>Project Type</th>
            <th>Project Created At</th>
            <th>Score Board</th>
            <th>Business Case</th>
          </tr>
        </thead>
        <tbody>
          {isLoaded ? (
            <tr key={project.id}>
              <td> {project.name}</td>
              <td>{project.managerName}</td>
              <td>{project.projectStatus}</td>
              <td>{project.projectSize}</td>
              <td>{project.quickWin}</td>
              <td>{project.projectType}</td>
              <td>{project.createdAt}</td>
              <td>
                <Link to={`/scoreboard/${project.id}`}>ScoreBoard</Link>{' '}
              </td>
              <td>
                <Link to={`/businessCase/${project.id}`}>Business Case</Link>{' '}
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="8">Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectInfo;
