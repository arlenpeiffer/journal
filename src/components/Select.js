import React from 'react';
import { Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MuiSelect from '@material-ui/core/Select';

const Select = ({ children, ...props }) => {
  return (
    <Field {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        const handleChange = event => {
          form.setFieldValue(field.name, event.target.value);
        };

        return (
          <FormControl error={hasError}>
            <InputLabel>{props.label}</InputLabel>
            <MuiSelect
              error={hasError}
              onChange={handleChange}
              value={field.value}
              {...props}
            >
              {children}
            </MuiSelect>
            <FormHelperText>{error}</FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default Select;
