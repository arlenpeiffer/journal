import React from 'react';
import { useField } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiRadioGroup from '@material-ui/core/RadioGroup';

import FieldLabel from './FieldLabel';

const RadioGroup = ({ children, label, name, ...props }) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  console.log(field, meta);

  return (
    <FormControl error={hasError}>
      <FieldLabel label={label} />
      <MuiRadioGroup
        name={name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
        {...props}
      >
        {children}
      </MuiRadioGroup>
      <FormHelperText>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroup;
