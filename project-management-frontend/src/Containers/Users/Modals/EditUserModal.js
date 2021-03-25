import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const Option = Select.Option;

class EditUserModal extends React.Component {
  onSubmit = values => {
    values['userId'] = this.props.record?.id;
    this.props.onSubmit(values);
    this.props.hideModal();
  };

  render() {
    const { visible, hideModal } = this.props;

    return (
      <Modal
        width={500}
        title="Edit User"
        onCancel={hideModal}
        destroyOnClose={true}
        visible={visible}
        footer={[
          <Button key="Cancel" onClick={hideModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="EditUserForm" htmlType="submit">
            {'Submit'}
          </Button>
        ]}
      >
        <Form id="EditUserForm" layout="vertical" onFinish={this.onSubmit}>
          <FormItem
            label="First Name"
            name="firstName"
            initialValue={this.props.record?.firstName}
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
            initialValue={this.props.record?.surname}
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
            initialValue={this.props.record?.email}
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
            label="Role"
            extra="The role defines what permissions the user will have"
            name="role"
            initialValue={this.props.record?.role}
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
              <Option key={'ITDM'} value={'it'}>
                {'IT Department Member'}
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

export default EditUserModal;
