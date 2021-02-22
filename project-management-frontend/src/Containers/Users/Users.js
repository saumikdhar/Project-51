import React from "react";
import classes from "./Users.module.css";
import {getUser, getUsers} from "../../store/actions/index";
import {connect} from "react-redux";
import {Button, Divider, Table, Tag} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import AddUserModal from './Modals/AddUserModal'

class Users extends React.Component {

  componentDidMount() {
    this.props.dispatch(getUsers())
  }

  state = {
    addUserModalVisible: false
  };

  showAddUserModal = () => this.setState({addUserModalVisible: true});

  hideAddUserModal = () => this.setState({addUserModalVisible: false});

  constructor(props) {
    super(props);
    this.currentUserRole = localStorage.getItem('role');
    this.currentUser = getUser();
    this.columns = [
      {
        title: 'First name',
        key: 'Firstname',
        render: (text, record) => (<p>{record.firstName}</p>),

      },
      {
        title: 'Surname',
        key: 'Surname',
        render: (text, record) => (<p>{record.surname}</p>),
      },
      {
        title: 'Email',
        key: 'Email',
        render: (text, record) => (<p>{record.email}</p>),
      },
      {
        title: 'Role',
        key: 'Role',
        width: '5%',
        render: (text, record) => (<p>{record.role}</p>),

      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          const isYou = parseInt(localStorage.getItem("userId")) === record.id;
          return (
            <>
              {isYou ? <Tag color={'green'}>You</Tag> :
                <span>
                <Button type="link"
                  //onClick={() => this.showEditUserModal(record)}
                >
                                    Edit
                </Button>
                <Divider type="vertical"/>
                <Button type="link"
                  //onClick={() => { this.deleteUser(record.user.ID) }}
                >
                  Delete
                </Button>
              </span>}
            </>
          )
        }

      },
    ];
  }

  render() {
    const {users, projectId, loading} = this.props;
    return (
      <>
        <div className={classes.Users}>
          <h1>Project Users</h1>
          <div style={{textAlign: "right"}}>
            <Button style={{marginBottom: "10px"}} type="primary"
                    icon={<UserAddOutlined/>}
                    onClick={this.showAddUserModal}>
              Add User
            </Button>
          </div>
          <Table
            bordered
            dataSource={users}
            columns={this.columns}
            scroll={{x: 'max-content'}}
            loading={loading}
          />
        </div>

        <AddUserModal
          visible={this.state.addUserModalVisible}
          hideModal={this.hideAddUserModal}
          handleSave={this.addUser}
          projectId={projectId}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    projectId: state.users.projectId,
    loading: state.users.loading
  };
};

export default connect(mapStateToProps)(Users);
