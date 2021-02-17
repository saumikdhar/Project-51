import React from "react";
import classes from "./Users.module.css";
import {getUser, getUsers} from "../../store/actions/index";
import {connect} from "react-redux";
import {Button, Divider, Table, Tag} from 'antd';

class Users extends React.Component {

  componentDidMount() {
    console.log("MOUNTED")
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
        title: 'Role',
        key: 'Role',
        width: '5%',
        render: (text, record) => (
          <Tag>
            {record.role}
          </Tag>),

      },
      {
        title: 'First name',
        key: 'Firstname',
        render: (text, record) => (<p>{record.user.firstName}</p>),

      },
      {
        title: 'Surname',
        key: 'Surname',
        render: (text, record) => (<p>{record.user.surname}</p>),
      },
      {
        title: 'Email',
        key: 'Email',
        render: (text, record) => (<p>{record.user.email}</p>),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          //const isYou = this.currentUser.email === record.user.email;
          return (
            <>
              isYou ? <Tag color={'green'}>You</Tag> :
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
              </span>
            </>
          )
        }

      },
    ];
  }

  render() {
    const {users, loading} = this.props;
    console.log("users: ", users);
    return (
      <>
        <div className={classes.Users}>
          <h1>Users</h1>
          <Table
            bordered
            dataSource={users}
            columns={this.columns}
            scroll={{x: 'max-content'}}
            loading={loading}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("state: ", state);
  return {
    // users: state.users.users,
    // loading: state.users.loading
  };
};

export default connect(mapStateToProps)(Users);
