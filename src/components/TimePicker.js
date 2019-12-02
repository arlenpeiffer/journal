import React, { useEffect } from 'react';
import { Field, useField } from 'formik';
import moment from 'moment';
import { TimePicker as MuiTimePicker } from '@material-ui/pickers';

const TimePicker = ({ name, setFieldValue, ...props }) => {
  const [date] = useField('date');
  const [field] = useField(name);

  const startOfDay = moment(field.value).startOf('day');
  const timeSinceStartOfDay = moment(field.value).diff(startOfDay);
  const selectedTimeOnCurrentDate = moment(date.value)
    .add(timeSinceStartOfDay)
    .valueOf();

  useEffect(() => {
    setFieldValue(name, selectedTimeOnCurrentDate);
  }, [date.value]);

  return (
    <Field name={name} {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        const handleChange = value => {
          form.setFieldValue(field.name, moment(value).valueOf());
        };

        return (
          <MuiTimePicker
            error={hasError}
            format="h:mm A"
            helperText={error}
            onChange={handleChange}
            value={selectedTimeOnCurrentDate}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default TimePicker;
