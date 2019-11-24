import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';

const Input = ({ name, ...props }) => {
  return (
    <Field name={name} {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        return (
          <TextField
            autoComplete="off"
            error={hasError}
            fullWidth
            helperText={error}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default Input;
