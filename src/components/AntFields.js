import React from 'react';
import {
  AutoComplete as AntAutoComplete,
  Checkbox as AntCheckbox,
  DatePicker as AntDatePicker,
  Form,
  Input as AntInput,
  InputNumber as AntInputNumber,
  Radio as AntRadio,
  Select as AntSelect,
  Switch as AntSwitch
} from 'antd';
import { getIn } from 'formik';

const CreateAntField = Component => ({
  field,
  form,
  // hasFeedback,
  label,
  style,
  submitCount,
  type,
  ...props
}) => {
  const error = getIn(form.errors, field.name);
  // const onBlur = () => form.setFieldTouched(field.name, true);
  // const onChange = value => form.setFieldValue(field.name, value);
  // const onInputChange = event => {
  //   const value = event.target.value;
  //   form.setFieldValue(field.name, value);
  // };
  const submitted = submitCount > 0;
  const submittedError = error && submitted;
  const touched = getIn(form.touched, field.name);
  const touchedError = error && touched;
  return (
    <Form.Item
      // hasFeedback
      help={submittedError || touchedError ? error : undefined}
      label={label}
      style={style}
      validateStatus={submittedError || touchedError ? 'warning' : ''}
    >
      <Component
        {...field}
        {...props}
        // onBlur={onBlur}
        // onChange={type ? onInputChange : onChange}
      />
    </Form.Item>
  );
};

export const AutoComplete = CreateAntField(AntAutoComplete);
export const CheckboxGroup = CreateAntField(AntCheckbox.Group);
export const DatePicker = CreateAntField(AntDatePicker);
export const Input = CreateAntField(AntInput);
export const InputNumber = CreateAntField(AntInputNumber);
export const RadioGroup = CreateAntField(AntRadio.Group);
export const Select = CreateAntField(AntSelect);
export const Switch = CreateAntField(AntSwitch);
export const TextArea = CreateAntField(AntInput.TextArea);
