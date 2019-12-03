import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';

const Input = ({ name, ...props }) => {
  return (
    <Field name={name} {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        const handleChange = event => {
          form.setFieldValue(field.name, event.target.value);
        };

        return (
          <TextField
            autoComplete="off"
            error={hasError}
            fullWidth
            helperText={error}
            // multiline
            onChange={handleChange}
            value={field.value}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default Input;
