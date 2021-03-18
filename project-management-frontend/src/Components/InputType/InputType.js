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
      optionType = (
        <textarea
          style={{ maxHeight: '300px', height: '200px', resize: 'none' }}
          onChange={props.onChange}
          rows="4"
          cols="50"
        />
      );
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
          defaultValue={moment(date, dateFormat)}
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
          <Option value={props.answerOption}>{props.answerOption}</Option>
        </div>
      );
      break;
    case 'number':
      optionType = (
        <div className={classes.InputType}>
          <InputNumber
            style={{ width: '200px', maxHeight: '30px' }}
            max={10000000}
            min={1000}
            defaultValue={1000}
            formatter={value => `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\£\s?|(,*)/g, '')}
            onChange={props.onChange}
            // value={''}
          >
            {props.answerOption}
          </InputNumber>
        </div>
      );
      break;
    default:
      optionType = null;
  }

  return optionType;
};

export default OptionType;
