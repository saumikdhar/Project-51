import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const Option = Select.Option;

class EditUserModal extends React.Component {
  onSubmit = () => {
    this.props.onSubmit({'userId': this.props.record?.id});
    this.props.hideModal();
  };

  render() {
    const { visible, hideModal } = this.props;

    return (
      <Modal
        width={250}
        title="Are you sure you want to delete this user?"
        onCancel={hideModal}
        destroyOnClose={true}
        visible={visible}
        footer={[
        ]}
      >
        <div style={{textAlign: "left", width: "50%", display: "inline-block"}}>
        <Button key="Cancel" onClick={hideModal}>
          Cancel
        </Button>
        </div>
        <div style={{textAlign: "right", width: "50%", display: "inline-block"}}>
        <Button type="primary" danger key="Confirm" onClick={this.onSubmit}>
          <b>Confirm</b>
        </Button>
        </div>
      </Modal>
    );
  }
}

export default EditUserModal;
