import React from 'react';
import { Input, Radio, Checkbox, Select, InputNumber, DatePicker } from 'antd';
import classes from './InputType.module.css';
import 'antd/lib/checkbox/style/css';
import 'antd/lib/select/style/css';
import moment from 'moment';
import 'antd/lib/input-number/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/date-picker/style/css';

const OptionType = props => {
  const { Option } = Select;
  const { TextArea } = Input;
  let optionType = null;
  const date = new Date();
  const dateFormat = 'DD/MM/YYYY';

  const disabledDate = current => {
    return current && current < moment(date, dateFormat);
  };

  switch (props.inputType) {
    case 'multi-option':
      optionType = (
        <div className={classes.InputType}>
          <Radio onChange={props.onChange} value={props.answerOption}>
            {props.answerOption}
          </Radio>
        </div>
      );
      break;
    case 'textArea':
      optionType = <TextArea onChange={props.onChange} autoSize={{ minRows: 1, maxRows: 8 }} />;
      break;
    case 'y/n':
      optionType = (
        <div className={classes.InputType}>
          <Radio onChange={props.onChange} value="yes">
            Yes
          </Radio>
          <Radio onChange={props.onChange} value="no">
            No
          </Radio>
        </div>
      );
      break;
    case 'date':
      optionType = (
        <DatePicker
          placeholder="Select a date"
          format={dateFormat}
          disabledDate={disabledDate}
          onChange={props.onChange}
        />
      );
      break;
    case 'input':
      optionType = (
        <div className={classes.InputType}>
          <Input
            style={{ width: '200px', maxHeight: '30px' }}
            onChange={props.onChange}
            value={props.answerOption}
          >
            {props.answerOption}
          </Input>
        </div>
      );
      break;
    case 'multi-checkbox':
      optionType = (
        <div className={classes.InputType}>
          <Checkbox value={props.answerOption} onChange={props.onChange}>
            {props.answerOption}
          </Checkbox>
        </div>
      );
      break;
    case 'dropdown':
      optionType = (
        <div className={classes.InputType}>
          <Select
            placeholder="Select a manager"
            onChange={props.onChange}
            key={props.answerOption.map(manager => manager.id)}
            style={{ minWidth: '300px' }}
          >
            {props.answerOption.map(manager => (
              <Option
                value={`${manager.firstName} ${manager.surname}`}
              >{`${manager.firstName} ${manager.surname}`}</Option>
            ))}
          </Select>
        </div>
      );
      break;
    case 'number':
      optionType = (
        <div className={classes.InputType}>
          <InputNumber
            style={{ width: '200px', maxHeight: '30px' }}
            max={10000000}
            formatter={value => `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/£\s?|(,*)/g, '')}
            onChange={props.onChange}
          />
        </div>
      );
      break;
    default:
      optionType = null;
  }

  return optionType;
};

export default OptionType;
