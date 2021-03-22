import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Projects.module.css';
import { Tag, Tooltip, Button } from 'antd';
import 'antd/lib/tag/style';
import 'antd/lib/tooltip/style';
import 'antd/lib/button/style';
import { PlusOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions';
import { backendUrl } from '../../shared/utility';

const Projects = props => {
  const [projects, setProjects] = useState([]);
  const { removeUserFromProject } = props;

  useEffect(() => {
    const userId = props.userId;
    const role = props.role;

    const url = `${backendUrl()}/projects/getMyProjects`;
    const method = 'post';
    const header = { 'Content-Type': 'application/json' };
    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({ userId: userId, role: role })
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
        console.log('projects consoled', resData);
        const data = resData.projects.flatMap(projects => projects);
        setProjects(data);
      })
      .catch(error => {
        console.log('error occur', error);
      });
  }, []);

  return (
    <div className={classes.Projects}>
      <h1>All Projects1</h1>
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
            return (
              <tr>
                <td>
                  <Link to={`/projectinfo/${project.id}`}> {project.name}</Link>
                </td>
                <td>{!project.managerName ? 'No Manager Assigned' : `${project.managerName}`}</td>
                <td>{project.projectStatus}</td>
                <td>{project.projectSize}</td>
                <td>{project.quickWin ? 'True' : 'False'}</td>
                <td>{project.projectType}</td>
                <td>
                  {project.users.map(user => (
                    <>
                      <Tooltip key={Math.random(1, 39393393)} placement="top" title={user.role}>
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
    role: state.auth.role,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUserFromProject: (userId, projectId) =>
      dispatch(actions.removeUserFromProject(userId, projectId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
