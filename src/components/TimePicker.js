import React from 'react';
import { Field } from 'formik';
import moment from 'moment';
import { TimePicker as MuiTimePicker } from '@material-ui/pickers';

const TimePicker = ({ name, ...props }) => {
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
            value={field.value}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default TimePicker;
