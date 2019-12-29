import React from 'react';
import { useField, useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiRating from '@material-ui/lab/Rating';
import Star from '@material-ui/icons/Star';

import FieldLabel from './FieldLabel';

const Rating = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const handleChange = (event, value) => {
    // TODO: explore ways to clear/reset value
    setFieldValue(field.name, value);
  };

  return (
    <FormControl error={hasError}>
      <FieldLabel label={label} />
      <MuiRating
        icon={<Star />}
        name={name}
        onBlur={field.onBlur}
        onChange={handleChange}
        value={field.value}
        {...props}
      />
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Rating;
