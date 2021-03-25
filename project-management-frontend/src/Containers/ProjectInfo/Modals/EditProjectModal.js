import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const Option = Select.Option;

class EditProjectModal extends React.Component {
  onSubmit = values => {
    values['projectId'] = this.props.record?.id;
    this.props.onSubmit(values);
    this.props.hideModal();
  };

  render() {
    const { visible, hideModal } = this.props;

    return (
      <Modal
        width={500}
        title="Edit A Project"
        onCancel={hideModal}
        destroyOnClose={true}
        visible={visible}
        footer={[
          <Button key="Cancel" onClick={hideModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="EditProjectForm" htmlType="submit">
            {'Submit'}
          </Button>
        ]}
      >
        <Form id="EditUserForm" layout="vertical" onFinish={this.onSubmit}>
          <FormItem>
            label="Project Name" name="projectName" initialValue={this.props.record?.projectName}
            rules=
            {[
              {
                whitespace: true,
                required: true,
                message: 'Please enter the new project Name'
              }
            ]}
            >
          </FormItem>
          <FormItem>
            label="Manager Name" name="managerName" initialValue={this.props.record?.managerName}
            rules=
            {[
              {
                whitespace: true,
                required: true,
                message: 'Please enter the new managers Name'
              }
            ]}
            >
          </FormItem>
          <FormItem>
            label="Project Status" name="projectStatus" initialValue=
            {this.props.record?.projectStatus}
            rules=
            {[
              {
                required: true,
                message: 'Please enter new status'
              }
            ]}
            >
            <Select>
              <Option key={'true'} value={'true'}>
                {'true'}
              </Option>
              <Option key={'false'} value={'false'}>
                {'false'}
              </Option>
            </Select>
          </FormItem>
          <FormItem>
            label="Project Size" name="projectSize" initialValue={this.props.record?.projectSize}
            rules=
            {[
              {
                whitespace: true,
                required: true,
                message: 'Please enter the new project Size'
              }
            ]}
            >
          </FormItem>
          <FormItem>
            label="Quick Win" name="quickWin" initialValue={this.props.record?.quickWin}
            rules=
            {[
              {
                whitespace: true,
                required: true,
                message: 'Please enter if project is Quick win or not'
              }
            ]}
            >
          </FormItem>
          <FormItem>
            label="Project Type" name="projectType" initialValue={this.props.record?.projectType}
            rules=
            {[
              {
                whitespace: true,
                required: true,
                message: 'Please enter the new project type'
              }
            ]}
            >
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default EditProjectModal;
