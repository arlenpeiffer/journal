import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { TimePicker as MuiTimePicker } from '@material-ui/pickers';

const TimePicker = ({ name, ...props }) => {
  const [date] = useField('date');
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const startOfDay = moment(field.value).startOf('day');
  const timeSinceStartOfDay = moment(field.value).diff(startOfDay);
  const selectedTimeOnCurrentDate = moment(date.value)
    .add(timeSinceStartOfDay)
    .valueOf();

  useEffect(() => {
    setFieldValue(field.name, selectedTimeOnCurrentDate);
  }, [date.value]);

  const handleChange = value => {
    setFieldValue(field.name, moment(value).valueOf());
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MuiTimePicker
        error={hasError}
        format="h:mm A"
        helperText={error}
        name={name}
        onBlur={field.onBlur}
        onChange={handleChange}
        value={selectedTimeOnCurrentDate}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TimePicker;
