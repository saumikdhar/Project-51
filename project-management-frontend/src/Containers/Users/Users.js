import React from 'react';
import classes from './Users.module.css';
import { addUser, editUser, deleteUser, getUser, getUsers } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Button, Divider, Select, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserAddOutlined } from '@ant-design/icons';
import AddUserModal from './Modals/AddUserModal';
import EditUserModal from './Modals/EditUserModal';
import DeleteUserModal from './Modals/DeleteUserModal';

const { Option } = Select;
const roles = {
  transformationTeam: 'Transformation Team',
  manager: 'Project Manager',
  employee: 'Employee'
};

class Users extends React.Component {
  refreshUsers = () => this.props.dispatch(getUsers());

  componentDidMount() {
    this.refreshUsers();
  }

  state = {
    addUserModalVisible: false,
    editUserModalVisible: false,
    deleteUserModalVisible: false,
    userToEdit: null,
    projectId: null
  };

  showAddUserModal = () => this.setState({ addUserModalVisible: true });

  hideAddUserModal = () => this.setState({ addUserModalVisible: false });

  showEditUserModal = user => this.setState({ editUserModalVisible: true, userToEdit: user });

  hideEditUserModal = () => this.setState({ editUserModalVisible: false, userToEdit: null });

  showDeleteUserModal = user => this.setState({ deleteUserModalVisible: true, userToEdit: user });

  hideDeleteUserModal = () => this.setState({ deleteUserModalVisible: false, userToEdit: null });

  submitUser = values => {
    this.props.dispatch(addUser(values));
  };

  editUser = values => {
    this.props.dispatch(editUser(values));
  };

  deleteUser = values => {
    this.props.dispatch(deleteUser(values)); //this.deleteUser(record.id)
  };

  onSwitchChange = value => {
    this.setState({ projectId: value });
  };

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'First name',
        key: 'Firstname',
        render: (text, record) => <p key={record.firstName}>{record.firstName}</p>
      },
      {
        title: 'Surname',
        key: 'Surname',
        render: (text, record) => <p key={record.surname}>{record.surname}</p>
      },
      {
        title: 'Email',
        key: 'Email',
        render: (text, record) => <p key={record.email}>{record.email}</p>
      },
      {
        title: 'Role',
        key: 'Role',
        width: '15%',
        render: (text, record) => <p key={record.role}>{roles[record.role]}</p>
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: (text, record) => {
          return (
            <>
              <span>
                <Button type="link" onClick={() => this.showEditUserModal(record)}>
                  <EditOutlined /> Edit
                </Button>

                <Divider type="vertical" />

                <Button type="link" onClick={() => this.showDeleteUserModal(record)}>
                  <DeleteOutlined /> Delete
                </Button>
              </span>
            </>
          );
        }
      }
    ];
  }

  render() {
    const { users, loading } = this.props;
    const projectId = this.state.projectId;

    let switchItems = [];
    let displayUsers = null;
    let noProjects = null;
    if (users.length !== 1) {
      switchItems = [];
      for (let [key, value] of Object.entries(users)) {
        switchItems.push(
          <Option value={key} key={key}>
            {value?.project.name}
          </Option>
        );
      }
      displayUsers = users[projectId]?.users;
      if (projectId == null && users.length !== 0) {
        this.setState({ projectId: Object.keys(users)[0] });
      }
    } else {
      displayUsers = users;
      noProjects = <h3>There are no active projects for which to display users.</h3>;
    }

    return (
      <>
        <div className={classes.Users}>
          <h1>Project Users</h1>
          {noProjects}
          <div style={{ textAlign: 'left', width: '50%', display: 'inline-block' }}>
            <Select
              showSearch
              style={{ width: 200 }}
              optionFilterProp="children"
              onChange={this.onSwitchChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={projectId}
            >
              {switchItems}
            </Select>
          </div>

          <div style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
            <Button
              style={{ marginBottom: '10px' }}
              type="primary"
              icon={<UserAddOutlined />}
              onClick={this.showAddUserModal}
            >
              <b> Add User</b>
            </Button>
          </div>

          <Table
            bordered
            dataSource={displayUsers}
            columns={this.columns}
            scroll={{ x: '100%' }}
            loading={loading}
          />
        </div>

        <AddUserModal
          visible={this.state.addUserModalVisible}
          hideModal={this.hideAddUserModal}
          projectId={projectId}
          switchItems={switchItems}
          onSubmit={this.submitUser}
        />

        <EditUserModal
          visible={this.state.editUserModalVisible}
          hideModal={this.hideEditUserModal}
          record={this.state.userToEdit}
          onSubmit={this.editUser}
        />

        <DeleteUserModal
          visible={this.state.deleteUserModalVisible}
          hideModal={this.hideDeleteUserModal}
          record={this.state.userToEdit}
          onSubmit={this.deleteUser}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading
  };
};

export default connect(mapStateToProps)(Users);
