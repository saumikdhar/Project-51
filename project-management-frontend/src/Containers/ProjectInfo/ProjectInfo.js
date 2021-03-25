import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Switch, Modal, Select } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './../Projects/Projects.module.css';
import classes1 from './ProjectInfo.module.css';
import { backendUrl } from '../../shared/utility';
import CustomButton from '../../Components/UI/Button/Button';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const ProjectInfo = props => {
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [projectSize, setProjectSize] = useState('');
  const [quickWin, setQuickWin] = useState('');
  const [projectType, setProjectType] = useState('');

  const FormItem = Form.Item;
  const Option = Select.Option;

  const retrieveProjects = () => {
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
  };

  useEffect(() => {
    retrieveProjects();
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
        retrieveProjects();
        return res.json();
      })
      .then(window.location.reload())
      .catch(error => {
        console.log('error occur', error);
      });
  };

  const editProject = (routeType, values) => {
    console.log('goes to edit project');
    let infoId = props.match.params.id;
    //setId(infoId);
    const url = `http://localhost:8080/projects/${routeType}/` + infoId;
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify({
        projectName: values.projectName,
        managerName: values.managerName,
        projectStatus: values.projectStatus,
        projectSize: values.projectSize,
        quickWin: values.quickWin,
        projectType: values.projectType
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Error');
        } else if (res.status !== 200 && res.status !== 201) {
          throw new Error('Couldnt edit project');
          console.log('there was an error editing project');
        }
        console.log('check edit is working');
        retrieveProjects();
        // res.json().then(json => {
        // });
        return res.json();
      })
      .catch(error => {
        console.log('error occurred', error);
      });
  };

  //console.log(props.role);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

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

  const showModal3 = () => {
    setIsModalVisible3(true);
  };

  // const handleOk3 = () => {
  // };

  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };

  const submitUpdateProject = values => {
    setIsModalVisible3(false);
    editProject('editProject', values);
  };
  console.log('project.quickWin: ', project?.quickWin);

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
            {isLoaded ? (
              project.projectType == 'Simplify' || project.projectSize == 'Small' ? null : (
                <>
                  {' '}
                  <th>Score Board</th>
                  <th>Business Case</th>
                </>
              )
            ) : null}
          </tr>
        </thead>
        <tbody>
          {isLoaded ? (
            <tr key={project.id}>
              <td> {project.name}</td>
              <td>{project.managerName}</td>
              <td>{project.projectStatus}</td>
              <td>{project.projectSize}</td>
              <td>{project.quickWin ? 'True' : 'False'}</td>
              <td>{project.projectType}</td>
              <td>{project.createdAt}</td>

              {project.projectType == 'Simplify' || project.projectSize == 'Small' ? null : (
                <td>
                  <Link to={`/scoreboard/${project.id}`}>ScoreBoard</Link>{' '}
                </td>
              )}
              {project.projectType == 'Simplify' || project.projectSize == 'Small' ? null : (
                <td>
                  {' '}
                  <Link to={`/businessCase/${project.id}`}>Business Case</Link>{' '}
                </td>
              )}
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
              title="Edit project "
              visible={isModalVisible3}
              footer={[
                <Button key="Cancel" onClick={handleCancel3}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" form="EditProjectForm" htmlType="submit">
                  {'Submit'}
                </Button>
              ]}
            >
              <Form id="EditProjectForm" layout="vertical" onFinish={submitUpdateProject}>
                <FormItem
                  label="Project Name"
                  name="projectName"
                  initialValue={project?.name}
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: 'Please enter the new project Name'
                    }
                  ]}
                >
                  <Input placeholder="My Project" />
                </FormItem>
                <FormItem
                  label="Manager Name"
                  name="managerName"
                  initialValue={project?.managerName}
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: 'Please enter the new managers Name'
                    }
                  ]}
                >
                  <Input placeholder="Steve Poal" />
                </FormItem>

                <FormItem
                  label="Project Status"
                  name="projectStatus"
                  initialValue={project?.projectStatus}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter new status'
                    }
                  ]}
                >
                  <Select>
                    <Option key={'Active'} value={'Active'}>
                      {'Active'}
                    </Option>
                    <Option key={'Archived'} value={'Archived'}>
                      {'Archived'}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="Project Size"
                  name="projectSize"
                  initialValue={project?.projectSize}
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: 'Please enter the new project Size'
                    }
                  ]}
                >
                  <Input placeholder="My Project" />
                </FormItem>
                <FormItem label="Quick Win" name="quickWin" initialValue={project?.quickWin}>
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                  />
                </FormItem>
                <FormItem
                  label="Project Type"
                  name="projectType"
                  initialValue={project?.projectType}
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: 'Please enter the new project type'
                    }
                  ]}
                >
                  <Input placeholder="My Project" />
                </FormItem>
              </Form>
            </Modal>
            <button className={classes1.button2} type="primary" onClick={showModal3}>
              Edit
            </button>
            &nbsp;&nbsp;&nbsp;
            <Modal
              title="Delete project "
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete this project ?</p>
            </Modal>
            <button className={classes1.button1} type="primary" onClick={showModal} danger>
              Delete
            </button>
            <Modal
              title="Archive"
              visible={isModalVisible2}
              onOk={handleOk2}
              onCancel={handleCancel2}
            >
              <p>Are you sure you want to archive this project ?</p>
            </Modal>
            &nbsp;&nbsp;&nbsp;{' '}
            <button className={classes1.button3} type="primary" onClick={showModal2}>
              Archive
            </button>
            {/*  <Modal*/}
            {/*    title="Delete project "*/}
            {/*    visible={isModalVisible}*/}
            {/*    onOk={handleOk}*/}
            {/*    onCancel={handleCancel}*/}
            {/*  >*/}
            {/*    <p>Are you sure you want to delete this project ?</p>*/}
            {/*  </Modal>*/}
            {/*  <Button type="primary" onClick={showModal} danger>*/}
            {/*    Delete*/}
            {/*  </Button>*/}
            {/*  <Modal*/}
            {/*    title="Archive"*/}
            {/*    visible={isModalVisible2}*/}
            {/*    onOk={handleOk2}*/}
            {/*    onCancel={handleCancel2}*/}
            {/*  >*/}
            {/*    <p>Are you sure you want to archive this project ?</p>*/}
            {/*  </Modal>*/}
            {/*  &nbsp;&nbsp;&nbsp;{' '}*/}
            {/*  <Button type="primary" onClick={showModal2}>*/}
            {/*    Archive*/}
            {/*  </Button>*/}
          </>
        )}
        {props.role === 'it' && (
          <>
            <Modal
              title="Archive"
              visible={isModalVisible2}
              onOk={handleOk2}
              onCancel={handleCancel2}
            >
              <p>Are you sure you want to archive this project ?</p>
            </Modal>
            &nbsp;&nbsp;&nbsp;{' '}
            <button type="primary" onClick={showModal2}>
              Archive
            </button>
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
