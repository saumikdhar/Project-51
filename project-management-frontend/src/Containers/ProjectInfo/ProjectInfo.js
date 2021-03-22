import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './../Projects/Projects.module.css';
import { backendUrl } from '../../shared/utility';
import CustomButton from '../../Components/UI/Button/Button';

const ProjectInfo = props => {
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let infoId = props.match.params.id;
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

  const deleteProject = routeType => {
    let infoId = props.match.params.id;
    const url = `${backendUrl()}/projects/${routeType}/ ` + infoId;
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
        console.log('check1');
        return res.json();
      })
      .then(window.location.reload())
      .catch(error => {
        console.log('error occur', error);
      });
  };
  console.log(props.role);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    deleteProject('deleteProject');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
    deleteProject('archiveProject');
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  return (
    <div className={classes.Projects}>
      <CustomButton clicked={props.history.goBack} btnType="Back">
        &lt; Go back
      </CustomButton>
      <br />
      <br />
      <h1>Project Details</h1>
      <table className={classes.Table}>
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

      <div className={classes.ProjectInfo} style={{ float: 'right' }}>
        {props.role === 'transformationTeam' && (
          <>
            <Modal
              title="Delete project "
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete this project ?</p>
            </Modal>
            <Button type="primary" onClick={showModal} danger>
              Delete
            </Button>
            <Modal
              title="Archive"
              visible={isModalVisible2}
              onOk={handleOk2}
              onCancel={handleCancel2}
            >
              <p>Are you sure you want to archive this project ?</p>
            </Modal>
            &nbsp;&nbsp;&nbsp;{' '}
            <Button type="primary" onClick={showModal2}>
              Archive
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    role: state.auth.role,
    userId: state.auth.userId
  };
};
export default connect(mapStateToProps)(ProjectInfo);
