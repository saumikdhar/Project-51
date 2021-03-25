//----------------------------------------------------------------------------------------------------------------------
// Imports; for webservices and styling
import React from 'react';
import { DatePicker, Button, Form, Input, Modal, Select } from 'antd';

//----------------------------------------------------------------------------------------------------------------------
// Antd design options defined
const FormItem = Form.Item;
const Option = Select.Option;

//----------------------------------------------------------------------------------------------------------------------
// Modal to add new filter options to the admin dashboard
class AddFilterModal extends React.Component {

  //--------------------------------------------------------------------------------------------------------------------
  // Set the on submit to pass values to the onSubmit and hideModal methods in AdminProjects
  onSubmit = values => {
    this.props.onSubmit(values);
    this.props.hideModal();
  };

  //--------------------------------------------------------------------------------------------------------------------
  // Render display from modal; sets visibility options for pop out
  render() {
    const { visible, hideModal } = this.props;
    return (

      //----------------------------------------------------------------------------------------------------------------
      // Modal page, sets colsing options as well as form submission
      <Modal
        width={500}
        title="Add New Filter"
        onCancel={hideModal}
        destroyOnClose={true}
        visible={visible}
        footer={[
          <Button key="Cancel" onClick={hideModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="AddFilterForm" htmlType="submit">
            {'Add'}
          </Button>
        ]}
      >
        {/* -------------------------------------------------------------------------------------------------------- */}
        {/* Modal form to add new filters */}
        <Form id="AddFilterForm" layout="vertical" onFinish={this.onSubmit}>
          <FormItem
            label="Filter Option"
            extra="This will determine what the table is filtered by"
            name="filter"
            rules={[
              {
                required: true,
                message: 'Please select a new filter'
              }
            ]}
          >
            {/* ---------------------------------------------------------------------------------------------------- */}
            {/* drop down to select the filter type */}
            <Select>
              <Option key={'priorityScore'} value={'priorityScore'}>
                {'Priority Score'}
              </Option>
              <Option key={'estimatedCost'} value={'estimatedCost'}>
                {'Estimated Cost'}
              </Option>
            </Select>
          </FormItem>

          <FormItem
            label="Between"
            name="valueInput1"
            rules={[
              {
                required: true,
                message: 'Please input a value'
              }
            ]}
          >
            {/* ---------------------------------------------------------------------------------------------------- */}
            {/* drop down to select the filter type */}
            <input/>
          </FormItem>

          <FormItem
            extra="Values the filter will use"
            name="valueInput2"
            rules={[
              {
                required: true,
                message: 'Please input a value'
              }
            ]}
          >
            {/* ---------------------------------------------------------------------------------------------------- */}
            {/* drop down to select the filter type */}
            <input/>
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

// Exports modal
export default AddFilterModal;
