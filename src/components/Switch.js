import React from 'react';
import { useField } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiSwitch from '@material-ui/core/Switch';

const Switch = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  return (
    <FormControl error={hasError}>
      <FormControlLabel
        checked={field.value}
        control={<MuiSwitch color="primary" />}
        label={label}
        name={name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
        {...props}
      />
      <FormHelperText>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default Switch;
