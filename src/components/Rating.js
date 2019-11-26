import React from 'react';
import { Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiRating from '@material-ui/lab/Rating';
import Star from '@material-ui/icons/Star';

import FieldLabel from './FieldLabel';

const Rating = ({ label, ...props }) => {
  return (
    <Field {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        const handleChange = (event, value) => {
          // TODO: explore ways to clear/reset value
          form.setFieldValue(field.name, value);
        };

        return (
          <FormControl error={hasError}>
            <FieldLabel label={label} />
            <MuiRating
              icon={<Star fontSize="default" />}
              onChange={handleChange}
              value={field.value}
              {...props}
            />
            <FormHelperText>{error}</FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default Rating;
