import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Projects.module.css';
import { Tag, Tooltip, Button } from 'antd';
import 'antd/lib/tag/style';
import 'antd/lib/tooltip/style';
import 'antd/lib/button/style';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const Projects = props => {
  const [projects, setProjects] = useState([]);
  const { removeUserFromProject } = props;

  useEffect(() => {
    const url = 'http://localhost:8080/projects/getAllProjects';
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
        console.log('res data', resData);
        setProjects(resData.data);
      })
      .catch(error => {
        console.log('error occur', error);
      });
  }, []);

  return (
    <div className={classes.Projects}>
      <h1>All Projects</h1>
      <table className={classes.Table}>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Manager Name</th>
            <th>Project Status</th>
            <th>Project Size</th>
            <th>Quick Win</th>
            <th>Project Type</th>
            <th>Users</th>
            <th>Project Created At</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => {
            console.log(project);
            return (
              <tr key={project.id}>
                <td>
                  <Link to={`/projectinfo/${project.id}`}> {project.name}</Link>
                </td>
                <td>{project.managerName}</td>
                <td>{project.projectStatus}</td>
                <td>{project.projectSize}</td>
                <td>{project.quickWin}</td>
                <td>{project.projectType}</td>
                <td>
                  {project.users.map(user => (
                    <>
                      <Tooltip placement="top" title={user.role}>
                        <Tag
                          onClose={() => removeUserFromProject(user.id, project.id)}
                          closable={
                            props.role === 'transformationTeam' ||
                            (props.role === 'manager' && user.role !== 'transformationTeam')
                          }
                        >{`${user.firstName} ${user.surname}`}</Tag>
                      </Tooltip>
                    </>
                  ))}
                  {props.role !== 'employee' && (
                    <div style={{ marginTop: '10px' }} className={classes.antBtn}>
                      <Link to={`/assign-projects/${project.id}`}>Add users</Link>
                    </div>
                  )}
                </td>
                <td>{project.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    role: state.auth.role
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUserFromProject: (userId, projectId) =>
      dispatch(actions.removeUserFromProject(userId, projectId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
