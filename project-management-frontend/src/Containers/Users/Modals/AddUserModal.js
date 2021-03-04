import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Modal, Select } from 'antd';
import { PhoneOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { addUser } from '../../../store/actions/index';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserModal extends React.Component {
  onSubmit = values => {
    values['projectId'] = this.props.projectId;
    this.props.onSubmit(values);
    this.props.hideModal();
  };

  refreshUsers = () => this.props.refreshUsers();

  render() {
    const { visible, hideModal } = this.props;

    return (
      <Modal
        width={500}
        title="Add New User"
        onCancel={hideModal}
        destroyOnClose={true}
        visible={visible}
        footer={[
          <Button key="Cancel" onClick={hideModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="AddUserForm" htmlType="submit">
            {'Add'}
          </Button>
        ]}
      >
        <Form id="AddUserForm" layout="vertical" onFinish={this.onSubmit}>
          <FormItem
            label="First Name"
            name="firstName"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Please enter the new user's first name"
              }
            ]}
          >
            <Input placeholder="Ex. Wesley" />
          </FormItem>

          <FormItem
            label="Surname"
            name="surname"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Please enter the user's surname"
              }
            ]}
          >
            <Input placeholder="Ex. Snipes" />
          </FormItem>

          <FormItem
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the new user's email" },
              {
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Sorry, please enter a valid email'
              }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Ex. Wesley.Snipes@gmail.com" />
          </FormItem>

          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter the new user's password" }]}
          >
            <Input prefix={<LockOutlined />} placeholder="The User's Password" />
          </FormItem>

          {/*<FormItem*/}
          {/*label="Phone Number"*/}
          {/*name="phone"*/}
          {/*rules={[{*/}
          {/*whitespace: true,*/}
          {/*required: false,*/}
          {/*message: "Please enter a valid email"*/}
          {/*},*/}
          {/*{*/}
          {/*pattern: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,*/}
          {/*message: 'Invalid phone number'*/}
          {/*}*/}
          {/*]}*/}
          {/*>*/}
          {/*<Input prefix={<PhoneOutlined/>} placeholder="Ex. +44 7502719493"/>*/}
          {/*</FormItem>*/}

          <FormItem
            label="Role"
            extra="The role defines what permissions the user will have"
            name="role"
            rules={[
              {
                required: true,
                message: 'Please select a user role'
              }
            ]}
          >
            <Select>
              <Option key={'ProjectManager'} value={'manager'}>
                {'Project Manager'}
              </Option>
              <Option key={'employee'} value={'employee'}>
                {'Employee'}
              </Option>
              <Option key={'TransformationTeam'} value={'transformationTeam'}>
                {'Transformation Team'}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddUserModal;
