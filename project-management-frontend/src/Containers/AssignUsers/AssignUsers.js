import React, { useEffect, useState } from 'react';
import { Tag, Table, Button, Input } from 'antd';

import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/tag/style/css';
import classes from './AssignUsers.module.css';
import './index-2.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { backendUrl } from '../../shared/utility';

const AssignUsers = props => {
  const { addUserToProject, getProjectUsers, removeUserFromProject, setProjectUsers } = props;
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableFiltered, setTableFiltered] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filterTable, setFilterTable] = useState([]);
  const { Search } = Input;
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }
  ];

  const projectId = props.location.pathname.split('/').pop(-1);

  useEffect(() => {
    const fetchTableData = async () => {
      setLoadingTable(true);
      try {
        const url = `${backendUrl()}/users/employees`;
        const method = 'POST';
        const token = localStorage.getItem('token');
        const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

        const response = await fetch(url, {
          method: method,
          headers: header,
          body: JSON.stringify({
            role: props.role
          })
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(response.message || 'No users found!');
        } else {
          setDataSource([...resData.users]);
        }
        setLoadingTable(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (props.role !== 'employee') {
      fetchTableData();
    }
    getProjectUsers(projectId);
  }, [getProjectUsers, props.role]);

  let listOfUsers;
  listOfUsers = props.users;

  const removeUserFromProjectHandler = userId => {
    removeUserFromProject(userId, projectId);
    listOfUsers.map((oldUserId, index) => {
      if (userId === oldUserId.key) {
        return listOfUsers.splice(index, 1);
      }
      return oldUserId;
    });
    setProjectUsers(listOfUsers.flat());
  };

  const assignUsersHandler = () => {
    setLoadingButton(true);
    const oldUsers = [...listOfUsers];

    let updatedUsers = selectedRowKeys.map(userId => {
      let users;
      [...dataSource].map(data => {
        if (data.key === userId) {
          return (users = data);
        }
        return users;
      });
      return users;
    });

    oldUsers.push(...updatedUsers);

    addUserToProject(selectedRowKeys, projectId);
    setProjectUsers(oldUsers);
    setSelectedRowKeys([]);
    setLoadingButton(false);
  };

  const searchHandler = value => {
    const filteredData = dataSource.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(value.toLowerCase()))
    );
    setFilterTable(filteredData);
    setTableFiltered(true);
  };

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: record => {
      const l = listOfUsers.map(oldUserId => {
        return oldUserId.key === record.key;
      });
      return {
        disabled: l.includes(true)
      };
    }
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div className={classes.AssignProjects}>
        {/*{authRedirect}*/}
        <h2> Employees assigned to this project</h2>
        {listOfUsers.map(user => (
          <Tag
            onClose={() => removeUserFromProjectHandler(user.key)}
            // color={colours[Math.round(Math.random() * colours.length) + 1]}
            closable={
              props.role === 'transformationTeam' ||
              (props.role === 'manager' && user.role !== 'transformationTeam')
            }
            key={user.key}
          >{`${user.firstName} ${user.surname}`}</Tag>
        ))}
      </div>
      <div className={classes.User}>
        {props.role !== 'employee' && (
          <Search
            placeholder={'Search'}
            onSearch={searchHandler}
            enterButton
            allowClear
            style={{ width: 300, marginBottom: 8, marginRight: 8 }}
          />
        )}
      </div>
      <div className={classes.Button}>
        {props.role !== 'employee' && (
          <Button
            shape="round"
            onClick={() => assignUsersHandler()}
            type="primary"
            loading={loadingButton}
            disabled={!hasSelected}
          >
            {' '}
            Assign to Project{' '}
          </Button>
        )}
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} users` : ''}
        </span>
      </div>
      {props.role !== 'employee' ? (
        <Table
          rowSelection={{ ...rowSelection }}
          rowClassName={record => {
            const l = listOfUsers.map(oldUserId => {
              return oldUserId.key === record.key;
            });
            return {
              'disabled-row': l.includes(true)
            };
          }}
          dataSource={!tableFiltered ? dataSource : filterTable}
          columns={columns}
          loading={loadingTable}
          pagination={{ position: ['bottomCenter'], pageSizeOptions: [5, 10, 20, 30, 50, 100] }}
        />
      ) : null}
    </>
  );
};
const mapStateToProps = state => {
  return {
    assignUserError: state.assignUser.error,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    role: state.auth.role,
    users: state.assignUser.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUserToProject: (listOfUserId, projectId) =>
      dispatch(actions.addUserToProject(listOfUserId, projectId)),
    getProjectUsers: projectId => dispatch(actions.getProjectUsers(projectId)),
    removeUserFromProject: (userId, projectId) =>
      dispatch(actions.removeUserFromProject(userId, projectId)),
    setProjectUsers: listOfUsers => dispatch(actions.getProjectUserSuccess(listOfUsers))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignUsers);
