import React from 'react';
import { useField } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MuiSelect from '@material-ui/core/Select';

const Select = ({ children, label, name, ...props }) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  return (
    <FormControl error={hasError}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
        {...props}
      >
        {children}
      </MuiSelect>
      <FormHelperText>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default Select;
