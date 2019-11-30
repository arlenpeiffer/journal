import React from 'react';
import { Field } from 'formik';
import moment from 'moment';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';

const DatePicker = ({ name, validate, ...props }) => {
  return (
    <Field name={name} validate={validate} {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        const handleChange = value => {
          form.setFieldValue(
            field.name,
            moment(value)
              .startOf('day')
              .valueOf()
          );
        };

        return (
          <MuiDatePicker
            autoOk={true}
            error={hasError}
            format="MMM D, YYYY"
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

export default DatePicker;
