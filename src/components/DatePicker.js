import React from 'react';
import { Field } from 'formik';
import moment from 'moment';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = ({ validate, ...props }) => {
  return (
    <Field validate={validate} {...props}>
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
      }}
    </Field>
  );
};

export default DatePicker;
