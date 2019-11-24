import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';

const Input = ({ children, ...props }) => {
  return (
    <Field {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        return <TextField error={hasError} helperText={error} {...props} />;
      }}
    </Field>
  );
};

export default Input;
