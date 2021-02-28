import React, { useEffect, useState } from 'react';
import { Tag, Table, Button, Input } from 'antd';
// import useStateWithCallback from 'use-state-with-callback';

import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/tag/style/css';
import classes from './AssignProjects.module.css';
import './index-2.css';
import { connect } from 'react-redux';

const AssignProjects = props => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableFiltered, setTableFiltered] = useState(false);
  const [arrayOfUsers, setArrayOfUsers] = useState([]);
  // const [colours] = useState([
  //   '#ffc0cb',
  //   '#ff00ff',
  //   '#ff0000',
  //   '#108ee9',
  //   '#f50',
  //   '#999999',
  //   '#333399',
  //   '#407294',
  //   '#87d068',
  //   '#0000ff',
  //   '#912CEE',
  //   '#5ac18e',
  //   '#800000',
  //   '#81d8d0'
  // ]);
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

  let authRedirect = null;

  const removeUserFromProjectHandler = userId => {
    // [...arrayOfUsers].map(user => {
    //   return console.log('user', user);
    // });
    const url = 'http://localhost:8080/users/removeUserFromProject';
    const method = 'PATCH';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        projectId: 1,
        userId: userId
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('unable to fetch');
        }
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
    fetchUsersOnProject();
  };

  useEffect(() => {
    if (props.role !== 'employee') {
      setLoadingTable(true);
      const url = 'http://localhost:8080/users/employees';
      const method = 'POST';
      const token = localStorage.getItem('token');
      const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

      fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({
          role: props.role
        })
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('No users found!');
          }
          return res.json();
        })
        .then(resData => {
          setDataSource([...resData.users]);
          setLoadingTable(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchUsersOnProject();
  }, []);

  const fetchUsersOnProject = () => {
    const url = 'http://localhost:8080/users/projectUsers';
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        projectId: 1
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('unable to fetch');
        }
        return res.json();
      })
      .then(resData => {
        const listOfUsers = resData.users.map(user => (
          <Tag
            onClose={() => removeUserFromProjectHandler(user.id)}
            // color={colours[Math.round(Math.random() * colours.length) + 1]}
            closable={props.role !== 'employee'}
            key={user.id}
          >{`${user.firstName} ${user.surname}`}</Tag>
        ));
        setArrayOfUsers(listOfUsers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const postAssignUserToProject = userId => {
    const url = 'http://localhost:8080/users/addUserToProject';
    const method = 'POST';
    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        projectId: 1,
        userId: userId
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to post');
        }
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const assignUsersHandler = () => {
    setLoadingButton(true);
    const oldUsers = [...arrayOfUsers];
    let updatedUsers = selectedRowKeys.map(userId => (
      <Tag
        onClose={() => removeUserFromProjectHandler(userId)}
        // color={colours[Math.round(Math.random() * colours.length) + 1]}
        closable
        key={userId}
      >
        {[...dataSource].map(data => {
          return data.key === userId && `${data.firstName} ${data.surname}`;
        })}
      </Tag>
    ));
    if (oldUsers.length !== 0) {
      oldUsers.push(...updatedUsers);
    }
    postAssignUserToProject(selectedRowKeys);
    setArrayOfUsers(oldUsers);
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

  arrayOfUsers.map(oldUserId =>
    selectedRowKeys.map(newUserId => {
      if (oldUserId.key.toString() === newUserId.toString()) {
        const arrayOfUserId = [...selectedRowKeys];
        const index = arrayOfUserId.indexOf(newUserId);
        arrayOfUserId.splice(index);
        setSelectedRowKeys(arrayOfUserId);
      }
    })
  );
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: record => {
      const l = [...arrayOfUsers].map(oldUserId => {
        let b = false;
        if (oldUserId.key.toString() === record.key.toString()) {
          return (b = true);
        }
        return b;
      });
      return {
        disabled: l.filter(Boolean)[0]
      };
    }
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div className={classes.AssignProjects}>
        {/*{authRedirect}*/}
        <h2> Employees assigned to this project</h2>
        {arrayOfUsers}
      </div>
      <div className={classes.User}>
        {props.role !== 'employee' ? (
          <Search
            placeholder={'Search'}
            onSearch={searchHandler}
            enterButton
            allowClear
            style={{ width: 300, marginBottom: 8, marginRight: 8 }}
          />
        ) : null}
      </div>
      <div className={classes.Button}>
        {props.role !== 'employee' ? (
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
        ) : null}
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} users` : ''}
        </span>
      </div>
      {props.role !== 'employee' ? (
        <Table
          rowSelection={{ ...rowSelection }}
          rowClassName={record => {
            const l = [...arrayOfUsers].map(oldUserId => {
              let b = false;
              if (oldUserId.key.toString() === record.key.toString()) {
                return (b = true);
              }
              return b;
            });
            return {
              'disabled-row': l.filter(Boolean)[0]
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
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    role: state.auth.role
  };
};

export default connect(mapStateToProps)(AssignProjects);
