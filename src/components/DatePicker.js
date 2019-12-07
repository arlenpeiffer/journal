import React from 'react';
import { useField, useFormikContext } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';

const DatePicker = ({ name, validate, ...props }) => {
  const [field, meta] = useField({ name, validate });
  const { setFieldValue } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const handleChange = value => {
    setFieldValue(
      field.name,
      moment(value)
        .startOf('day')
        .valueOf()
    );
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MuiDatePicker
        autoOk={true}
        error={hasError}
        format="MMM D, YYYY"
        helperText={hasError && error}
        name={name}
        onBlur={field.onBlur}
        onChange={handleChange}
        value={field.value}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
