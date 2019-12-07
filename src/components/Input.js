import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';

const Input = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { validateField } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const [value, setValue] = useState(field.value);

  const updateAndValidateField = event => {
    field.onChange(event);
    validateField(name);
  };

  const handleBlur = event => {
    field.onBlur(event);
    field.onChange(event);
  };

  const handleChange = event => {
    setValue(event.target.value);

    const valueIsEmptyString = event.target.value === '';
    const valueHasLengthOfOne = event.target.value.length === 1;

    if (valueIsEmptyString || (valueHasLengthOfOne && hasError)) {
      updateAndValidateField(event);
    }
  };

  return (
    <TextField
      autoComplete="off"
      error={hasError}
      fullWidth
      helperText={hasError && error}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
};

export default Input;
