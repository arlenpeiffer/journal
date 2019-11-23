import React from 'react';
import moment from 'moment';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = ({ form, field, ...props }) => {
  const error = form.errors[field.name];
  const hasError = error && error ? true : false;

  const handleChange = value => {
    form.setFieldValue(
      field.name,
      moment(value)
        .startOf('day')
        .valueOf()
    );
  };

  return (
    <KeyboardDatePicker
      autoOk={true}
      error={hasError}
      format="MMM D, YYYY"
      helperText={error}
      inputProps={{ readOnly: true }}
      onChange={handleChange}
      value={field.value}
      {...props}
    />
  );
};

export default DatePicker;
